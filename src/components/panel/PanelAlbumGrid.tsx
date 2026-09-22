"use client";

import { useState, useTransition } from "react";
import { Download, Trash2 } from "lucide-react";
import { deleteOwnerPhoto, type AlbumPhoto } from "@/app/actions/photos";
import { Button } from "@/components/ui/button";

export function PanelAlbumGrid({
  invitationId,
  initialPhotos,
}: {
  invitationId: string;
  initialPhotos: AlbumPhoto[];
}) {
  const [photos, setPhotos] = useState(initialPhotos);
  const [error, setError] = useState("");
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleDelete(photoId: string) {
    setError("");
    setPendingId(photoId);
    startTransition(async () => {
      const result = await deleteOwnerPhoto(invitationId, photoId);
      setPendingId(null);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setPhotos((prev) => prev.filter((p) => p.id !== photoId));
    });
  }

  if (photos.length === 0) {
    return (
      <div className="mt-8 rounded-[2rem] border border-dashed border-border/80 bg-card/60 px-6 py-12 text-center">
        <p className="font-heading text-xl font-semibold">Henüz fotoğraf yok</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Misafirler davetiye sayfasından yükleyince burada görünür.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      {error ? <p className="mb-4 text-sm text-primary">{error}</p> : null}
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {photos.map((photo) => (
          <article
            key={photo.id}
            className="overflow-hidden rounded-2xl border border-border/70 bg-card"
          >
            <div className="aspect-square bg-secondary/40">
              <img
                src={photo.publicUrl}
                alt={photo.fileName || "Fotoğraf"}
                className="size-full object-cover"
              />
            </div>
            <div className="flex items-center justify-between gap-2 p-3">
              <p className="min-w-0 truncate text-xs text-muted-foreground">
                {photo.fileName || "foto.jpg"}
              </p>
              <div className="flex shrink-0 gap-1">
                <Button
                  nativeButton={false}
                  variant="outline"
                  size="icon-sm"
                  render={
                    <a
                      href={photo.publicUrl}
                      download={photo.fileName || "foto.jpg"}
                      target="_blank"
                      rel="noreferrer"
                    />
                  }
                  className="rounded-full"
                  aria-label="İndir"
                >
                  <Download className="size-3.5" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  disabled={isPending && pendingId === photo.id}
                  onClick={() => handleDelete(photo.id)}
                  className="rounded-full text-primary"
                  aria-label="Sil"
                >
                  <Trash2 className="size-3.5" />
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
