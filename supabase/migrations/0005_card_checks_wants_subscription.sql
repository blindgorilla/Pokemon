-- Adds the weekly-subscription-interest opt-in captured on step 2 of the
-- "Ask before you buy" hero funnel (components/CardCheckForm.tsx), alongside
-- the existing wants_course opt-in. Unchecked by default — a genuine
-- low-pressure opt-in, never implied or pre-selected.

alter table public.card_checks
  add column if not exists wants_subscription boolean not null default false;
