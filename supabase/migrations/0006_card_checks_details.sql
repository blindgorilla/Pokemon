-- Adds an optional free-text "details" field captured on step 2 of the
-- "Ask before you buy" hero funnel (components/CardCheckForm.tsx), for
-- whoever already knows their card number, set, or condition/grade.
-- Left blank by everyone else — never required, no extra friction on submit.

alter table public.card_checks
  add column if not exists details text;
