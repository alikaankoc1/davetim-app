"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const categories = [
  { id: "dugun", label: "Düğün" },
  { id: "nisan", label: "Nişan" },
  { id: "kina", label: "Kına" },
  { id: "sunnet", label: "Sünnet" },
  { id: "dogumgunu", label: "Doğum Günü" },
] as const;

const styles = [
  { id: "minimal", label: "Minimal" },
  { id: "luks", label: "Lüks Altın" },
  { id: "floral", label: "Floral" },
  { id: "geometrik", label: "Modern Geometrik" },
] as const;

type CategoryId = (typeof categories)[number]["id"];
type StyleId = (typeof styles)[number]["id"];

type Template = {
  id: string;
  category: CategoryId;
  style: StyleId;
  title: string;
  event: string;
  date: string;
};

const templates: Template[] = [
  { id: "dugun-minimal", category: "dugun", style: "minimal", title: "Ali & Ayşe", event: "Düğün Daveti", date: "24.08.2026" },
  { id: "dugun-luks", category: "dugun", style: "luks", title: "Elif & Can", event: "Düğün Daveti", date: "12.09.2026" },
  { id: "dugun-floral", category: "dugun", style: "floral", title: "Zeynep & Emre", event: "Düğün Daveti", date: "03.10.2026" },
  { id: "dugun-geometrik", category: "dugun", style: "geometrik", title: "Deniz & Ece", event: "Düğün Daveti", date: "18.07.2026" },
  { id: "nisan-minimal", category: "nisan", style: "minimal", title: "Mert & Selin", event: "Nişan Töreni", date: "05.06.2026" },
  { id: "nisan-luks", category: "nisan", style: "luks", title: "Kaan & İrem", event: "Nişan Töreni", date: "21.06.2026" },
  { id: "nisan-floral", category: "nisan", style: "floral", title: "Burak & Duru", event: "Nişan Töreni", date: "14.05.2026" },
  { id: "nisan-geometrik", category: "nisan", style: "geometrik", title: "Onur & Lara", event: "Nişan Töreni", date: "28.08.2026" },
  { id: "kina-minimal", category: "kina", style: "minimal", title: "Melisa", event: "Kına Gecesi", date: "23.08.2026" },
  { id: "kina-luks", category: "kina", style: "luks", title: "Defne", event: "Kına Gecesi", date: "11.09.2026" },
  { id: "kina-floral", category: "kina", style: "floral", title: "Yasemin", event: "Kına Gecesi", date: "02.10.2026" },
  { id: "kina-geometrik", category: "kina", style: "geometrik", title: "Ceren", event: "Kına Gecesi", date: "16.07.2026" },
  { id: "sunnet-minimal", category: "sunnet", style: "minimal", title: "Mehmet", event: "Sünnet Düğünü", date: "09.08.2026" },
  { id: "sunnet-luks", category: "sunnet", style: "luks", title: "Yusuf", event: "Sünnet Düğünü", date: "20.09.2026" },
  { id: "sunnet-floral", category: "sunnet", style: "floral", title: "Ömer", event: "Sünnet Düğünü", date: "04.07.2026" },
  { id: "sunnet-geometrik", category: "sunnet", style: "geometrik", title: "Efe", event: "Sünnet Düğünü", date: "15.08.2026" },
  { id: "dogumgunu-minimal", category: "dogumgunu", style: "minimal", title: "Ada", event: "Doğum Günü", date: "01.05.2026" },
  { id: "dogumgunu-luks", category: "dogumgunu", style: "luks", title: "Asya", event: "Doğum Günü", date: "19.06.2026" },
  { id: "dogumgunu-floral", category: "dogumgunu", style: "floral", title: "Lina", event: "Doğum Günü", date: "08.04.2026" },
  { id: "dogumgunu-geometrik", category: "dogumgunu", style: "geometrik", title: "Kerem", event: "Doğum Günü", date: "27.03.2026" },
];

