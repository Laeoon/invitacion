-- Ejecuta este script en el SQL Editor de tu proyecto nuevo en Supabase

-- 1. Tabla de invitados (visitas + confirmaciones RSVP)
create table if not exists public.invitados (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  asistencia text not null default 'Abrió invitación',
  acompanantes integer not null default 0,
  dispositivo text,
  created_at timestamptz not null default now()
);

alter table public.invitados enable row level security;

drop policy if exists "Permitir lectura publica de invitados" on public.invitados;
create policy "Permitir lectura publica de invitados"
  on public.invitados for select
  to anon, authenticated
  using (true);

drop policy if exists "Permitir registro publico de invitados" on public.invitados;
create policy "Permitir registro publico de invitados"
  on public.invitados for insert
  to anon, authenticated
  with check (true);

-- 2. Tabla de fotos del album de la fiesta
create table if not exists public.album_fotos (
  id uuid primary key default gen_random_uuid(),
  autor text not null,
  url text not null,
  caption text,
  created_at timestamptz not null default now()
);

alter table public.album_fotos enable row level security;

drop policy if exists "Permitir ver fotos del album" on public.album_fotos;
create policy "Permitir ver fotos del album"
  on public.album_fotos for select
  to anon, authenticated
  using (true);

drop policy if exists "Permitir subir fotos al album" on public.album_fotos;
create policy "Permitir subir fotos al album"
  on public.album_fotos for insert
  to anon, authenticated
  with check (true);

-- 3. Bucket de Storage para las fotos
insert into storage.buckets (id, name, public)
values ('album-fiesta', 'album-fiesta', true)
on conflict (id) do update set public = true;

drop policy if exists "Lectura publica album-fiesta" on storage.objects;
create policy "Lectura publica album-fiesta"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'album-fiesta');

drop policy if exists "Subida publica album-fiesta" on storage.objects;
create policy "Subida publica album-fiesta"
  on storage.objects for insert
  to anon, authenticated
  with check (bucket_id = 'album-fiesta');
