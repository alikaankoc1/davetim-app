"use client";

import { useEffect, useState } from "react";
import { BottomBar } from "@/components/invitation/BottomBar";
import { Countdown } from "@/components/invitation/Countdown";
import { EventDetails } from "@/components/invitation/EventDetails";
import { GiftSection } from "@/components/invitation/GiftSection";
import { HeroSection } from "@/components/invitation/HeroSection";
import { PhotoGallery } from "@/components/invitation/PhotoGallery";
import { RsvpForm } from "@/components/invitation/RsvpForm";
import { getTemplateById } from "@/data/templates";
import {
  loadInvitationBySlug,
  type StoredInvitation,
} from "@/lib/invitation-guest";

export function InvitationView({ slug }: { slug: string }) {
  const [data, setData] = useState<StoredInvitation | null>(null);

  useEffect(() => {
    setData(loadInvitationBySlug(slug));
  }, [slug]);

  if (!data) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">Davetiye yükleniyor…</p>
      </div>
    );
  }

  const template = getTemplateById(data.theme);

  return (
    <div className="min-h-svh overflow-x-clip bg-background pb-24 md:pb-0">
      <HeroSection data={data} template={template} />
      <Countdown data={data} template={template} />
      <EventDetails data={data} />
      <RsvpForm data={data} slug={data.slug} />
      <GiftSection data={data} />
      <PhotoGallery slug={data.slug} />

      <footer className="border-t border-border/60 py-10 text-center">
        <p className="font-heading text-lg text-primary">Davetim</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Bu davetiye Davetim ile hazırlandı
        </p>
      </footer>

      <BottomBar data={data} />
    </div>
  );
}
