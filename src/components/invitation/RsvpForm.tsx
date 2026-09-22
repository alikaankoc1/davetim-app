"use client";

import { useState, useTransition, type FormEvent } from "react";
import confetti from "canvas-confetti";
import { Check, Send } from "lucide-react";
import { submitRsvp } from "@/app/actions/invitations";
import { FadeIn } from "@/components/invitation/FadeIn";
import { guestSectionClass } from "@/components/invitation/theme-utils";
import { Button } from "@/components/ui/button";
import type { InvitationData } from "@/lib/invitation";
import { cn } from "@/lib/utils";

export function RsvpForm({
  data,
  slug,
}: {
  data: InvitationData;
  slug: string;
}) {
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"yes" | "no">("yes");
  const [guests, setGuests] = useState(1);
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  if (!data.rsvpEnabled) return null;

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!name.trim()) {
      setError("Lütfen ismini yaz.");
      return;
    }

    setError("");
    startTransition(async () => {
      const result = await submitRsvp({
        slug,
        name: name.trim(),
        status,
        guests: status === "yes" ? Math.max(1, guests) : 0,
        note: note.trim(),
      });

      if (!result.ok) {
        setError(result.error);
        return;
      }

      void confetti({
        particleCount: 110,
        spread: 78,
        origin: { y: 0.55 },
        colors: ["#8B3A3A", "#C9A36A", "#F3E6D8", "#D4A5A5"],
      });
      setSent(true);
    });
  }

  return (
    <section id="rsvp" className="scroll-mt-24 bg-background py-16 sm:py-20">
      <FadeIn className={guestSectionClass()}>
        <div className="text-center">
          <h2 className="font-heading text-3xl font-semibold tracking-tight">
            Katılımını <span className="italic text-primary">bildir</span>
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Birkaç saniyede yanıtını ilet; çifte özel bir not da bırakabilirsin.
          </p>
        </div>

        {sent ? (
          <div className="mt-8 rounded-3xl border border-gold/35 bg-secondary/70 p-8 text-center">
            <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Check className="size-5" />
            </span>
            <p className="font-heading mt-4 text-2xl font-semibold">
              Teşekkürler{name.trim() ? `, ${name.trim()}` : ""}!
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Yanıtın kaydedildi. Görüşmek üzere.
            </p>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className="mt-8 space-y-4 rounded-3xl border border-border/70 bg-card p-5 shadow-sm sm:p-6"
          >
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium">Adın Soyadın</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Örn. Elif Yılmaz"
                className="h-11 rounded-xl border border-border/80 bg-background px-3.5 text-sm outline-none focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-ring/30"
              />
            </label>

            <div>
              <p className="text-sm font-medium">Katılım durumu</p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {(
                  [
                    { id: "yes", label: "Geliyorum" },
                    { id: "no", label: "Gelemiyorum" },
                  ] as const
                ).map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setStatus(option.id)}
                    className={cn(
                      "h-11 rounded-full border text-sm font-medium transition",
                      status === option.id
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border/80 text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {status === "yes" ? (
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium">Kişi sayısı</span>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value) || 1)}
                  className="h-11 rounded-xl border border-border/80 bg-background px-3.5 text-sm outline-none focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-ring/30"
                />
              </label>
            ) : null}

            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium">Çifte özel not</span>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                placeholder="Mutluluklar dileriz…"
                className="rounded-xl border border-border/80 bg-background px-3.5 py-3 text-sm outline-none focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-ring/30"
              />
            </label>

            {error ? <p className="text-sm text-primary">{error}</p> : null}

            <Button
              type="submit"
              disabled={isPending}
              className="h-11 w-full rounded-full"
            >
              <Send className="size-4" />
              {isPending ? "Gönderiliyor…" : "Gönder"}
            </Button>
          </form>
        )}
      </FadeIn>
    </section>
  );
}
