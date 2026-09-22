"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { Camera, ImagePlus } from "lucide-react";
import {
  getPublishedInvitationId,
  listPhotosBySlug,
} from "@/app/actions/photos";
import { PHOTOS_BUCKET } from "@/lib/photos";
import { FadeIn } from "@/components/invitation/FadeIn";
import { guestSectionClass } from "@/components/invitation/theme-utils";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const MAX_PHOTOS = 48;
const MAX_FILE_BYTES = 5 * 1024 * 1024;

function compressToBlob(
  file: File,
  maxSide = 1600,
  quality = 0.78
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
      const width = Math.round(img.width * scale);
      const height = Math.round(img.height * scale);
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(url);
        reject(new Error("canvas"));
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(url);
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("blob"));
            return;
          }
          resolve(blob);
        },
        "image/jpeg",
        quality
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("image"));
    };
    img.src = url;
  });
}

export function PhotoGallery({ slug }: { slug: string }) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [photoCount, setPhotoCount] = useState(0);
  const [invitationId, setInvitationId] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);
  const [, startTransition] = useTransition();

  useEffect(() => {
    let cancelled = false;
    startTransition(async () => {
      setLoading(true);
      const [id, list] = await Promise.all([
        getPublishedInvitationId(slug),
        listPhotosBySlug(slug),
      ]);
      if (cancelled) return;
      setInvitationId(id);
      setPhotoCount(list.length);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  async function addFiles(fileList: FileList | File[]) {
    if (!invitationId) {
      setError("Bu davetiye için albüm henüz aktif değil.");
      return;
    }
    const files = Array.from(fileList).filter((f) =>
      f.type.startsWith("image/")
    );
    if (!files.length) return;

    setBusy(true);
    setError("");
    setSuccess("");
    try {
      const supabase = createClient();
      const room = Math.max(0, MAX_PHOTOS - photoCount);
      let uploaded = 0;

      for (const file of files.slice(0, room)) {
        let blob: Blob;
        try {
          blob = await compressToBlob(file);
        } catch {
          if (file.size > MAX_FILE_BYTES) {
            setError("Dosya çok büyük (max 5MB).");
            continue;
          }
          blob = file;
        }

        const path = `${invitationId}/${crypto.randomUUID()}.jpg`;
        const { error: uploadError } = await supabase.storage
          .from(PHOTOS_BUCKET)
          .upload(path, blob, {
            contentType: "image/jpeg",
            upsert: false,
          });

        if (uploadError) {
          setError(uploadError.message);
          continue;
        }

        const {
          data: { publicUrl },
        } = supabase.storage.from(PHOTOS_BUCKET).getPublicUrl(path);

        const { error: insertError } = await supabase.from("photos").insert({
          invitation_id: invitationId,
          storage_path: path,
          public_url: publicUrl,
          file_name: file.name || "foto.jpg",
        });

        if (insertError) {
          setError(insertError.message || "Kayıt başarısız.");
          await supabase.storage.from(PHOTOS_BUCKET).remove([path]);
          continue;
        }

        uploaded += 1;
      }

      if (uploaded > 0) {
        setPhotoCount((prev) => Math.min(MAX_PHOTOS, prev + uploaded));
        setSuccess(
          uploaded === 1
            ? "Fotoğrafın çifte iletildi. Teşekkürler!"
            : `${uploaded} fotoğraf çifte iletildi. Teşekkürler!`
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Yükleme başarısız.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section id="fotograf" className="scroll-mt-24 bg-background py-16 sm:py-20">
      <FadeIn className={guestSectionClass()}>
        <div className="text-center">
          <p className="text-xs font-medium tracking-[0.28em] text-primary uppercase">
            Albüm
          </p>
          <h2 className="font-heading mt-3 text-3xl font-semibold tracking-tight">
            Anıları <span className="italic text-primary">paylaş</span>
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Etkinlikte çektiğin fotoğrafları yükle; çift bunları panelinden
            görür ve indirebilir.
          </p>
        </div>

        <div
          onDragEnter={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragOver={(e) => e.preventDefault()}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            void addFiles(e.dataTransfer.files);
          }}
          className={cn(
            "mt-8 rounded-3xl border border-dashed p-6 text-center transition",
            dragging
              ? "border-primary bg-primary/5"
              : "border-border/80 bg-card"
          )}
        >
          <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <ImagePlus className="size-5" />
          </span>
          <p className="mt-3 text-sm font-medium">
            Fotoğrafı buraya bırak veya seç
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            JPG, PNG · mobil kamerayı da kullanabilirsin
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={
                busy || loading || !invitationId || photoCount >= MAX_PHOTOS
              }
              className="h-11 rounded-full"
            >
              <Camera className="size-4" />
              {busy ? "Yükleniyor…" : "Fotoğraf seç / çek"}
            </Button>
          </div>
          {!invitationId && !loading ? (
            <p className="mt-3 text-xs text-muted-foreground">
              Albüm yalnızca yayınlanmış davetiyelerde açılır.
            </p>
          ) : null}
          {error ? <p className="mt-3 text-sm text-primary">{error}</p> : null}
          {success ? (
            <p className="mt-3 text-sm text-foreground/80">{success}</p>
          ) : null}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            capture="environment"
            multiple
            className="hidden"
            onChange={(e) => {
              if (e.target.files) void addFiles(e.target.files);
              e.target.value = "";
            }}
          />
        </div>
      </FadeIn>
    </section>
  );
}
