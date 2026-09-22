"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Camera, ImagePlus, Trash2, X } from "lucide-react";
import { FadeIn } from "@/components/invitation/FadeIn";
import { guestSectionClass } from "@/components/invitation/theme-utils";
import { Button } from "@/components/ui/button";
import { photosStorageKey } from "@/lib/invitation-guest";
import { cn } from "@/lib/utils";

type GalleryPhoto = {
  id: string;
  src: string;
  name: string;
};

const MAX_PHOTOS = 24;
const MAX_DATA_URL_CHARS = 400_000;

async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function compressImage(file: File, maxSide = 1280, quality = 0.72): Promise<string> {
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
      resolve(canvas.toDataURL("image/jpeg", quality));
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
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [dragging, setDragging] = useState(false);
  const [lightbox, setLightbox] = useState<GalleryPhoto | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(photosStorageKey(slug));
      if (!raw) return;
      const parsed = JSON.parse(raw) as GalleryPhoto[];
      if (Array.isArray(parsed)) setPhotos(parsed.slice(0, MAX_PHOTOS));
    } catch {
      // ignore
    }
  }, [slug]);

  const persist = useCallback(
    (next: GalleryPhoto[]) => {
      setPhotos(next);
      try {
        const slim = next.filter((p) => p.src.length < MAX_DATA_URL_CHARS);
        window.localStorage.setItem(
          photosStorageKey(slug),
          JSON.stringify(slim.slice(0, MAX_PHOTOS))
        );
      } catch {
        // quota exceeded — keep in memory only
      }
    },
    [slug]
  );

  async function addFiles(fileList: FileList | File[]) {
    const files = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
    if (!files.length) return;
    setBusy(true);
    try {
      const created: GalleryPhoto[] = [];
      for (const file of files.slice(0, MAX_PHOTOS - photos.length)) {
        let src: string;
        try {
          src = await compressImage(file);
        } catch {
          src = await fileToDataUrl(file);
        }
        created.push({
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          src,
          name: file.name,
        });
      }
      if (created.length) persist([...created, ...photos].slice(0, MAX_PHOTOS));
    } finally {
      setBusy(false);
    }
  }

  function removePhoto(id: string) {
    const next = photos.filter((photo) => photo.id !== id);
    persist(next);
    if (lightbox?.id === id) setLightbox(null);
  }

  return (
    <section id="fotograf" className="scroll-mt-24 bg-background py-16 sm:py-20">
      <FadeIn className={guestSectionClass()}>
        <div className="text-center">
          <p className="text-xs font-medium tracking-[0.28em] text-primary uppercase">
            QR Albüm
          </p>
          <h2 className="font-heading mt-3 text-3xl font-semibold tracking-tight">
            Anıları <span className="italic text-primary">paylaş</span>
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Etkinlikte çektiğin fotoğrafları yükle; herkes aynı albümde buluşsun.
            İstemediğin kareyi çöp ikonuyla silebilirsin.
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
              disabled={busy || photos.length >= MAX_PHOTOS}
              className="h-11 rounded-full"
            >
              <Camera className="size-4" />
              {busy ? "Yükleniyor…" : "Fotoğraf seç / çek"}
            </Button>
          </div>
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

        {photos.length > 0 ? (
          <div className="mt-6 columns-2 gap-3 sm:columns-3">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="group relative mb-3 break-inside-avoid overflow-hidden rounded-2xl border border-border/60"
              >
                <button
                  type="button"
                  onClick={() => setLightbox(photo)}
                  className="block w-full"
                >
                  <img
                    src={photo.src}
                    alt={photo.name}
                    className="h-auto w-full object-cover transition hover:scale-[1.02]"
                  />
                </button>
                <button
                  type="button"
                  aria-label="Fotoğrafı sil"
                  onClick={(e) => {
                    e.stopPropagation();
                    removePhoto(photo.id);
                  }}
                  className="absolute top-2 right-2 flex size-8 items-center justify-center rounded-full bg-background/95 text-primary shadow-sm opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
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
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                type="button"
                aria-label="Fotoğrafı sil"
                className="flex size-10 items-center justify-center rounded-full bg-background/90 text-primary"
                onClick={(e) => {
                  e.stopPropagation();
                  removePhoto(lightbox.id);
                }}
              >
                <Trash2 className="size-4" />
              </button>
              <button
                type="button"
                aria-label="Kapat"
                className="flex size-10 items-center justify-center rounded-full bg-background/90"
                onClick={() => setLightbox(null)}
              >
                <X className="size-4" />
              </button>
            </div>
            <motion.img
              key={lightbox.id}
              src={lightbox.src}
              alt={lightbox.name}
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
