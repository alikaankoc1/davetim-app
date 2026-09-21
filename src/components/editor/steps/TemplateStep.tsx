"use client";

import { InvitationCard } from "@/components/editor/InvitationCard";
import { useInvitation } from "@/components/editor/invitation-store";
import { THEMES, type InvitationData } from "@/lib/invitation";
import { cn } from "@/lib/utils";

export function TemplateStep() {
  const { data, update } = useInvitation();

  return (
    <div>
      <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
        Şablonunu <span className="italic text-primary">seç</span>
      </h2>
      <p className="mt-2 text-sm text-muted-foreground sm:text-base">
        Davetiyenin görünen yüzü. İstediğin zaman değiştirebilirsin.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {THEMES.map((theme) => {
          const selected = data.theme === theme.id;
          const previewData: InvitationData = { ...data, theme: theme.id };
          return (
            <button
              key={theme.id}
              type="button"
              onClick={() => update({ theme: theme.id })}
              className={cn(
                "overflow-hidden rounded-3xl border text-left transition",
                selected
                  ? "border-primary/50 ring-2 ring-primary/30 shadow-[0_16px_40px_-24px_oklch(0.42_0.11_22_/_0.45)]"
                  : "border-border/70 hover:-translate-y-0.5 hover:border-primary/30"
              )}
            >
              <div className="aspect-[3/4]">
                <InvitationCard data={previewData} compact />
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-sm font-semibold">{theme.label}</span>
                {selected ? (
                  <span className="text-xs font-medium text-primary">Seçildi</span>
                ) : null}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
