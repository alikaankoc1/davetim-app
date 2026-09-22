-- Albüm: photos tablosu + Storage bucket
-- Supabase → SQL Editor → Run

-- 1) Tablo
create table if not exists public.photos (
  id uuid primary key default gen_random_uuid(),
  invitation_id uuid not null references public.invitations (id) on delete cascade,
  storage_path text not null unique,
  public_url text not null,
  file_name text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists photos_invitation_id_idx on public.photos (invitation_id);

alter table public.photos enable row level security;

grant select, insert, delete on table public.photos to anon, authenticated;

drop policy if exists "Public can read photos of published" on public.photos;
drop policy if exists "Anyone can insert photos for published" on public.photos;
drop policy if exists "Owners can delete photos" on public.photos;

-- Yayındaki davetiyenin fotoları herkese görünür (misafir albümü)
create policy "Public can read photos of published"
  on public.photos for select
  using (
    exists (
      select 1 from public.invitations i
      where i.id = invitation_id and i.status = 'published'
    )
  );

-- Yayındaki davetiyeye herkes foto ekleyebilir
create policy "Anyone can insert photos for published"
  on public.photos for insert
  with check (
    exists (
      select 1 from public.invitations i
      where i.id = invitation_id and i.status = 'published'
    )
  );

-- Sadece davetiye sahibi silebilir
create policy "Owners can delete photos"
  on public.photos for delete
  using (
    exists (
      select 1 from public.invitations i
      where i.id = invitation_id and i.user_id = auth.uid()
    )
  );

-- 2) Storage bucket (public okuma)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'invitation-photos',
  'invitation-photos',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- 3) Storage politikaları
drop policy if exists "Public read invitation photos" on storage.objects;
drop policy if exists "Anyone upload invitation photos" on storage.objects;
drop policy if exists "Owners delete invitation photos" on storage.objects;

create policy "Public read invitation photos"
  on storage.objects for select
  using (bucket_id = 'invitation-photos');

create policy "Anyone upload invitation photos"
  on storage.objects for insert
  with check (bucket_id = 'invitation-photos');

create policy "Owners delete invitation photos"
  on storage.objects for delete
  using (
    bucket_id = 'invitation-photos'
    and exists (
      select 1 from public.invitations i
      where i.id::text = (storage.foldername(name))[1]
        and i.user_id = auth.uid()
    )
  );
