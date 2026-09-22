"use client";

import { motion } from "framer-motion";
import { LayoutTemplate, Link2, PenLine } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Şablonunu Seç",
    description:
      "Düğün, nişan, kına ve daha fazlası için onlarca zarif şablon arasından size en yakışanı seçin.",
    icon: LayoutTemplate,
  },
  {
    step: "02",
    title: "Bilgilerini Gir & Özelleştir",
    description:
      "İsimler, tarih, mekan ve renkler. Dakikalar içinde davetiyenizi kendi tarzınıza göre düzenleyin.",
    icon: PenLine,
  },
  {
    step: "03",
    title: "Linki Paylaş",
    description:
      "Tek bir bağlantı ile tüm misafirlerinize ulaşın. Baskı, kargo, bekleme yok. QR paylaşımı yakında.",
    icon: Link2,
  },
];

export function HowItWorks() {
  return (
    <section
      id="nasil"
      className="relative scroll-mt-28 overflow-hidden py-20 sm:py-24"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-10 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-gold/15 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-gold/40 bg-card/80 px-3.5 py-1 text-xs font-medium tracking-wide text-primary">
            Üç basit adım
          </span>
          <h2 className="font-heading mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Nasıl <span className="italic text-primary">çalışır?</span>
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Davetiyeniz dakikalar içinde hazır. Şık, kişisel ve paylaşılabilir.
          </p>
        </div>

        <div className="relative mt-14 grid gap-8 md:grid-cols-3 md:gap-6">
          <div className="absolute top-[2.75rem] right-[12%] left-[12%] hidden h-px bg-gradient-to-r from-transparent via-gold/55 to-transparent md:block" />

          {steps.map((item, index) => (
            <motion.article
              key={item.step}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, delay: index * 0.12 }}
              className="relative rounded-3xl border border-border/70 bg-card/70 p-7 text-center shadow-[0_12px_40px_-28px_rgba(40,20,16,0.35)] backdrop-blur-sm"
            >
              <div className="mx-auto flex size-14 items-center justify-center rounded-full border border-gold/40 bg-background text-primary shadow-[0_0_24px_oklch(0.42_0.11_22_/_0.12)]">
                <item.icon className="size-6" />
              </div>
              <p className="mt-4 font-heading text-sm tracking-[0.28em] text-gold">
                {item.step}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
