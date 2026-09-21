import {
  defaultInvitation,
  normalizeThemeId,
  type EventTypeId,
  type InvitationData,
  type MusicId,
} from "@/lib/invitation";
import type { StoredInvitation } from "@/lib/invitation-guest";

export type InvitationRow = {
  id: string;
  slug: string;
  theme: string;
  event_type: string;
  host_a: string;
  host_b: string;
  event_date: string | null;
  event_time: string | null;
  venue_name: string;
  address: string;
  maps_url: string;
  music: string;
  gift_note: string;
  message: string;
  rsvp_enabled: boolean;
  status: string;
};

export function toInvitationRow(
  data: InvitationData,
  slug: string,
  status: "draft" | "paid" | "published" = "published"
) {
  return {
    slug,
    theme: data.theme || defaultInvitation.theme || "gece-luksu",
    event_type: data.eventType,
    host_a: data.hostA.trim(),
    host_b: data.hostB.trim(),
    event_date: data.date || null,
    event_time: data.time || null,
    venue_name: data.venueName,
    address: data.address,
    maps_url: data.mapsUrl,
    music: data.music,
    gift_note: data.giftNote,
    message: data.message,
    rsvp_enabled: data.rsvpEnabled,
    status,
    updated_at: new Date().toISOString(),
  };
}

export function fromInvitationRow(row: InvitationRow): StoredInvitation {
  return {
    ...defaultInvitation,
    theme: normalizeThemeId(row.theme),
    eventType: (row.event_type as EventTypeId) || defaultInvitation.eventType,
    hostA: row.host_a ?? "",
    hostB: row.host_b ?? "",
    date: row.event_date ?? "",
    time: row.event_time ?? "",
    venueName: row.venue_name ?? "",
    address: row.address ?? "",
    mapsUrl: row.maps_url ?? "",
    music: (row.music as MusicId) || "none",
    giftNote: row.gift_note ?? "",
    message: row.message ?? "",
    rsvpEnabled: row.rsvp_enabled ?? true,
    slug: row.slug,
  };
}
