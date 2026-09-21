"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Music2, Pause, VolumeX } from "lucide-react";
import {
  TemplateFrame,
  TemplateTexture,
} from "@/components/templates/TemplateDecor";
import {
  templateBodyClass,
  templateHeadingClass,
} from "@/components/invitation/theme-utils";
import type { InvitationTemplate } from "@/data/templates";
import {
  displayNames,
  eventCardLabel,
  formatDisplayDate,
  formatDisplayTime,
  MUSIC_OPTIONS,
  type InvitationData,
} from "@/lib/invitation";
import { MUSIC_PREVIEW_URL } from "@/lib/invitation-guest";
import { cn } from "@/lib/utils";

export function HeroSection({
  data,
  template,
}: {
  data: InvitationData;
  template: InvitationTemplate;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const hasMusic = data.music !== "none";
  const musicLabel =
    MUSIC_OPTIONS.find((item) => item.id === data.music)?.label ?? "Müzik";
  const date = formatDisplayDate(data.date);
  const time = formatDisplayTime(data.time);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  async function toggleMusic() {
    if (!hasMusic) return;
    if (!audioRef.current) {
      audioRef.current = new Audio(MUSIC_PREVIEW_URL);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.45;
    }
    try {
      if (playing) {
        audioRef.current.pause();
        setPlaying(false);
      } else {
        await audioRef.current.play();
        setPlaying(true);
      }
    } catch {
      setPlaying(false);
    }
  }

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-20 text-center"
      style={{
        background: template.bgGradient,
        backgroundColor: template.bgColor,
        color: template.textColor,
      }}
    >
      <TemplateTexture texture={template.bgTexture} accent={template.accentColor} />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `linear-gradient(180deg, transparent 40%, ${template.bgColor}cc 100%)`,
          opacity: template.overlayOpacity ?? 0.35,
        }}
      />
      <TemplateFrame frame={template.frame} accent={template.accentColor} />

      <div className="relative z-10 flex max-w-md flex-col items-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={cn(
            templateBodyClass(template),
            "text-[11px] tracking-[0.38em] uppercase"
          )}
          style={{ color: template.mutedColor }}
        >
          {eventCardLabel(data.eventType)}
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.25, duration: 0.55 }}
          className="my-6 h-px w-16 origin-center"
          style={{
            background: `linear-gradient(90deg, transparent, ${template.accentColor}, transparent)`,
          }}
        />

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.75 }}
          className={cn(
            templateHeadingClass(template),
            "text-5xl leading-[1.05] sm:text-6xl"
          )}
        >
          {displayNames(data)}
        </motion.h1>

        {(date || time) && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className={cn(templateBodyClass(template), "mt-6 text-base tracking-[0.18em]")}
            style={{ color: template.accentColor }}
          >
            {[date, time].filter(Boolean).join(" · ")}
          </motion.p>
        )}

        {data.message.trim() ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.7 }}
            className={cn(
              templateBodyClass(template),
              "mt-8 max-w-[28ch] text-base leading-relaxed"
            )}
            style={{ color: template.mutedColor }}
          >
            {data.message.trim()}
          </motion.p>
        ) : null}

        {hasMusic ? (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            onClick={toggleMusic}
            className="mt-10 inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm backdrop-blur-md transition hover:scale-[1.02]"
            style={{
              borderColor: `${template.accentColor}66`,
              color: template.textColor,
              background: `${template.bgColor}88`,
            }}
            aria-pressed={playing}
          >
            {playing ? (
              <Pause className="size-4" style={{ color: template.accentColor }} />
            ) : (
              <Music2 className="size-4" style={{ color: template.accentColor }} />
            )}
            {playing ? "Müziği durdur" : "Müziği aç"}
            <span className="sr-only">{musicLabel}</span>
          </motion.button>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-10 inline-flex items-center gap-2 text-xs opacity-60"
          >
            <VolumeX className="size-3.5" />
            Sessiz davetiye
          </motion.p>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        style={{ color: template.mutedColor }}
      >
        <div className="flex flex-col items-center gap-2 text-[10px] tracking-[0.28em] uppercase">
          Kaydır
          <span className="h-8 w-px animate-pulse bg-current opacity-50" />
        </div>
      </motion.div>
    </section>
  );
}
