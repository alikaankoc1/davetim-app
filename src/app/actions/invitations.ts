"use server";

import { createClient } from "@/lib/supabase/server";
import {
  fromInvitationRow,
  toInvitationRow,
  type InvitationRow,
} from "@/lib/invitations-db";
import type { InvitationData } from "@/lib/invitation";
import {
  mockInvitationData,
  type StoredInvitation,
} from "@/lib/invitation-guest";

export type PublishResult =
  | { ok: true; slug: string }
  | { ok: false; error: string };

export async function publishInvitation(
  data: InvitationData,
  slug: string
): Promise<PublishResult> {
  const normalizedSlug = slug.trim().toLowerCase();
  if (!normalizedSlug) {
    return { ok: false, error: "Geçersiz bağlantı (slug)." };
  }
  if (!data.hostA.trim()) {
    return { ok: false, error: "En az bir isim gerekli." };
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return {
        ok: false,
        error: "Davetiyeyi kaydetmek için önce giriş yapmalısın.",
      };
    }

    const row = {
      ...toInvitationRow(data, normalizedSlug, "published"),
      user_id: user.id,
    };

    const { error } = await supabase.from("invitations").upsert(row, {
      onConflict: "slug",
    });

    if (error) {
      return { ok: false, error: error.message };
    }

    return { ok: true, slug: normalizedSlug };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Kayıt sırasında bir hata oluştu.";
    return { ok: false, error: message };
  }
}

export async function getPublishedInvitation(
  slug: string
): Promise<StoredInvitation | null> {
  const normalizedSlug = slug.trim().toLowerCase();
  if (!normalizedSlug) return null;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("invitations")
      .select(
        "id, slug, theme, event_type, host_a, host_b, event_date, event_time, venue_name, address, maps_url, music, gift_note, message, rsvp_enabled, status"
      )
      .eq("slug", normalizedSlug)
      .eq("status", "published")
      .maybeSingle();

    if (!error && data) return fromInvitationRow(data as InvitationRow);
  } catch {
    // fall through to demo
  }

  // Landing “Örnek İncele” demo
  if (normalizedSlug === mockInvitationData.slug) {
    return mockInvitationData;
  }

  return null;
}

export type RsvpResult =
  | { ok: true }
  | { ok: false; error: string };

export async function submitRsvp(input: {
  slug: string;
  name: string;
  status: "yes" | "no";
  guests: number;
  note: string;
}): Promise<RsvpResult> {
  const name = input.name.trim();
  if (!name) return { ok: false, error: "Lütfen ismini yaz." };

  try {
    const supabase = await createClient();
    const { data: invitation, error: findError } = await supabase
      .from("invitations")
      .select("id, status")
      .eq("slug", input.slug.trim().toLowerCase())
      .eq("status", "published")
      .maybeSingle();

    if (findError || !invitation) {
      return { ok: false, error: "Davetiye bulunamadı." };
    }

    const { error } = await supabase.from("rsvps").insert({
      invitation_id: invitation.id,
      guest_name: name,
      status: input.status,
      guests: input.status === "yes" ? Math.max(1, input.guests) : 0,
      note: input.note.trim(),
    });

    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "RSVP kaydedilemedi.";
    return { ok: false, error: message };
  }
}
