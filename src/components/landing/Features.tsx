"use client";

import { motion } from "framer-motion";
import {
  Gift,
  Images,
  MapPinned,
  Music2,
  Timer,
  UserCheck,
} from "lucide-react";

const features = [
  {
    title: "QR Kod Canlı Fotoğraf Albümü",
    description:
      "Davetliler telefonlarıyla QR kodu okutsun, anında fotoğraf yüklensin. Tüm anılar tek bir zarif albümde toplansın.",
    icon: Images,
  },
  {
    title: "Akıllı LCV / RSVP Yönetimi",
    description:
      "Kimler geliyor, kimler mazeretli — yanıtlar doğrudan paneline düşer. Misafir listeniz her an güncel kalır.",
    icon: UserCheck,
  },
  {
    title: "Harita Entegrasyonu",
    description:
      "Tek dokunuşla Google Maps veya Yandex Navigasyon. Misafirleriniz salonu, nikahı ve after party’yi kaybolmadan bulur.",
    icon: MapPinned,
  },
];

const extras = [
  {
    title: "Fon Müziği",
    description: "Davetiyeniz açıldığında çalan zarif bir ambiyans.",
    icon: Music2,
  },
  {
    title: "Geri Sayım Sayacı",
    description: "Büyük güne kalan gün, saat ve dakikayı gösterin.",
    icon: Timer,
  },
  {
    title: "Hediye / IBAN Notu",
    description: "Çeyiz, hediye tercihi veya IBAN bilgisini şıkça ekleyin.",
    icon: Gift,
  },
];

export function Features() {
  return (
    <section
      id="ozellikler"
      className="relative scroll-mt-28 overflow-hidden py-20 sm:py-24"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-24 -left-16 h-64 w-64 rounded-full bg-blush/70 blur-3xl" />
        <div className="absolute right-0 bottom-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-gold/40 bg-card/80 px-3.5 py-1 text-xs font-medium tracking-wide text-primary">
            Neler sunuyoruz
          </span>
          <h2 className="font-heading mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Davetiyenin ötesinde bir{" "}
            <span className="italic text-primary">deneyim</span>
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Sadece bir kart değil: albüm, LCV, yol tarifi ve hatırlatmalar tek
            yerde.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-3xl border border-border/70 bg-card/80 p-7 shadow-[0_16px_40px_-30px_rgba(40,20,16,0.4)]"
            >
              <div className="flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-[0_8px_24px_oklch(0.42_0.11_22_/_0.28)]">
                <feature.icon className="size-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="mt-5 grid gap-5 rounded-3xl border border-gold/30 bg-card/70 p-5 sm:grid-cols-3 sm:p-6"
        >
          {extras.map((extra) => (
            <div key={extra.title} className="flex gap-4 rounded-2xl p-2">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-gold/40 bg-background text-primary">
                <extra.icon className="size-5" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{extra.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {extra.description}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
