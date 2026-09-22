"use client";

import { useEffect, useMemo, useState } from "react";
import confetti from "canvas-confetti";
import { Check, Copy, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { absoluteInvitationUrl } from "@/lib/invitation";

export function SuccessView({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    setShareUrl(absoluteInvitationUrl(slug));
  }, [slug]);

  useEffect(() => {
    void confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.35 },
      colors: ["#8B3A3A", "#C9A36A", "#F3E6D8", "#D4A5A5"],
    });
  }, []);

  const whatsappHref = useMemo(() => {
    if (!shareUrl) return "#";
    const text = `Davetiyemiz: ${shareUrl}`;
    return `https://wa.me/?text=${encodeURIComponent(text)}`;
  }, [shareUrl]);

  async function copyLink() {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-background px-4 py-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-10 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-blush/80 blur-3xl" />
        <div className="absolute right-10 bottom-10 h-56 w-56 rounded-full bg-gold/20 blur-3xl" />
      </div>

      <div className="relative w-full max-w-lg rounded-[2rem] border border-border/70 bg-card/80 p-8 text-center shadow-[0_24px_60px_-32px_rgba(40,20,16,0.4)]">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_10px_30px_oklch(0.42_0.11_22_/_0.35)]">
          <Check className="size-6" />
        </span>
        <h1 className="font-heading mt-5 text-3xl font-semibold tracking-tight">
          Davetiyen <span className="italic text-primary">hazır</span>
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          Linki WhatsApp ile paylaşabilirsin. Not: bilgisayarındaki localhost
          linki başka telefonda açılmaz; site yayınlanınca herkes açabilir.
        </p>

        <div className="mt-6 rounded-2xl border border-gold/35 bg-secondary/70 px-4 py-3">
          <p className="text-xs text-muted-foreground">Paylaşım linki</p>
          <p className="mt-1 font-medium break-all text-primary">
            {shareUrl || "…"}
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
          <Button
            nativeButton={false}
            render={<a href={`/${slug}`} />}
            className="h-11 rounded-full px-5"
          >
            Davetiyeyi aç
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={copyLink}
            className="h-11 rounded-full px-5"
          >
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            {copied ? "Kopyalandı" : "Linki kopyala"}
          </Button>
          <Button
            nativeButton={false}
            variant="outline"
            render={
              <a href={whatsappHref} target="_blank" rel="noreferrer" />
            }
            className="h-11 rounded-full px-5"
          >
            <MessageCircle className="size-4" />
            WhatsApp
          </Button>
          <Button
            nativeButton={false}
            variant="outline"
            render={<a href="/" />}
            className="h-11 rounded-full px-5"
          >
            <Sparkles className="size-4" />
            Ana sayfa
          </Button>
        </div>
      </div>
    </div>
  );
}
