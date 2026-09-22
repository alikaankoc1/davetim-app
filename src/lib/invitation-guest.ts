import {
  defaultInvitation,
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
  rsvpEnabled: false,
  message:
    "Sizleri bu özel günümüzde yanımızda görmekten mutluluk duyarız.",
  slug: "ali-ayse",
};

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

export function photosStorageKey(slug: string) {
  return `davetim-photos-${slug}`;
}
