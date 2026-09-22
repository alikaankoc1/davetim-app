import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import {
  getOwnerInvitation,
  listOwnerRsvps,
} from "@/app/actions/panel";
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
      ? `Katılım — ${displayNames(invitation)} | Davetim`
      : "Katılım | Davetim",
  };
}

export default async function KatilimPage({ params }: PageProps) {
  const user = await getSessionUser();
  if (!user) redirect("/giris?next=/panel");

  const { id } = await params;
  const invitation = await getOwnerInvitation(id);
  if (!invitation) notFound();

  const rsvps = await listOwnerRsvps(id);
  const coming = rsvps.filter((r) => r.status === "yes");
  const notComing = rsvps.filter((r) => r.status === "no");
  const totalGuests = coming.reduce((sum, r) => sum + r.guests, 0);

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
              Katılım listesi
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {displayNames(invitation)}
              {formatDisplayDate(invitation.date)
                ? ` · ${formatDisplayDate(invitation.date)}`
                : ""}
            </p>
          </div>
          <Button
            nativeButton={false}
            variant="outline"
            render={<a href={`/${invitation.slug}`} target="_blank" rel="noreferrer" />}
            className="h-10 rounded-full px-4 text-sm"
          >
            Davetiyeyi aç
          </Button>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-border/70 bg-card p-4">
            <p className="text-xs text-muted-foreground">Geliyor</p>
            <p className="font-heading mt-1 text-2xl font-semibold">
              {coming.length}
            </p>
          </div>
          <div className="rounded-2xl border border-border/70 bg-card p-4">
            <p className="text-xs text-muted-foreground">Gelemiyor</p>
            <p className="font-heading mt-1 text-2xl font-semibold">
              {notComing.length}
            </p>
          </div>
          <div className="rounded-2xl border border-border/70 bg-card p-4">
            <p className="text-xs text-muted-foreground">Toplam kişi (gelen)</p>
            <p className="font-heading mt-1 text-2xl font-semibold">
              {totalGuests}
            </p>
          </div>
        </div>

        {rsvps.length === 0 ? (
          <div className="mt-8 rounded-[2rem] border border-dashed border-border/80 bg-card/60 px-6 py-12 text-center">
            <p className="font-heading text-xl font-semibold">Henüz yanıt yok</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Misafirler davetiyedeki katılım formunu doldurunca burada
              listelenir.
            </p>
          </div>
        ) : (
          <div className="mt-8 overflow-x-auto rounded-3xl border border-border/70 bg-card">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="border-b border-border/70 bg-secondary/40 text-xs tracking-wide text-muted-foreground uppercase">
                <tr>
                  <th className="px-4 py-3 font-medium">Misafir</th>
                  <th className="px-4 py-3 font-medium">Durum</th>
                  <th className="px-4 py-3 font-medium">Kişi</th>
                  <th className="px-4 py-3 font-medium">Not</th>
                  <th className="px-4 py-3 font-medium">Tarih</th>
                </tr>
              </thead>
              <tbody>
                {rsvps.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-border/50 last:border-0"
                  >
                    <td className="px-4 py-3 font-medium">{row.guestName}</td>
                    <td className="px-4 py-3">
                      {row.status === "yes" ? (
                        <span className="text-primary">Geliyor</span>
                      ) : (
                        <span className="text-muted-foreground">Gelemiyor</span>
                      )}
                    </td>
                    <td className="px-4 py-3 tabular-nums">{row.guests}</td>
                    <td className="max-w-[220px] truncate px-4 py-3 text-muted-foreground">
                      {row.note || "—"}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {row.createdAt
                        ? new Date(row.createdAt).toLocaleString("tr-TR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
