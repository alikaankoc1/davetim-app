import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { listOwnerInvitations } from "@/app/actions/panel";
import { PanelHeader } from "@/components/panel/PanelHeader";
import { Button } from "@/components/ui/button";
import { getSessionUser } from "@/lib/auth";
import { displayNames, formatDisplayDate } from "@/lib/invitation";

export const metadata: Metadata = {
  title: "Panelim | Davetim",
};

export default async function PanelPage() {
  const user = await getSessionUser();
  if (!user) redirect("/giris?next=/panel");

  const invitations = await listOwnerInvitations();

  return (
    <div className="min-h-svh bg-background">
      <PanelHeader email={user.email} />

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium tracking-[0.28em] text-primary uppercase">
              Panel
            </p>
            <h1 className="font-heading mt-2 text-3xl font-semibold tracking-tight">
              Davetiyelerim
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Yayınladığın davetiyeleri yönet; katılım yanıtlarını gör.
            </p>
          </div>
          <Button
            nativeButton={false}
            render={<a href="/olustur" />}
            className="h-11 rounded-full px-5"
          >
            Yeni davetiye oluştur
          </Button>
        </div>

        {invitations.length === 0 ? (
          <div className="mt-10 rounded-[2rem] border border-dashed border-border/80 bg-card/60 px-6 py-14 text-center">
            <p className="font-heading text-xl font-semibold">
              Henüz davetiye yok
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              İlk davetiyeni oluştur; yayınladıktan sonra burada listelenir.
              Giriş yaptıktan sonra kaydedilen davetiyeler hesabına bağlanır.
            </p>
            <Button
              nativeButton={false}
              render={<a href="/olustur" />}
              className="mt-6 h-11 rounded-full px-6"
            >
              Oluşturmaya başla
            </Button>
          </div>
        ) : (
          <ul className="mt-10 space-y-3">
            {invitations.map((item) => {
              const title = displayNames(item);
              const date = formatDisplayDate(item.date);

              return (
                <li
                  key={item.id}
                  className="rounded-3xl border border-border/70 bg-card/80 p-5 shadow-[0_12px_36px_-28px_rgba(40,20,16,0.35)]"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <p className="truncate font-heading text-xl font-semibold">
                        {title}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {date || "Tarih yok"} · /{item.slug}
                        {item.status === "published" ? " · Yayında" : ""}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        nativeButton={false}
                        variant="outline"
                        render={
                          <a
                            href={`/${item.slug}`}
                            target="_blank"
                            rel="noreferrer"
                          />
                        }
                        className="h-10 rounded-full px-4 text-sm"
                      >
                        Görüntüle
                      </Button>
                      <Button
                        nativeButton={false}
                        render={<a href={`/panel/${item.id}/katilim`} />}
                        className="h-10 rounded-full px-4 text-sm"
                      >
                        Katılım listesi
                      </Button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </div>
  );
}
