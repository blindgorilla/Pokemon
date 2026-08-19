-- "Ask before you buy" hero funnel: one row per card submitted for a
-- personal check.
--
-- Writes happen exclusively from server-side code
-- (app/api/card-check/route.ts and app/api/card-check/submit/route.ts) using
-- the service_role key, which bypasses Row Level Security by design.
-- RLS is enabled with no policies, so anon/authenticated clients get nothing:
-- the table is unreadable and unwritable from the browser, matching
-- early_access_signups. Submissions are reviewed directly in the Supabase
-- table editor — no admin UI yet.
--
-- Row lifecycle:
--   1. Step 1 (card name only) inserts with status = 'started'.
--   2. Step 2 (price + email) updates the same row: status = 'submitted',
--      submitted_at = now().
--   3. A manual reply later sets answer + status = 'answered' + answered_at.

create table if not exists public.card_checks (
  id uuid primary key default gen_random_uuid(),
  card_name text not null,
  price text,
  email text,
  status text not null default 'started',
  answer text,
  created_at timestamptz not null default now(),
  submitted_at timestamptz,
  answered_at timestamptz
);

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'card_checks_status_check'
      and conrelid = 'public.card_checks'::regclass
  ) then
    alter table public.card_checks
      add constraint card_checks_status_check
      check (status in ('started', 'submitted', 'answered'));
  end if;
end $$;

alter table public.card_checks enable row level security;

-- No policies are defined on purpose. Do not add a permissive policy here
-- without a deliberate decision — it would open submissions to public clients.
