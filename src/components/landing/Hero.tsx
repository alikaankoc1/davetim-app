"use client";

import { useRef, type MouseEvent } from "react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CONFETTI_COLORS = ["#8B3A3A", "#C9A36A", "#F3E6D8", "#D4A5A5"];
const NAVIGATE_DELAY_MS = 1100;

function launchConfetti(originX = 0.5) {
  void confetti({
    particleCount: 90,
    spread: 72,
    startVelocity: 42,
    origin: { x: originX, y: 0.72 },
    colors: CONFETTI_COLORS,
    scalar: 0.95,
    ticks: 220,
  });
  window.setTimeout(() => {
    void confetti({
      particleCount: 45,
      angle: 60,
      spread: 52,
      origin: { x: Math.max(0.15, originX - 0.2), y: 0.78 },
      colors: CONFETTI_COLORS,
      scalar: 0.85,
      ticks: 180,
    });
    void confetti({
      particleCount: 45,
      angle: 120,
      spread: 52,
      origin: { x: Math.min(0.85, originX + 0.2), y: 0.78 },
      colors: CONFETTI_COLORS,
      scalar: 0.85,
      ticks: 180,
    });
  }, 160);
}

function InvitationCard() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-[linear-gradient(180deg,#fbf6ee_0%,#f4e7d8_48%,#edd9c8_100%)] px-6 text-center">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,oklch(0.82_0.06_22_/_0.35),transparent_42%)]" />
      <div className="pointer-events-none absolute inset-4 rounded-[1.4rem] border border-gold/35" />
      <div className="pointer-events-none absolute inset-6 rounded-[1.1rem] border border-primary/10" />

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        className="relative font-cormorant text-[11px] tracking-[0.38em] text-primary/80 uppercase"
      >
        Düğün Daveti
      </motion.p>

      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="relative my-5 h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent"
      />

      <motion.h3
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85, duration: 0.8 }}
        className="relative font-cormorant text-[2.55rem] leading-[0.95] font-semibold text-[oklch(0.28_0.04_40)]"
      >
        Ali
      </motion.h3>

      <motion.span
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.05, duration: 0.5 }}
        className="relative my-1 font-cormorant text-3xl text-gold"
      >
        &
      </motion.span>

      <motion.h3
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.15, duration: 0.8 }}
        className="relative font-cormorant text-[2.55rem] leading-[0.95] font-semibold text-[oklch(0.28_0.04_40)]"
      >
        Ayşe
      </motion.h3>

      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="relative mt-5 h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent"
      />

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.7 }}
        className="relative mt-5 font-cormorant text-xl tracking-[0.18em] text-primary"
      >
        24.08.2026
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.85, duration: 0.7 }}
        className="relative mt-2 font-cormorant text-sm tracking-[0.22em] text-muted-foreground"
      >
        İstanbul
      </motion.p>
    </div>
  );
}

function PhoneMockup() {
  return (
    <motion.div
      className="relative mx-auto w-[250px] sm:w-[280px] lg:w-[300px]"
      animate={{ y: [0, -14, 0] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="animate-glow-pulse absolute inset-x-6 top-16 h-72 rounded-full bg-primary/25 blur-3xl" />
      <div className="absolute inset-x-10 bottom-10 h-28 rounded-full bg-gold/30 blur-3xl" />

      <div className="relative aspect-[9/18.4] rounded-[2.6rem] bg-neutral-950 p-[9px] shadow-[0_28px_70px_-18px_rgba(40,20,16,0.55)] ring-1 ring-white/15">
        <div className="absolute top-3 left-1/2 z-20 h-[22px] w-[92px] -translate-x-1/2 rounded-full bg-black" />
        <div className="relative h-full overflow-hidden rounded-[2.05rem] bg-[#f6eee3]">
          <InvitationCard />
        </div>
        <div className="absolute bottom-2.5 left-1/2 h-1 w-24 -translate-x-1/2 rounded-full bg-white/35" />
      </div>
    </motion.div>
  );
}

export function Hero() {
  const navigatingRef = useRef(false);

  function handleCreateClick(event: MouseEvent<HTMLAnchorElement>) {
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return;
    }

    event.preventDefault();
    if (navigatingRef.current) return;
    navigatingRef.current = true;

    const rect = event.currentTarget.getBoundingClientRect();
    const originX = (rect.left + rect.width / 2) / window.innerWidth;
    launchConfetti(originX);

    window.setTimeout(() => {
      window.location.assign("/olustur");
    }, NAVIGATE_DELAY_MS);
  }

  return (
    <section
      id="hero"
      className="relative flex min-h-svh items-center overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-24 lg:pb-16"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-blush/80 blur-3xl" />
        <div className="absolute top-20 right-0 h-96 w-96 rounded-full bg-gold/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-card/80 px-3.5 py-1.5 text-xs font-medium tracking-wide text-primary shadow-sm backdrop-blur-sm sm:text-sm"
          >
            ✨ Yeni Nesil Dijital Davetiye
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.7 }}
            className="font-heading mt-6 max-w-xl text-4xl leading-[1.12] font-semibold tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem]"
          >
            En özel gününüz için,{" "}
            <span className="italic text-primary">en zarif davetiye.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.7 }}
            className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Davetim ile dakikalar içinde lüks, kişiselleştirilmiş dijital
            davetiyeler oluşturun. Misafirlerinizi matbaa beklemeden, her
            cihazdan şık bir deneyimle karşılayın.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.7 }}
            className="mt-8 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row"
          >
            <Button
              nativeButton={false}
              render={<a href="/olustur" onClick={handleCreateClick} />}
              className="relative h-12 w-full rounded-full px-7 text-base shadow-[0_12px_40px_-6px_oklch(0.42_0.11_22_/_0.7)] ring-1 ring-white/20 transition-shadow hover:shadow-[0_16px_50px_-4px_oklch(0.42_0.11_22_/_0.85)] sm:w-auto"
            >
              <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
                <span className="animate-shimmer absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              </span>
              <span className="relative flex items-center gap-2">
                Davetiye Oluştur
                <ArrowRight className="size-4" />
              </span>
            </Button>

            <Button
              nativeButton={false}
              variant="outline"
              render={<a href="/ali-ayse" />}
              className="h-12 w-full rounded-full border-border/80 bg-card/70 px-7 text-base backdrop-blur-sm sm:w-auto"
            >
              Örnek İncele
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.85 }}
          className="relative flex justify-center"
        >
          <PhoneMockup />
        </motion.div>
      </div>
    </section>
  );
}
