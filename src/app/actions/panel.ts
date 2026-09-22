"use server";

import { createClient } from "@/lib/supabase/server";
import {
  fromInvitationRow,
  type InvitationRow,
} from "@/lib/invitations-db";
import type { StoredInvitation } from "@/lib/invitation-guest";

export type OwnerInvitation = StoredInvitation & {
  id: string;
  status: string;
  createdAt: string;
};

export type OwnerRsvp = {
  id: string;
  guestName: string;
  status: "yes" | "no";
  guests: number;
  note: string;
  createdAt: string;
};

export async function listOwnerInvitations(): Promise<OwnerInvitation[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("invitations")
    .select(
      "id, slug, theme, event_type, host_a, host_b, event_date, event_time, venue_name, address, maps_url, music, gift_note, message, rsvp_enabled, status, created_at"
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error || !data) return [];

  return data.map((row) => {
    const base = fromInvitationRow(row as InvitationRow);
    return {
      ...base,
      id: row.id as string,
      status: String(row.status ?? "draft"),
      createdAt: String(row.created_at ?? ""),
    };
  });
}

export async function getOwnerInvitation(
  id: string
): Promise<OwnerInvitation | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("invitations")
    .select(
      "id, slug, theme, event_type, host_a, host_b, event_date, event_time, venue_name, address, maps_url, music, gift_note, message, rsvp_enabled, status, created_at"
    )
    .eq("id", id)
    .eq("user_id", user.id)
    .maybeSingle();

  if (error || !data) return null;

  const base = fromInvitationRow(data as InvitationRow);
  return {
    ...base,
    id: data.id as string,
    status: String(data.status ?? "draft"),
    createdAt: String(data.created_at ?? ""),
  };
}

export async function listOwnerRsvps(
  invitationId: string
): Promise<OwnerRsvp[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  // Ownership check via invitation
  const invitation = await getOwnerInvitation(invitationId);
  if (!invitation) return [];

  const { data, error } = await supabase
    .from("rsvps")
    .select("id, guest_name, status, guests, note, created_at")
    .eq("invitation_id", invitationId)
    .order("created_at", { ascending: false });

  if (error || !data) return [];

  return data.map((row) => ({
    id: row.id as string,
    guestName: String(row.guest_name ?? ""),
    status: row.status === "no" ? "no" : "yes",
    guests: Number(row.guests ?? 0),
    note: String(row.note ?? ""),
    createdAt: String(row.created_at ?? ""),
  }));
}
