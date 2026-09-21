"use client";

import { CalendarDays, Clock3, MapPin, Navigation } from "lucide-react";
import { FadeIn } from "@/components/invitation/FadeIn";
import { guestSectionClass } from "@/components/invitation/theme-utils";
import { Button } from "@/components/ui/button";
import {
  formatDisplayDate,
  formatDisplayTime,
  type InvitationData,
} from "@/lib/invitation";
import { mapsLinks } from "@/lib/invitation-guest";

export function EventDetails({ data }: { data: InvitationData }) {
  const date = formatDisplayDate(data.date) || "Tarih yakında";
  const time = formatDisplayTime(data.time);
  const venue = data.venueName.trim() || "Mekan yakında";
  const address = data.address.trim();
  const links = mapsLinks(data.mapsUrl, data.address, data.venueName);

  return (
    <section id="detaylar" className="bg-secondary/40 py-16 sm:py-20">
      <FadeIn className={guestSectionClass()}>
        <div className="text-center">
          <p className="text-xs font-medium tracking-[0.28em] text-primary uppercase">
            Detaylar
          </p>
          <h2 className="font-heading mt-3 text-3xl font-semibold tracking-tight">
            Ne zaman & <span className="italic text-primary">nerede</span>
          </h2>
        </div>

        <div className="mt-8 space-y-3">
          <div className="flex items-start gap-3 rounded-2xl border border-border/70 bg-card p-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CalendarDays className="size-4" />
            </span>
            <div>
              <p className="text-xs text-muted-foreground">Tarih</p>
              <p className="font-medium">{date}</p>
            </div>
          </div>

          {time ? (
            <div className="flex items-start gap-3 rounded-2xl border border-border/70 bg-card p-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Clock3 className="size-4" />
              </span>
              <div>
                <p className="text-xs text-muted-foreground">Saat</p>
                <p className="font-medium">{time}</p>
              </div>
            </div>
          ) : null}

          <div className="flex items-start gap-3 rounded-2xl border border-border/70 bg-card p-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <MapPin className="size-4" />
            </span>
            <div>
              <p className="text-xs text-muted-foreground">Mekan</p>
              <p className="font-medium">{venue}</p>
              {address ? (
                <p className="mt-1 text-sm text-muted-foreground">{address}</p>
              ) : null}
            </div>
          </div>
        </div>

        <div id="harita" className="mt-6 grid gap-3 sm:grid-cols-2">
          <Button
            nativeButton={false}
            render={
              <a href={links.google} target="_blank" rel="noreferrer" />
            }
            className="h-11 rounded-full"
          >
            <Navigation className="size-4" />
            Google Maps
          </Button>
          <Button
            nativeButton={false}
            variant="outline"
            render={
              <a href={links.apple} target="_blank" rel="noreferrer" />
            }
            className="h-11 rounded-full"
          >
            <MapPin className="size-4" />
            Apple Maps
          </Button>
        </div>
      </FadeIn>
    </section>
  );
}
