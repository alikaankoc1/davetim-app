"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { InvitationCard } from "@/components/editor/InvitationCard";
import { useInvitation } from "@/components/editor/invitation-store";
import {
  INVITATION_TEMPLATES,
  TEMPLATE_CATEGORIES,
  TEMPLATE_STYLES,
  getTemplateById,
  type TemplateCategoryId,
  type TemplateStyleId,
} from "@/data/templates";
import type { EventTypeId, InvitationData } from "@/lib/invitation";
import { cn } from "@/lib/utils";

type CategoryFilter = TemplateCategoryId | "all";

export function TemplateStep({
  presetFromGallery = false,
  onContinue,
}: {
  presetFromGallery?: boolean;
  onContinue?: () => void;
}) {
  const { data, update } = useInvitation();
  const selected = getTemplateById(data.theme);
  const hasSelection = Boolean(data.theme);

  const [category, setCategory] = useState<CategoryFilter>("all");
  const [style, setStyle] = useState<TemplateStyleId | "all">("all");
  const selectedRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasSelection) return;
    selectedRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [hasSelection, data.theme]);

  const styleFilters = useMemo(() => {
    const pool =
      category === "all"
        ? INVITATION_TEMPLATES
        : INVITATION_TEMPLATES.filter((item) => item.category === category);
    const present = new Set(pool.map((item) => item.style));
    return TEMPLATE_STYLES.filter((item) => present.has(item.id));
  }, [category]);

  const templates = useMemo(
    () =>
      INVITATION_TEMPLATES.filter((item) => {
        const catOk = category === "all" || item.category === category;
        const styleOk = style === "all" || item.style === style;
        return catOk && styleOk;
      }),
    [category, style]
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
        Tüm davetiyeleri filtrele, birini seç, sonra bilgilerini girmeye geç.
      </p>

      {presetFromGallery && hasSelection ? (
        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-gold/40 bg-secondary/70 px-4 py-3">
          <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Check className="size-3.5" />
          </span>
          <div>
            <p className="text-sm font-semibold text-foreground">
              {selected.title} seçildi
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Galeriden geldin. Değiştirmek istersen aşağıdan başka bir şablon
              seçebilirsin.
            </p>
          </div>
        </div>
      ) : null}

      {!hasSelection ? (
        <p className="mt-5 rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-primary">
          Devam etmek için bir davetiye şablonu seç.
        </p>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            setCategory("all");
            setStyle("all");
          }}
          className={cn(
            "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
            category === "all"
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border/80 text-muted-foreground hover:text-foreground"
          )}
        >
          Tümü
        </button>
        {TEMPLATE_CATEGORIES.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setCategory(item.id);
              setStyle("all");
            }}
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

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setStyle("all")}
          className={cn(
            "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
            style === "all"
              ? "border-gold/50 bg-secondary text-foreground"
              : "border-border/80 text-muted-foreground hover:text-foreground"
          )}
        >
          Tüm tarzlar
        </button>
        {styleFilters.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setStyle(item.id)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
              style === item.id
                ? "border-gold/50 bg-secondary text-foreground"
                : "border-border/80 text-muted-foreground hover:text-foreground"
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        {templates.length} şablon
        {hasSelection ? ` · Seçili: ${selected.title}` : ""}
      </p>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
        {templates.map((template) => {
          const isSelected = data.theme === template.id;
          const previewData: InvitationData = {
            ...data,
            theme: template.id,
            eventType: template.category,
            hostA:
              data.hostA.trim() ||
              template.sampleNames.split(" & ")[0] ||
              template.sampleNames,
            hostB:
              data.hostB.trim() ||
              (template.sampleNames.includes("&")
                ? (template.sampleNames.split("&")[1]?.trim() ?? "")
                : ""),
            date: data.date || "2026-08-24",
            rsvpEnabled: false,
          };
          return (
            <div
              key={template.id}
              ref={isSelected ? selectedRef : undefined}
              className={cn(
                "overflow-hidden rounded-3xl border text-left transition",
                isSelected
                  ? "border-primary/50 shadow-[0_16px_40px_-24px_oklch(0.42_0.11_22_/_0.45)] ring-2 ring-primary/30"
                  : "border-border/70 hover:-translate-y-0.5 hover:border-primary/30"
              )}
            >
              <button
                type="button"
                onClick={() => selectTemplate(template.id, template.category)}
                className="block w-full text-left"
              >
                <div className="aspect-[3/4]">
                  <InvitationCard data={previewData} compact />
                </div>
              </button>
              <div className="flex items-center justify-between gap-2 px-4 py-3">
                <button
                  type="button"
                  onClick={() => selectTemplate(template.id, template.category)}
                  className="min-w-0 flex-1 text-left"
                >
                  <p className="truncate text-sm font-semibold">
                    {template.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {
                      TEMPLATE_CATEGORIES.find(
                        (c) => c.id === template.category
                      )?.label
                    }{" "}
                    ·{" "}
                    {
                      TEMPLATE_STYLES.find((s) => s.id === template.style)
                        ?.label
                    }
                  </p>
                </button>
                {isSelected ? (
                  <button
                    type="button"
                    onClick={() => onContinue?.()}
                    aria-label="Kartı tasarla"
                    className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border/80 bg-secondary text-primary transition hover:border-primary/40 hover:bg-primary hover:text-primary-foreground"
                  >
                    <ArrowRight className="size-4" />
                  </button>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      {templates.length === 0 ? (
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Bu filtrede şablon yok. Filtreyi değiştir.
        </p>
      ) : null}
    </div>
  );
}
