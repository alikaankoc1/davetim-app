"use client";

import { invitationLink } from "@/lib/invitation";
import { cn } from "@/lib/utils";
import { InvitationCard } from "@/components/editor/InvitationCard";
import { useInvitation } from "@/components/editor/invitation-store";
import { isTemplateId } from "@/data/templates";

export function PhonePreview({ className }: { className?: string }) {
  const { data, slug } = useInvitation();
  const hasTemplate = isTemplateId(data.theme);

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="relative w-[240px] sm:w-[260px]">
        <div className="absolute inset-x-6 top-16 h-56 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative aspect-[9/18.4] rounded-[2.5rem] bg-neutral-950 p-[9px] shadow-[0_24px_60px_-18px_rgba(40,20,16,0.5)] ring-1 ring-white/15">
          <div className="absolute top-3 left-1/2 z-20 h-[20px] w-[86px] -translate-x-1/2 rounded-full bg-black" />
          <div className="relative h-full overflow-hidden rounded-[2rem] bg-[#f6eee3]">
            {hasTemplate ? (
              <InvitationCard data={data} />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
                <div className="h-px w-10 bg-foreground/15" />
                <p className="font-cormorant text-lg text-foreground/55">
                  Şablon seç
                </p>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Soldan bir davetiye seçince önizleme burada canlı güncellenir.
                </p>
                <div className="h-px w-10 bg-foreground/15" />
              </div>
            )}
          </div>
          <div className="absolute bottom-2.5 left-1/2 h-1 w-20 -translate-x-1/2 rounded-full bg-white/35" />
        </div>
      </div>
      <p className="mt-4 text-center text-xs text-muted-foreground">
        Canlı bağlantı
      </p>
      <p className="font-medium text-primary">{invitationLink(slug)}</p>
    </div>
  );
}
