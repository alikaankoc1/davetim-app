"use client";

import { useEffect, useMemo, useState } from "react";
import confetti from "canvas-confetti";
import { Check, Copy, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { absoluteInvitationUrl } from "@/lib/invitation";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

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
          Davetiyen kaydedildi. Linki kopyalayıp WhatsApp ile paylaşabilirsin.
          Katılım yanıtlarını{" "}
          <a href="/panel" className="font-medium text-primary hover:underline">
            panelinden
          </a>{" "}
          takip edebilirsin.
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
            <WhatsAppIcon className="size-4" />
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