function TemplateFace({
  template,
  compact = false,
}: {
  template: Template;
  compact?: boolean;
}) {
  const titleSize = compact ? "text-2xl" : "text-3xl";

  if (template.style === "luks") {
    return (
      <div className="relative flex h-full flex-col items-center justify-center overflow-hidden bg-[linear-gradient(180deg,#2a1416_0%,#3d1c20_55%,#241114_100%)] px-5 text-center">
        <div className="absolute inset-4 rounded-[1.1rem] border border-gold/40" />
        <p className="font-cormorant text-[10px] tracking-[0.38em] text-gold uppercase">
          {template.event}
        </p>
        <div className="my-4 h-px w-14 bg-gold/70" />
        <p className={`font-cormorant ${titleSize} leading-tight text-[#f6eee3]`}>
          {template.title}
        </p>
        <p className="mt-4 font-cormorant text-sm tracking-[0.2em] text-gold">
          {template.date}
        </p>
      </div>
    );
  }

  if (template.style === "floral") {
    return (
      <div className="relative flex h-full flex-col items-center justify-center overflow-hidden bg-[linear-gradient(180deg,#fbf3ea_0%,#f3ddd2_100%)] px-5 text-center">
        <div className="absolute -top-8 -left-8 size-28 rounded-full bg-primary/15 blur-2xl" />
        <div className="absolute -right-6 -bottom-10 size-32 rounded-full bg-gold/25 blur-2xl" />
        <div className="absolute inset-5 rounded-[1.2rem] border border-primary/15" />
        <p className="font-cormorant text-[10px] tracking-[0.32em] text-primary/80 uppercase">
          {template.event}
        </p>
        <p className={`font-cormorant mt-4 ${titleSize} leading-tight text-foreground`}>
          {template.title}
        </p>
        <div className="mt-3 h-px w-10 bg-primary/30" />
        <p className="mt-3 font-cormorant text-sm tracking-[0.18em] text-primary">
          {template.date}
        </p>
      </div>
    );
  }

  if (template.style === "geometrik") {
    return (
      <div className="relative flex h-full flex-col items-center justify-center overflow-hidden bg-[#f7f1e8] px-5 text-center">
        <div className="absolute top-6 left-6 size-16 rotate-12 border border-primary/25" />
        <div className="absolute right-7 bottom-8 size-20 -rotate-6 border border-gold/50" />
        <div className="absolute top-1/3 right-5 size-8 rotate-45 bg-primary/10" />
        <p className="text-[10px] font-medium tracking-[0.28em] text-muted-foreground uppercase">
          {template.event}
        </p>
        <p className={`font-heading mt-4 ${titleSize} leading-tight text-foreground`}>
          {template.title}
        </p>
        <p className="mt-4 text-xs font-medium tracking-[0.2em] text-primary">
          {template.date}
        </p>
      </div>
    );
  }

  return (
    <div className="relative flex h-full flex-col items-center justify-center bg-[#fbfaf7] px-5 text-center">
      <div className="absolute inset-6 border border-foreground/10" />
      <p className="font-cormorant text-[10px] tracking-[0.4em] text-muted-foreground uppercase">
        {template.event}
      </p>
      <p className={`font-cormorant mt-5 ${titleSize} leading-tight text-foreground`}>
        {template.title}
      </p>
      <div className="my-4 h-px w-12 bg-foreground/15" />
      <p className="font-cormorant text-sm tracking-[0.18em] text-foreground/70">
        {template.date}
      </p>
    </div>
  );
}

export function TemplateGallery() {
  const [category, setCategory] = useState<CategoryId>("dugun");
  const [style, setStyle] = useState<StyleId | "all">("all");
  const [preview, setPreview] = useState<Template | null>(null);

  const visible = useMemo(
    () =>
      templates.filter(
        (item) =>
          item.category === category && (style === "all" || item.style === style)
      ),
    [category, style]
  );

  return (
    <section
      id="tasarimlar"
      className="relative scroll-mt-28 overflow-hidden py-20 sm:py-24"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-10 top-10 h-64 w-64 rounded-full bg-gold/15 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-gold/40 bg-card/80 px-3.5 py-1 text-xs font-medium tracking-wide text-primary">
            Tasarım galerisi
          </span>
          <h2 className="font-heading mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Her kutlamaya yakışan bir{" "}
            <span className="italic text-primary">şablon</span>
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Kategori ve tarza göre süzün, üzerine gelin, önizleyin ve seçin.
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4">
          <div className="flex w-full max-w-3xl flex-wrap justify-center gap-2 rounded-full border border-border/70 bg-card/80 p-1.5">
            {categories.map((item) => (
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

          <div className="flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={() => setStyle("all")}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                style === "all"
                  ? "border-gold/50 bg-secondary text-foreground"
                  : "border-border/80 text-muted-foreground hover:text-foreground"
              )}
            >
              Tüm Tarzlar
            </button>
            {styles.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setStyle(item.id)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                  style === item.id
                    ? "border-gold/50 bg-secondary text-foreground"
                    : "border-border/80 text-muted-foreground hover:text-foreground"
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
            {visible.map((template) => (
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
                  <TemplateFace template={template} />
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
                      render={<a href={`/olustur?theme=${template.style}`} />}
                      className="h-9 w-full max-w-[200px] rounded-full"
                    >
                      Bu Şablonu Seç
                    </Button>
                  </div>
                </div>
                <div className="px-4 py-3">
                  <p className="text-sm font-semibold">{template.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {styles.find((item) => item.id === template.style)?.label}
                  </p>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
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
                <TemplateFace template={preview} />
              </div>
              <div className="flex flex-col gap-3 p-5">
                <div>
                  <p className="font-heading text-xl">{preview.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {preview.event} · {preview.date}
                  </p>
                </div>
                <Button
                  nativeButton={false}
                  render={<a href={`/olustur?theme=${preview.style}`} onClick={() => setPreview(null)} />}
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
