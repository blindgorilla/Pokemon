# CLAUDE.md

Guidance for Claude Code (and anyone else) working in this repository.

## Branching rules

- `main` is the **default branch**, and every pull request targets it.
- **Claude Code must never push or merge directly to `main`.** All work happens
  on a feature branch (e.g. `build/landing-page`), which is pushed and reviewed
  via a Vercel preview before a human merges it.
- Push only the branch you are working on. Never force-push shared branches.

## Stack

- **Next.js (App Router)** + **TypeScript** + **Tailwind CSS**
- Deployed on **Vercel** — every branch push generates a preview deployment.
- Dependencies are kept deliberately minimal: no UI kit, no CMS, no payment
  libraries. Prefer adding a component over adding a package.

## Project layout

```
app/            App Router routes, layout, metadata, API routes
  api/early-access/route.ts   Email signup endpoint (validate → provider hook)
  privacy/                    Privacy policy page
components/     One component per concern, all presentational unless marked
lib/
  analytics.ts  Single track(event, props) helper
  content.ts    All page copy as typed data
  validation.ts Email validation shared by client and server
```

## Conventions

- **Mobile-first.** Design and verify at ~390px before desktop. No horizontal
  overflow; tap targets at least 44px tall.
- **Dark UI, one accent.** Tokens live in `app/globals.css`; the amber accent is
  reserved for CTAs and interactive states. Decision colours (buy / negotiate /
  wait / pass) are semantic and used only in those components.
- **Motion is subtle** and always behind `prefers-reduced-motion`.
- **Copy lives in `lib/content.ts`**, not inline in components.
- **No secrets in code.** Read everything from `process.env` and document new
  variables in `.env.example`.

## Product guardrails (do not violate in copy or UI)

- This is a decision-making methodology, **not** a prediction system. Never
  imply guaranteed profit, guaranteed returns, guaranteed appreciation, a
  guaranteed PSA grade, "beating the market", or any expected % return.
- No payment or checkout functionality — the site is pre-launch email capture.
- No official Pokémon logos, characters or copyrighted card artwork. Visuals are
  original: slab silhouettes, data-dashboard motifs, restrained foil texture.
- The whole page has one primary action: **join the early-access list.**

## Checks before pushing

```bash
npm run typecheck
npm run build
```
