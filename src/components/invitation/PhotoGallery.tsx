"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Camera, ImagePlus, X } from "lucide-react";
import {
  getPublishedInvitationId,
  listPhotosBySlug,
  PHOTOS_BUCKET,
  type AlbumPhoto,
} from "@/app/actions/photos";
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
  const [photos, setPhotos] = useState<AlbumPhoto[]>([]);
  const [invitationId, setInvitationId] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [lightbox, setLightbox] = useState<AlbumPhoto | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
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
      setPhotos(list);
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
    try {
      const supabase = createClient();
      const room = Math.max(0, MAX_PHOTOS - photos.length);
      const uploaded: AlbumPhoto[] = [];

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

        const { data: row, error: insertError } = await supabase
          .from("photos")
          .insert({
            invitation_id: invitationId,
            storage_path: path,
            public_url: publicUrl,
            file_name: file.name || "foto.jpg",
          })
          .select("id, public_url, file_name, created_at, storage_path")
          .single();

        if (insertError || !row) {
          setError(insertError?.message || "Kayıt başarısız.");
          await supabase.storage.from(PHOTOS_BUCKET).remove([path]);
          continue;
        }

        uploaded.push({
          id: row.id as string,
          publicUrl: String(row.public_url),
          fileName: String(row.file_name ?? ""),
          createdAt: String(row.created_at ?? ""),
          storagePath: String(row.storage_path ?? ""),
        });
      }

      if (uploaded.length) {
        setPhotos((prev) => [...uploaded, ...prev].slice(0, MAX_PHOTOS));
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
                busy || loading || !invitationId || photos.length >= MAX_PHOTOS
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

        {loading ? (
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Albüm yükleniyor…
          </p>
        ) : photos.length > 0 ? (
          <div className="mt-6 columns-2 gap-3 sm:columns-3">
            {photos.map((photo) => (
              <button
                key={photo.id}
                type="button"
                onClick={() => setLightbox(photo)}
                className="mb-3 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-border/60"
              >
                <img
                  src={photo.publicUrl}
                  alt={photo.fileName || "Fotoğraf"}
                  className="h-auto w-full object-cover transition hover:scale-[1.02]"
                />
              </button>
            ))}
          </div>
        ) : (
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Henüz fotoğraf yok. İlk kareyi sen yükle.
          </p>
        )}
      </FadeIn>

      <AnimatePresence>
        {lightbox ? (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-foreground/80 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <button
              type="button"
              aria-label="Kapat"
              className="absolute top-4 right-4 flex size-10 items-center justify-center rounded-full bg-background/90"
              onClick={() => setLightbox(null)}
            >
              <X className="size-4" />
            </button>
            <motion.img
              key={lightbox.id}
              src={lightbox.publicUrl}
              alt={lightbox.fileName || "Fotoğraf"}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="max-h-[85svh] max-w-full rounded-2xl object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
