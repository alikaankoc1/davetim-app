import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getOwnerInvitation } from "@/app/actions/panel";
import { listOwnerPhotos } from "@/app/actions/photos";
import { PanelAlbumGrid } from "@/components/panel/PanelAlbumGrid";
import { PanelHeader } from "@/components/panel/PanelHeader";
import { Button } from "@/components/ui/button";
import { getSessionUser } from "@/lib/auth";
import { displayNames, formatDisplayDate } from "@/lib/invitation";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const invitation = await getOwnerInvitation(id);
  return {
    title: invitation
      ? `Albüm — ${displayNames(invitation)} | Davetim`
      : "Albüm | Davetim",
  };
}

export default async function AlbumPage({ params }: PageProps) {
  const user = await getSessionUser();
  if (!user) redirect("/giris?next=/panel");

  const { id } = await params;
  const invitation = await getOwnerInvitation(id);
  if (!invitation) notFound();

  const photos = await listOwnerPhotos(id);

  return (
    <div className="min-h-svh bg-background">
      <PanelHeader email={user.email} />

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <a
              href="/panel"
              className="text-sm font-medium text-primary hover:underline"
            >
              ← Davetiyelerim
            </a>
            <h1 className="font-heading mt-3 text-3xl font-semibold tracking-tight">
              Albüm
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {displayNames(invitation)}
              {formatDisplayDate(invitation.date)
                ? ` · ${formatDisplayDate(invitation.date)}`
                : ""}
              {" · "}
              {photos.length} fotoğraf
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              nativeButton={false}
              variant="outline"
              render={<a href={`/panel/${id}/katilim`} />}
              className="h-10 rounded-full px-4 text-sm"
            >
              Katılım listesi
            </Button>
            <Button
              nativeButton={false}
              variant="outline"
              render={
                <a
                  href={`/${invitation.slug}`}
                  target="_blank"
                  rel="noreferrer"
                />
              }
              className="h-10 rounded-full px-4 text-sm"
            >
              Davetiyeyi aç
            </Button>
          </div>
        </div>

        <PanelAlbumGrid invitationId={id} initialPhotos={photos} />
      </main>
    </div>
  );
}
