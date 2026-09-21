"use client";

import { useMemo, useState } from "react";
import { Check, Copy, Gift } from "lucide-react";
import { FadeIn } from "@/components/invitation/FadeIn";
import { guestSectionClass } from "@/components/invitation/theme-utils";
import { Button } from "@/components/ui/button";
import type { InvitationData } from "@/lib/invitation";

function extractIban(text: string) {
  const match = text.match(/TR[\d\s]{10,}/i);
  return match ? match[0].replace(/\s+/g, " ").trim() : "";
}

export function GiftSection({ data }: { data: InvitationData }) {
  const note = data.giftNote.trim();
  const [copied, setCopied] = useState(false);
  const iban = useMemo(() => extractIban(note), [note]);

  if (!note) return null;

  async function copyIban() {
    const value = iban || note;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section id="hediye" className="bg-secondary/40 py-16 sm:py-20">
      <FadeIn className={guestSectionClass()}>
        <div className="text-center">
          <p className="text-xs font-medium tracking-[0.28em] text-primary uppercase">
            Hediye
          </p>
          <h2 className="font-heading mt-3 text-3xl font-semibold tracking-tight">
            Çiftin <span className="italic text-primary">notu</span>
          </h2>
        </div>

        <div className="mt-8 rounded-3xl border border-gold/35 bg-card p-6 text-center shadow-sm">
          <span className="mx-auto flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Gift className="size-5" />
          </span>
          <p className="font-cormorant mt-4 text-lg leading-relaxed text-foreground/80 whitespace-pre-wrap">
            {note}
          </p>
          <Button
            type="button"
            variant="outline"
            onClick={copyIban}
            className="mt-6 h-11 rounded-full"
          >
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            {copied ? "Kopyalandı" : iban ? "IBAN Kopyala" : "Notu Kopyala"}
          </Button>
        </div>
      </FadeIn>
    </section>
  );
}
