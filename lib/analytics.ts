import { track as vercelTrack } from "@vercel/analytics";

/**
 * Minimal, provider-agnostic analytics helper.
 *
 * Everything on the page funnels through `track()` so that swapping or adding a
 * provider stays a single-file change.
 *
 * The active provider is Vercel Web Analytics: `<Analytics />` is rendered in
 * `app/layout.tsx` and every event below is forwarded to Vercel's own `track()`
 * from `sendToProvider()`. To add another provider (Plausible, PostHog, GA4, …)
 * load its script in the layout and forward the event alongside the Vercel call.
 * Keep event names stable — `early_access_signup` is the conversion event.
 * No provider keys belong in this file; read them from `process.env.NEXT_PUBLIC_*`
 * at the call site of the provider snippet.
 */

export type AnalyticsEvent =
  | "page_view"
  | "cta_click"
  | "email_form_start"
  | "early_access_signup"
  | "early_access_error";

export type AnalyticsProps = Record<string, string | number | boolean | undefined>;

const isDev = process.env.NODE_ENV !== "production";

function sendToProvider(event: AnalyticsEvent, props: AnalyticsProps): void {
  if (typeof window === "undefined") return;

  // Vercel Analytics rejects `undefined` values, so drop empty props entirely.
  const properties: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(props)) {
    if (value !== undefined) properties[key] = value;
  }

  vercelTrack(event, properties);
}

/**
 * Track a single product event. Safe to call from anywhere (no-ops on the server).
 */
export function track(event: AnalyticsEvent, props: AnalyticsProps = {}): void {
  const payload: AnalyticsProps = {
    ...props,
    path: typeof window !== "undefined" ? window.location.pathname : undefined,
  };

  if (isDev) {
    // Dev-only visibility so events can be verified without a provider attached.
    // eslint-disable-next-line no-console
    console.log(`[analytics] ${event}`, payload);
  }

  sendToProvider(event, payload);
}
