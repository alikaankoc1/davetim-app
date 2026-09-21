-- Davetim schema (SQL Editor'da çalıştır)
-- Adım: Supabase → SQL Editor → New query → yapıştır → Run

create extension if not exists "pgcrypto";

-- Davetiyeler
create table if not exists public.invitations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  slug text not null unique,
  theme text not null default 'gece-luksu',
  event_type text not null default 'dugun',
  host_a text not null default '',
  host_b text not null default '',
  event_date date,
  event_time text,
  venue_name text not null default '',
  address text not null default '',
  maps_url text not null default '',
  music text not null default 'none',
  gift_note text not null default '',
  message text not null default '',
  rsvp_enabled boolean not null default true,
  status text not null default 'draft' check (status in ('draft', 'paid', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists invitations_slug_idx on public.invitations (slug);
create index if not exists invitations_user_id_idx on public.invitations (user_id);

-- RSVP cevapları
create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  invitation_id uuid not null references public.invitations (id) on delete cascade,
  guest_name text not null,
  status text not null check (status in ('yes', 'no')),
  guests integer not null default 1,
  note text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists rsvps_invitation_id_idx on public.rsvps (invitation_id);

-- Siparişler (ödeme için hazır)
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  invitation_id uuid not null references public.invitations (id) on delete cascade,
  user_id uuid references auth.users (id) on delete set null,
  amount_kurus integer not null,
  currency text not null default 'TRY',
  provider text not null default 'pending',
  provider_ref text,
  status text not null default 'pending' check (status in ('pending', 'paid', 'failed', 'refunded')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists orders_invitation_id_idx on public.orders (invitation_id);

-- RLS
alter table public.invitations enable row level security;
alter table public.rsvps enable row level security;
alter table public.orders enable row level security;

-- Policy'ler tekrar çalıştırılabilir olsun
drop policy if exists "Public can read published invitations" on public.invitations;
drop policy if exists "Users manage own invitations" on public.invitations;
drop policy if exists "Anyone can insert rsvp for published" on public.rsvps;
drop policy if exists "Owners can read rsvps" on public.rsvps;
drop policy if exists "Users manage own orders" on public.orders;

-- Yayındaki davetiyeler herkese okunabilir (misafir sayfası)
create policy "Public can read published invitations"
  on public.invitations for select
  using (status = 'published');

-- Sahibi kendi davetiyelerini yönetir
create policy "Users manage own invitations"
  on public.invitations for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Yayındaki davetiyeye RSVP herkes ekleyebilir
create policy "Anyone can insert rsvp for published"
  on public.rsvps for insert
  with check (
    exists (
      select 1 from public.invitations i
      where i.id = invitation_id and i.status = 'published'
    )
  );

create policy "Owners can read rsvps"
  on public.rsvps for select
  using (
    exists (
      select 1 from public.invitations i
      where i.id = invitation_id and i.user_id = auth.uid()
    )
  );

-- Sipariş: sadece sahibi
create policy "Users manage own orders"
  on public.orders for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
