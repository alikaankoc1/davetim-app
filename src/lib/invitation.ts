import {
  INVITATION_TEMPLATES,
  LEGACY_THEME_MAP,
  getTemplateById,
} from "@/data/templates";

export const EVENT_TYPES = [
  { id: "dugun", label: "Düğün", cardLabel: "Düğün Daveti" },
  { id: "nisan", label: "Nişan", cardLabel: "Nişan Töreni" },
  { id: "kina", label: "Kına", cardLabel: "Kına Gecesi" },
  { id: "sunnet", label: "Sünnet", cardLabel: "Sünnet Düğünü" },
  { id: "dogumgunu", label: "Doğum Günü", cardLabel: "Doğum Günü" },
] as const;

/** Theme id = template id (legacy ids still accepted via LEGACY_THEME_MAP) */
export const THEMES = INVITATION_TEMPLATES.map((template) => ({
  id: template.id,
  label: template.title,
  category: template.category,
  style: template.style,
}));

export const MUSIC_OPTIONS = [
  { id: "none", label: "Sessiz", src: null },
  {
    id: "canon",
    label: "Wedding Love",
    src: "/music/weddinglove.mp3",
  },
  {
    id: "thousand",
    label: "Happy Love",
    src: "/music/happylove.mp3",
  },
  {
    id: "perfect",
    label: "Love",
    src: "/music/love.mp3",
  },
  {
    id: "piano",
    label: "After Party",
    src: "/music/afterparty.mp3",
  },
] as const;

export type EventTypeId = (typeof EVENT_TYPES)[number]["id"];
export type ThemeId = string;
export type MusicId = (typeof MUSIC_OPTIONS)[number]["id"];

export function musicSrc(musicId: MusicId | string) {
  const option = MUSIC_OPTIONS.find((item) => item.id === musicId);
  return option?.src ?? null;
}

export type InvitationData = {
  theme: ThemeId;
  eventType: EventTypeId;
  hostA: string;
  hostB: string;
  date: string;
  time: string;
  venueName: string;
  address: string;
  mapsUrl: string;
  music: MusicId;
  giftNote: string;
  rsvpEnabled: boolean;
  message: string;
};

export const defaultInvitation: InvitationData = {
  theme: "",
  eventType: "dugun",
  hostA: "",
  hostB: "",
  date: "",
  time: "",
  venueName: "",
  address: "",
  mapsUrl: "",
  music: "none",
  giftNote: "",
  rsvpEnabled: true,
  message: "",
};

export { getTemplateById, LEGACY_THEME_MAP };

export const INVITATION_STORAGE_KEY = "davetim-invitation";

const TR_MAP: Record<string, string> = {
  ç: "c",
  Ç: "c",
  ğ: "g",
  Ğ: "g",
  ı: "i",
  I: "i",
  İ: "i",
  ö: "o",
  Ö: "o",
  ş: "s",
  Ş: "s",
  ü: "u",
  Ü: "u",
};

export function slugifyPart(value: string) {
  return value
    .split("")
    .map((char) => TR_MAP[char] ?? char)
    .join("")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function makeSlug(hostA: string, hostB: string) {
  const parts = [slugifyPart(hostA), slugifyPart(hostB)].filter(Boolean);
  return parts.join("-") || "davet";
}

export function hasPartner(eventType: EventTypeId) {
  return eventType === "dugun" || eventType === "nisan";
}

export function eventCardLabel(eventType: EventTypeId) {
  return EVENT_TYPES.find((item) => item.id === eventType)?.cardLabel ?? "Davet";
}

export function displayNames(data: InvitationData) {
  const a = data.hostA.trim();
  const b = data.hostB.trim();
  if (a && b) return `${a} & ${b}`;
  return a || b || "İsimler";
}

export function formatDisplayDate(iso: string) {
  if (!iso) return "";
  const [year, month, day] = iso.split("-");
  if (!year || !month || !day) return iso;
  return `${day}.${month}.${year}`;
}

export function formatDisplayTime(value: string) {
  if (!value) return "";
  return value.slice(0, 5);
}

export function invitationLink(slug: string) {
  return `davetim.com/${slug}`;
}

/** WhatsApp / kopyala için gerçek açılır adres */
export function absoluteInvitationUrl(slug: string) {
  const path = `/${slug.trim().replace(/^\/+/, "")}`;
  const site = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (site) return `${site}${path}`;
  if (typeof window !== "undefined") {
    return `${window.location.origin}${path}`;
  }
  return path;
}

export function nameLabels(eventType: EventTypeId) {
  if (eventType === "dugun") return { a: "Gelin", b: "Damat" };
  if (eventType === "nisan") return { a: "İsim 1", b: "İsim 2" };
  if (eventType === "kina") return { a: "Gelin adı", b: "" };
  if (eventType === "sunnet") return { a: "Çocuğun adı", b: "" };
  return { a: "Kutlayan", b: "" };
}

export function normalizeThemeId(value: string | undefined) {
  if (!value) return defaultInvitation.theme;
  return LEGACY_THEME_MAP[value] ?? value;
}
