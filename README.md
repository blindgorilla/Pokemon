# BUY OR PASS

Market-validation landing page for **BUY OR PASS — The Pokémon Card Decision
System**. Single page, single conversion goal: join the early-access list.

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS · deployed on Vercel.

## Getting started

```bash
npm install
cp .env.example .env.local   # optional — the form works without a provider
npm run dev                  # http://localhost:3000
```

## Scripts

| Command             | What it does                       |
| ------------------- | ---------------------------------- |
| `npm run dev`       | Local dev server                   |
| `npm run build`     | Production build                   |
| `npm run start`     | Serve the production build         |
| `npm run typecheck` | TypeScript, no emit                |

## Email capture

The form posts to `app/api/early-access/route.ts`, which validates the payload
and returns success. To connect a real provider, set `EMAIL_PROVIDER_API_KEY`
and `EMAIL_PROVIDER_LIST_ID` (see `.env.example`) and fill in the clearly marked
integration point in that route. No payment functionality exists on this site.

## Analytics

`lib/analytics.ts` exposes a single `track(event, props)` function that logs in
development and has one marked spot to forward events to a real provider.
Tracked events: `page_view`, `cta_click`, `email_form_start`,
`early_access_signup`, `early_access_error`.

## Contributing

See [CLAUDE.md](./CLAUDE.md) — `main` is the default branch, and nothing is
pushed or merged to it directly.
