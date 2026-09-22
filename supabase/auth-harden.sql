-- Auth sonrası: geçici açık politikaları kaldır
-- SQL Editor'da bir kez çalıştır

drop policy if exists "Temp public can insert invitations" on public.invitations;
drop policy if exists "Temp public can update invitations" on public.invitations;
drop policy if exists "Temp public can select invitations" on public.invitations;
