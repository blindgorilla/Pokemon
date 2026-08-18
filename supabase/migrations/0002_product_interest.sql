-- Interest in the future paid BUY OR PASS Method (~€39).
--
-- Kept on the signup row rather than in its own table: one visitor submits one
-- email and answers the question at most once, immediately afterwards. Storing
-- it here is what lets the free-sheet signup be compared against genuine
-- interest in the paid Method, and it is why app/api/product-interest/route.ts
-- updates this row by id rather than inserting a new one.
--
-- Nullable on purpose — most rows will never have an answer, and "did not
-- answer" is a distinct, meaningful state from "answered no".
--
-- Writes still happen exclusively from server-side code using the service_role
-- key. RLS stays enabled with no policies (see 0001), so these columns are no
-- more reachable from the browser than the rest of the table.

alter table public.early_access_signups
  add column if not exists product_interest text;

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'early_access_signups_product_interest_check'
      and conrelid = 'public.early_access_signups'::regclass
  ) then
    alter table public.early_access_signups
      add constraint early_access_signups_product_interest_check
      check (product_interest in ('yes', 'maybe', 'no'));
  end if;
end $$;

alter table public.early_access_signups
  add column if not exists interest_updated_at timestamptz;
