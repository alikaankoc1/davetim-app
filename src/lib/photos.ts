export const PHOTOS_BUCKET = "invitation-photos";

export type AlbumPhoto = {
  id: string;
  publicUrl: string;
  fileName: string;
  createdAt: string;
  storagePath: string;
};
