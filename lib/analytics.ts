/**
 * Minimal, provider-agnostic analytics helper.
 *
 * Everything on the page funnels through `track()` so that wiring a real
 * provider later is a single-file change.
 *
 * INTEGRATION POINT
 * -----------------
 * To connect a real provider (Plausible, PostHog, GA4, Segment, …):
 *   1. Load the provider script in `app/layout.tsx` (or via a <Script> tag).
 *   2. Forward the event inside `sendToProvider()` below.
 *   3. Keep event names stable — `early_access_signup` is the conversion event.
 * No provider keys belong in this file; read them from `process.env.NEXT_PUBLIC_*`
 * at the call site of the provider snippet.
 */

export type AnalyticsEvent =
  | "page_view"
  | "cta_click"
  | "email_form_start"
  | "early_access_signup"
  | "early_access_error"
  | "checklist_open";

export type AnalyticsProps = Record<string, string | number | boolean | undefined>;

const isDev = process.env.NODE_ENV !== "production";

function sendToProvider(event: AnalyticsEvent, props: AnalyticsProps): void {
  if (typeof window === "undefined") return;

  // --- INTEGRATION POINT: replace the no-op below with a real provider call ---
  // Examples:
  //   window.plausible?.(event, { props });
  //   window.posthog?.capture(event, props);
  //   window.gtag?.("event", event, props);
  void event;
  void props;
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
