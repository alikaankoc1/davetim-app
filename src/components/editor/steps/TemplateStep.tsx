"use client";

import { useMemo, useState } from "react";
import { InvitationCard } from "@/components/editor/InvitationCard";
import { useInvitation } from "@/components/editor/invitation-store";
import {
  INVITATION_TEMPLATES,
  TEMPLATE_CATEGORIES,
  type TemplateCategoryId,
} from "@/data/templates";
import type { EventTypeId, InvitationData } from "@/lib/invitation";
import { cn } from "@/lib/utils";

export function TemplateStep() {
  const { data, update } = useInvitation();
  const [category, setCategory] = useState<TemplateCategoryId>(
    (data.eventType as TemplateCategoryId) || "dugun"
  );

  const templates = useMemo(
    () => INVITATION_TEMPLATES.filter((item) => item.category === category),
    [category]
  );

  function selectTemplate(id: string, eventType: EventTypeId) {
    update({ theme: id, eventType });
  }

  return (
    <div>
      <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
        Şablonunu <span className="italic text-primary">seç</span>
      </h2>
      <p className="mt-2 text-sm text-muted-foreground sm:text-base">
        Katmanlı, Canva tarzı tasarımlardan birini seç. İstediğin zaman
        değiştirebilirsin.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {TEMPLATE_CATEGORIES.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setCategory(item.id)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
              category === item.id
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border/80 text-muted-foreground hover:text-foreground"
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {templates.map((template) => {
          const selected = data.theme === template.id;
          const previewData: InvitationData = {
            ...data,
            theme: template.id,
            eventType: template.category,
            hostA: data.hostA.trim() || template.sampleNames.split(" & ")[0] || template.sampleNames,
            hostB:
              data.hostB.trim() ||
              (template.sampleNames.includes("&")
                ? template.sampleNames.split("&")[1]?.trim() ?? ""
                : ""),
            date: data.date || "2026-08-24",
          };
          return (
            <button
              key={template.id}
              type="button"
              onClick={() => selectTemplate(template.id, template.category)}
              className={cn(
                "overflow-hidden rounded-3xl border text-left transition",
                selected
                  ? "border-primary/50 shadow-[0_16px_40px_-24px_oklch(0.42_0.11_22_/_0.45)] ring-2 ring-primary/30"
                  : "border-border/70 hover:-translate-y-0.5 hover:border-primary/30"
              )}
            >
              <div className="aspect-[3/4]">
                <InvitationCard data={previewData} compact />
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-sm font-semibold">{template.title}</span>
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
