"use client";

import { useEffect, useState } from "react";
import { FadeIn } from "@/components/invitation/FadeIn";
import {
  guestSectionClass,
  templateBodyClass,
} from "@/components/invitation/theme-utils";
import type { InvitationTemplate } from "@/data/templates";
import { eventDateTime } from "@/lib/invitation-guest";
import type { InvitationData } from "@/lib/invitation";
import { cn } from "@/lib/utils";

type Remains = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
};

function calcRemains(targetMs: number): Remains {
  const diff = targetMs - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  }
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1000);
  return { days, hours, minutes, seconds, done: false };
}

export function Countdown({
  data,
  template,
}: {
  data: InvitationData;
  template: InvitationTemplate;
}) {
  const targetMs = eventDateTime(data)?.getTime() ?? null;
  const [remains, setRemains] = useState<Remains | null>(null);

  useEffect(() => {
    if (targetMs == null) {
      setRemains(null);
      return;
    }
    const tick = () => setRemains(calcRemains(targetMs));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [targetMs]);

  if (targetMs == null) return null;

  const cells = remains
    ? [
        { label: "Gün", value: remains.days },
        { label: "Saat", value: remains.hours },
        { label: "Dakika", value: remains.minutes },
        { label: "Saniye", value: remains.seconds },
      ]
    : [
        { label: "Gün", value: "—" },
        { label: "Saat", value: "—" },
        { label: "Dakika", value: "—" },
        { label: "Saniye", value: "—" },
      ];

  return (
    <section id="countdown" className="bg-background py-16 sm:py-20">
      <FadeIn className={guestSectionClass("text-center")}>
        <p className="text-xs font-medium tracking-[0.28em] text-primary uppercase">
          Geri sayım
        </p>
        <h2 className="font-heading mt-3 text-3xl font-semibold tracking-tight">
          Büyük güne{" "}
          <span className="italic text-primary">
            {remains?.done ? "ulaştık" : "kalan"}
          </span>
        </h2>

        <div className="mt-8 grid grid-cols-4 gap-2 sm:gap-3">
          {cells.map((cell) => (
            <div
              key={cell.label}
              className="rounded-2xl border border-border/70 bg-card px-2 py-4 shadow-sm sm:px-3"
            >
              <p
                className={cn(
                  templateBodyClass(template),
                  "text-2xl font-semibold tabular-nums sm:text-3xl"
                )}
                style={{ color: template.accentColor }}
              >
                {typeof cell.value === "number"
                  ? String(cell.value).padStart(2, "0")
                  : cell.value}
              </p>
              <p className="mt-1 text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                {cell.label}
              </p>
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
