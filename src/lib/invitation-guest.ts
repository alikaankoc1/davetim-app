import {
  defaultInvitation,
  INVITATION_STORAGE_KEY,
  makeSlug,
  type InvitationData,
} from "@/lib/invitation";

export type StoredInvitation = InvitationData & {
  slug: string;
};

export const mockInvitationData: StoredInvitation = {
  ...defaultInvitation,
  theme: "gece-luksu",
  eventType: "dugun",
  hostA: "Ali",
  hostB: "Ayşe",
  date: "2027-08-24",
  time: "19:00",
  venueName: "The Plaza Hotel",
  address: "Teşvikiye Cad. No: 12, Şişli / İstanbul",
  mapsUrl: "https://maps.google.com/?q=The+Plaza+Hotel+Istanbul",
  music: "canon",
  giftNote: "Çiçek yerine bir dilek… IBAN: TR00 0000 0000 0000 0000 0000 00",
  rsvpEnabled: true,
  message:
    "Sizleri bu özel günümüzde yanımızda görmekten mutluluk duyarız.",
  slug: "ali-ayse",
};

/** Soft ambient preview for non-silent music picks (demo). */
export const MUSIC_PREVIEW_URL =
  "https://assets.mixkit.co/music/preview/mixkit-romantic-motivation-instrumental-2083.mp3";

export function parseStoredInvitation(raw: string | null): StoredInvitation | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<StoredInvitation>;
    if (!parsed || typeof parsed !== "object") return null;
    const hostA = String(parsed.hostA ?? "").trim();
    const hostB = String(parsed.hostB ?? "").trim();
    const slug =
      String(parsed.slug ?? "").trim() || makeSlug(hostA, hostB);
    return {
      ...defaultInvitation,
      ...parsed,
      hostA,
      hostB,
      slug,
      theme: String(parsed.theme ?? mockInvitationData.theme),
      eventType: parsed.eventType ?? mockInvitationData.eventType,
      rsvpEnabled: parsed.rsvpEnabled ?? true,
    };
  } catch {
    return null;
  }
}

export function loadInvitationBySlug(slug: string): StoredInvitation {
  const normalized = slug.trim().toLowerCase();
  if (typeof window !== "undefined") {
    const stored = parseStoredInvitation(
      window.localStorage.getItem(INVITATION_STORAGE_KEY)
    );
    if (stored && stored.slug.toLowerCase() === normalized) {
      return stored;
    }
  }
  if (normalized === mockInvitationData.slug) {
    return mockInvitationData;
  }
  return {
    ...mockInvitationData,
    slug: normalized,
    hostA: titleCaseSlug(normalized.split("-")[0] ?? "Davet"),
    hostB: titleCaseSlug(normalized.split("-")[1] ?? ""),
  };
}

function titleCaseSlug(part: string) {
  if (!part) return "";
  return part.charAt(0).toUpperCase() + part.slice(1);
}

export function mapsLinks(mapsUrl: string, address: string, venueName: string) {
  const query = encodeURIComponent(
    mapsUrl || address || venueName || "İstanbul"
  );
  const google =
    mapsUrl.startsWith("http")
      ? mapsUrl
      : `https://www.google.com/maps/search/?api=1&query=${query}`;
  const apple = `https://maps.apple.com/?q=${query}`;
  return { google, apple };
}

export function eventDateTime(data: InvitationData) {
  if (!data.date) return null;
  const time = (data.time || "00:00").slice(0, 5);
  const iso = `${data.date}T${time}:00`;
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? null : date;
}

export type RsvpPayload = {
  name: string;
  status: "yes" | "no";
  guests: number;
  note: string;
  createdAt: string;
};

export function rsvpStorageKey(slug: string) {
  return `davetim-rsvp-${slug}`;
}

export function photosStorageKey(slug: string) {
  return `davetim-photos-${slug}`;
}
