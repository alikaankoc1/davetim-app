import type { InvitationTemplate } from "@/data/templates";
import { cn } from "@/lib/utils";

const headingFontClass = {
  "great-vibes": "font-great-vibes",
  "alex-brush": "font-alex-brush",
  cinzel: "font-cinzel",
  cormorant: "font-cormorant",
  playfair: "font-heading",
  montserrat: "font-montserrat",
} as const;

const bodyFontClass = {
  cormorant: "font-cormorant",
  montserrat: "font-montserrat",
  outfit: "font-sans",
  cinzel: "font-cinzel",
} as const;

export function templateHeadingClass(template: InvitationTemplate) {
  return headingFontClass[template.fontPairing.heading];
}

export function templateBodyClass(template: InvitationTemplate) {
  return bodyFontClass[template.fontPairing.body];
}

export function guestSectionClass(className?: string) {
  return cn("mx-auto w-full max-w-lg px-4", className);
}
