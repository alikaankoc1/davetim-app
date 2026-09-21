"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const plans = [
  {
    id: "temel",
    name: "Temel Davetiye",
    price: "299",
    description: "Şık bir dijital davetiye için ihtiyacınız olan her şey.",
    featured: false,
    features: [
      "1 dijital davetiye şablonu",
      "İsim, tarih ve mekan düzenleme",
      "Paylaşılabilir bağlantı",
      "Akıllı LCV / RSVP",
      "Harita yönlendirmesi",
    ],
  },
  {
    id: "premium",
    name: "Premium Paket + QR Albüm",
    price: "599",
    description: "En çok tercih edilen. Anılar, müzik ve albüm bir arada.",
    featured: true,
    features: [
      "Temel paketteki her şey",
      "QR kod canlı fotoğraf albümü",
      "Fon müziği ve geri sayım",
      "Hediye / IBAN notu",
      "Sınırsız düzenleme",
    ],
  },
  {
    id: "vip",
    name: "VIP Özel Tasarım",
    price: "1.499",
    description: "Size özel tasarım, birebir destek ve ayrıcalıklı detaylar.",
    featured: false,
    features: [
      "Premium paketteki her şey",
      "Kişiye özel tasarım",
      "Öncelikli destek",
      "Sınırsız misafir",
      "Marka / logo yerleştirme",
    ],
  },
];

export function Pricing() {
  return (
    <section
      id="paketler"
      className="relative scroll-mt-24 overflow-hidden py-20 sm:py-24"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-10 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-gold/40 bg-card/80 px-3.5 py-1 text-xs font-medium tracking-wide text-primary">
            Paketler
          </span>
          <h2 className="font-heading mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Size uygun,{" "}
            <span className="italic text-primary">net fiyatlar</span>
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Gizli ücret yok. İhtiyacınız kadar başlayın, dilediğinizde yükseltin.
          </p>
        </div>

        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.article
              key={plan.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "relative flex flex-col rounded-3xl border bg-card/80 p-7",
                plan.featured
                  ? "border-primary/40 shadow-[0_20px_60px_-20px_oklch(0.42_0.11_22_/_0.45)] ring-1 ring-primary/30 lg:-translate-y-3"
                  : "border-border/70 shadow-[0_16px_40px_-30px_rgba(40,20,16,0.35)]"
              )}
            >
              {plan.featured ? (
                <>
                  <div className="animate-glow-pulse pointer-events-none absolute -inset-px -z-10 rounded-3xl bg-primary/20 blur-xl" />
                  <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-primary px-3 py-1 text-[11px] font-medium text-primary-foreground shadow-[0_8px_20px_oklch(0.42_0.11_22_/_0.4)]">
                    <Sparkles className="size-3" />
                    En çok tercih edilen
                  </span>
                </>
              ) : null}

              <h3 className="font-heading text-2xl font-semibold text-foreground">
                {plan.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {plan.description}
              </p>
              <p className="mt-6 flex items-end gap-1">
                <span className="font-heading text-4xl font-semibold text-foreground">
                  ₺{plan.price}
                </span>
                <span className="mb-1 text-sm text-muted-foreground">
                  / davetiye
                </span>
              </p>

              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm text-foreground"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                nativeButton={false}
                variant={plan.featured ? "default" : "outline"}
                render={<a href="#olustur" />}
                className={cn(
                  "mt-8 h-11 rounded-full",
                  plan.featured &&
                    "shadow-[0_12px_36px_-8px_oklch(0.42_0.11_22_/_0.55)]"
                )}
              >
                Hemen Başla
              </Button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
