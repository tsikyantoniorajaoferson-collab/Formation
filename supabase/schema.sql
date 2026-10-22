-- =============================================================
-- Base de données de la formation — à coller UNE FOIS dans
-- Supabase > SQL Editor > New query, puis cliquer sur "Run".
-- =============================================================

-- 1) Les clés d'accès.
--    On ne stocke que l'empreinte (hash) de chaque clé, jamais la clé en clair.
--    Aucune règle RLS n'est créée : personne ne peut lire cette table depuis
--    le navigateur. Seul le serveur (avec la clé secrète) y accède.
create table if not exists public.access_keys (
  id uuid primary key default gen_random_uuid(),
  key_hash text not null unique,
  label text,
  used_at timestamptz,
  used_by uuid references auth.users (id) on delete set null,
  used_by_email text,
  created_at timestamptz not null default now()
);

alter table public.access_keys enable row level security;
revoke all on table public.access_keys from anon, authenticated;

-- 2) La progression et les notes de chaque élève.
create table if not exists public.progress (
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  lesson_slug text not null check (char_length(lesson_slug) between 1 and 100),
  completed boolean not null default false,
  notes text not null default '' check (char_length(notes) <= 20000),
  updated_at timestamptz not null default now(),
  primary key (user_id, lesson_slug)
);

alter table public.progress enable row level security;
revoke all on table public.progress from anon, authenticated;
grant select, insert, update, delete on table public.progress to authenticated;

-- Une règle par opération : chaque élève ne voit et ne modifie que SES lignes.
drop policy if exists "progress_select_own" on public.progress;
create policy "progress_select_own" on public.progress
  for select to authenticated
  using ( (select auth.uid()) = user_id );

drop policy if exists "progress_insert_own" on public.progress;
create policy "progress_insert_own" on public.progress
  for insert to authenticated
  with check ( (select auth.uid()) = user_id );

drop policy if exists "progress_update_own" on public.progress;
create policy "progress_update_own" on public.progress
  for update to authenticated
  using ( (select auth.uid()) = user_id )
  with check ( (select auth.uid()) = user_id );

drop policy if exists "progress_delete_own" on public.progress;
create policy "progress_delete_own" on public.progress
  for delete to authenticated
  using ( (select auth.uid()) = user_id );
