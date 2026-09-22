"use server";

import { createClient } from "@/lib/supabase/server";
import { getOwnerInvitation } from "@/app/actions/panel";

export type AlbumPhoto = {
  id: string;
  publicUrl: string;
  fileName: string;
  createdAt: string;
  storagePath: string;
};

const BUCKET = "invitation-photos";

export async function listPhotosBySlug(slug: string): Promise<AlbumPhoto[]> {
  const supabase = await createClient();
  const { data: invitation, error: invError } = await supabase
    .from("invitations")
    .select("id")
    .eq("slug", slug.trim().toLowerCase())
    .eq("status", "published")
    .maybeSingle();

  if (invError || !invitation) return [];

  const { data, error } = await supabase
    .from("photos")
    .select("id, public_url, file_name, created_at, storage_path")
    .eq("invitation_id", invitation.id)
    .order("created_at", { ascending: false });

  if (error || !data) return [];

  return data.map((row) => ({
    id: row.id as string,
    publicUrl: String(row.public_url ?? ""),
    fileName: String(row.file_name ?? ""),
    createdAt: String(row.created_at ?? ""),
    storagePath: String(row.storage_path ?? ""),
  }));
}

export async function getPublishedInvitationId(
  slug: string
): Promise<string | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("invitations")
    .select("id")
    .eq("slug", slug.trim().toLowerCase())
    .eq("status", "published")
    .maybeSingle();

  if (error || !data) return null;
  return data.id as string;
}

export async function listOwnerPhotos(
  invitationId: string
): Promise<AlbumPhoto[]> {
  const invitation = await getOwnerInvitation(invitationId);
  if (!invitation) return [];

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("photos")
    .select("id, public_url, file_name, created_at, storage_path")
    .eq("invitation_id", invitationId)
    .order("created_at", { ascending: false });

  if (error || !data) return [];

  return data.map((row) => ({
    id: row.id as string,
    publicUrl: String(row.public_url ?? ""),
    fileName: String(row.file_name ?? ""),
    createdAt: String(row.created_at ?? ""),
    storagePath: String(row.storage_path ?? ""),
  }));
}

export type DeletePhotoResult = { ok: true } | { ok: false; error: string };

export async function deleteOwnerPhoto(
  invitationId: string,
  photoId: string
): Promise<DeletePhotoResult> {
  const invitation = await getOwnerInvitation(invitationId);
  if (!invitation) return { ok: false, error: "Yetkin yok." };

  const supabase = await createClient();
  const { data: photo, error: findError } = await supabase
    .from("photos")
    .select("id, storage_path")
    .eq("id", photoId)
    .eq("invitation_id", invitationId)
    .maybeSingle();

  if (findError || !photo) {
    return { ok: false, error: "Fotoğraf bulunamadı." };
  }

  const path = String(photo.storage_path ?? "");
  if (path) {
    await supabase.storage.from(BUCKET).remove([path]);
  }

  const { error } = await supabase.from("photos").delete().eq("id", photoId);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export { BUCKET as PHOTOS_BUCKET };
