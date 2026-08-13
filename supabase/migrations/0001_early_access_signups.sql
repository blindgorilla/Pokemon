-- Early-access email capture.
--
-- Writes happen exclusively from server-side code (app/api/early-access/route.ts)
-- using the service_role key, which bypasses Row Level Security by design.
-- RLS is enabled with no policies, so anon/authenticated clients get nothing:
-- the table is unreadable and unwritable from the browser.

create table if not exists public.early_access_signups (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  source text,
  created_at timestamptz default now()
);

alter table public.early_access_signups enable row level security;

-- No policies are defined on purpose. Do not add a permissive policy here
-- without a deliberate decision — it would open the list to public clients.
