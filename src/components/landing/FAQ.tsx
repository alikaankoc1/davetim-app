"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Dijital davetiye nedir, basılı davetiyenin yerini alır mı?",
    answer:
      "Davetim, misafirlerinize WhatsApp, SMS veya QR kod ile ulaştırabileceğiniz şık bir web davetiyesidir. Baskı maliyetini ve kargo sürecini ortadan kaldırır; aynı zamanda LCV, albüm ve harita gibi basılı kartın sunamayacağı özellikler ekler.",
  },
  {
    question: "Misafirlerimin uygulama indirmesi gerekir mi?",
    answer:
      "Hayır. Davetiye her telefonda tarayıcıda açılır. QR albüme fotoğraf yüklemek için de ek bir uygulama gerekmez.",
  },
  {
    question: "QR kod canlı fotoğraf albümü nasıl çalışır?",
    answer:
      "Davetiyenize özel bir QR kod oluşturulur. Misafirler kodu okuttuğunda albümü açar ve anlık fotoğraf yükler. Tüm görseller sizin panelinizde toplanır.",
  },
  {
    question: "LCV / RSVP yanıtlarını nereden görürüm?",
    answer:
      "Misafirlerin katılım tercihleri yönetim paneline anında düşer. Gelen, gelmeyen ve henüz yanıtlamayanları tek ekrandan takip edebilirsiniz.",
  },
  {
    question: "Davetiyeyi yayınladıktan sonra düzenleyebilir miyim?",
    answer:
      "Evet. Tarih, mekan, metin ve görselleri dilediğiniz kadar güncelleyebilirsiniz. Paylaştığınız bağlantı aynı kalır, misafirler her zaman güncel sürümü görür.",
  },
  {
    question: "Ödeme ve iptal koşulları nedir?",
    answer:
      "Ödeme güvenli altyapı üzerinden alınır. Paketinizi oluşturduktan sonra ihtiyacınıza göre yükseltebilirsiniz. Detaylı iptal koşulları için destek ekibimizle iletişime geçebilirsiniz.",
  },
];

export function FAQ() {
  return (
    <section
      id="sss"
      className="relative scroll-mt-24 overflow-hidden py-20 sm:py-24"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 left-1/4 h-56 w-56 rounded-full bg-blush/60 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-gold/40 bg-card/80 px-3.5 py-1 text-xs font-medium tracking-wide text-primary">
            SSS
          </span>
          <h2 className="font-heading mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Merak edilenler,{" "}
            <span className="italic text-primary">net yanıtlar</span>
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Aklınıza takılanları topladık. Hâlâ sorunuz varsa bize yazın.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mt-12 max-w-3xl"
        >
          <Accordion className="gap-3">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.question}
                value={faq.question}
                className="rounded-2xl border border-border/70 bg-card/80 px-5 not-last:border-b-0"
              >
                <AccordionTrigger className="py-4 text-base font-medium hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
