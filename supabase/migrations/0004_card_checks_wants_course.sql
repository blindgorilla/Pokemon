-- Adds the course-interest opt-in captured on step 2 of the "Ask before you
-- buy" hero funnel (components/CardCheckForm.tsx). Unchecked by default —
-- a genuine low-pressure opt-in, never implied or pre-selected.

alter table public.card_checks
  add column if not exists wants_course boolean not null default false;
