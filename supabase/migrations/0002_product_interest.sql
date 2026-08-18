-- Interest in the future paid BUY OR PASS Method (~€39).
--
-- Kept on the signup row rather than in its own table: one visitor submits one
-- email and answers the question at most once, immediately afterwards. Storing
-- it here is what lets the free-sheet signup be compared against genuine
-- interest in the paid Method.
--
-- Nullable on purpose — most rows will never have an answer, and "did not
-- answer" is a distinct, meaningful state from "answered no".
--
-- Writes still happen exclusively from server-side code using the service_role
-- key. RLS stays enabled with no policies (see 0001), so this column is no more
-- reachable from the browser than the rest of the table.

alter table public.early_access_signups
  add column if not exists product_interest text
    check (product_interest in ('yes', 'maybe', 'no'));

alter table public.early_access_signups
  add column if not exists product_interest_at timestamptz;
