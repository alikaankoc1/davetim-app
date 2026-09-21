"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Eye, X } from "lucide-react";
import { TemplateGalleryCard } from "@/components/editor/InvitationCard";
import { Button } from "@/components/ui/button";
import {
  getTemplateById,
  TEMPLATE_CATEGORIES,
  TEMPLATE_STYLES,
  type InvitationTemplate,
  type TemplateCategoryId,
} from "@/data/templates";
import { cn } from "@/lib/utils";

/** Ana sayfada gösterilecek en çarpıcı şablonlar (kategori başına 4) */
const FEATURED_BY_CATEGORY: Record<TemplateCategoryId, string[]> = {
  dugun: ["gece-luksu", "gul-bahcesi", "kalpli-balonlar", "cicekli-bahce"],
  nisan: ["altin-geometri", "konfeti-kalp", "ask-balonlari", "okaliptus-yesil"],
  kina: ["otantik-kirmizi", "kina-gulleri", "peoni-pembe", "hint-isigi"],
  sunnet: ["mavi-prens", "gokyuzu-balon", "uzay-kahramani", "orman-macera"],
  dogumgunu: ["neon-party", "pastel-balonlar", "kalpli-dogumgunu", "disco-glow"],
};

export function TemplateGallery() {
  const [category, setCategory] = useState<TemplateCategoryId>("dugun");
  const [preview, setPreview] = useState<InvitationTemplate | null>(null);

  const featured = useMemo(() => {
    return FEATURED_BY_CATEGORY[category]
      .map((id) => getTemplateById(id))
      .filter((template) => template.category === category)
      .slice(0, 4);
  }, [category]);

  return (
    <section
      id="tasarimlar"
      className="relative scroll-mt-28 overflow-hidden py-20 sm:py-24"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-10 right-10 h-64 w-64 rounded-full bg-gold/15 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-gold/40 bg-card/80 px-3.5 py-1 text-xs font-medium tracking-wide text-primary">
            Tasarım galerisi
          </span>
          <h2 className="font-heading mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Canva kalitesinde{" "}
            <span className="italic text-primary">şablonlar</span>
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Öne çıkan tasarımlardan birini seç; tüm koleksiyon editörde seni
            bekliyor.
          </p>
        </div>

        <div className="mt-10 flex justify-center">
          <div className="flex w-full max-w-3xl flex-wrap justify-center gap-2 rounded-full border border-border/70 bg-card/80 p-1.5">
            {TEMPLATE_CATEGORIES.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setCategory(item.id)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  category === item.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          layout
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {featured.map((template) => (
              <motion.article
                layout
                key={template.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.28 }}
                className="group relative overflow-hidden rounded-3xl border border-border/70 bg-card shadow-[0_16px_40px_-28px_rgba(40,20,16,0.4)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_24px_50px_-24px_rgba(40,20,16,0.45)]"
              >
                <div className="relative aspect-[3/4]">
                  <TemplateGalleryCard template={template} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-foreground/45 p-4 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 max-md:justify-end max-md:bg-gradient-to-t max-md:from-foreground/75 max-md:via-foreground/20 max-md:to-transparent max-md:opacity-100">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => setPreview(template)}
                      className="h-9 w-full max-w-[200px] rounded-full bg-card text-foreground"
                    >
                      <Eye className="size-3.5" />
                      Önizle
                    </Button>
                    <Button
                      nativeButton={false}
                      render={<a href={`/olustur?theme=${template.id}`} />}
                      className="h-9 w-full max-w-[200px] rounded-full"
                    >
                      Bu Şablonu Seç
                    </Button>
                  </div>
                </div>
                <div className="px-4 py-3">
                  <p className="text-sm font-semibold">{template.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {
                      TEMPLATE_STYLES.find((item) => item.id === template.style)
                        ?.label
                    }
                  </p>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-12 flex flex-col items-center gap-3 text-center">
          <Button
            nativeButton={false}
            variant="outline"
            render={<a href="/olustur" />}
            className="h-12 rounded-full border-border/80 bg-card/80 px-8 text-base shadow-sm backdrop-blur-sm transition hover:border-primary/40 hover:bg-secondary"
          >
            Daha fazlasını gör
            <ArrowRight className="size-4" />
          </Button>
          <p className="text-xs text-muted-foreground">
            40+ şablon · filtrele, seç, anında önizle
          </p>
        </div>
      </div>

      <AnimatePresence>
        {preview ? (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/45 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreview(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              className="relative w-full max-w-sm overflow-hidden rounded-[2rem] bg-card shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Önizlemeyi kapat"
                onClick={() => setPreview(null)}
                className="absolute top-3 right-3 z-10 flex size-9 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm"
              >
                <X className="size-4" />
              </button>
              <div className="aspect-[3/4]">
                <TemplateGalleryCard template={preview} />
              </div>
              <div className="flex flex-col gap-3 p-5">
                <div>
                  <p className="font-heading text-xl">{preview.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {preview.eventLabel} · {preview.sampleDate}
                  </p>
                </div>
                <Button
                  nativeButton={false}
                  render={
                    <a
                      href={`/olustur?theme=${preview.id}`}
                      onClick={() => setPreview(null)}
                    />
                  }
                  className="h-11 rounded-full"
                >
                  Bu Şablonu Seç
                </Button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
