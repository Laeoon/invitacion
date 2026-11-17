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

drop policy if exists "Solo admin puede borrar invitados" on public.invitados;
create policy "Solo admin puede borrar invitados"
  on public.invitados for delete
  to authenticated
  using (true);

create table if not exists public.album_fotos (
  id uuid primary key default gen_random_uuid(),
  autor text not null,
  url text not null,
  caption text,
  owner_token text,
  storage_path text,
  created_at timestamptz not null default now()
);

alter table public.album_fotos add column if not exists owner_token text;
alter table public.album_fotos add column if not exists storage_path text;

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

drop policy if exists "Solo admin puede borrar fotos" on public.album_fotos;
create policy "Solo admin puede borrar fotos"
  on public.album_fotos for delete
  to authenticated
  using (true);

create or replace function public.delete_own_photo(p_photo_id uuid, p_owner_token text)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_deleted integer;
begin
  delete from public.album_fotos
  where id = p_photo_id
    and owner_token = p_owner_token;

  get diagnostics v_deleted = row_count;
  return v_deleted > 0;
end;
$$;

grant execute on function public.delete_own_photo(uuid, text) to anon, authenticated;

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

drop policy if exists "Solo admin borra archivos album-fiesta" on storage.objects;
create policy "Solo admin borra archivos album-fiesta"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'album-fiesta');
