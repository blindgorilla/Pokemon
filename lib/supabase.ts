import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client.
 *
 * This module uses the service_role key, which bypasses Row Level Security, so
 * it must NEVER be imported from a client component — API routes and other
 * server code only. Neither variable is prefixed `NEXT_PUBLIC_`, so Next will
 * not inline them into the browser bundle; the guard below turns an accidental
 * client import into an immediate, obvious failure rather than a silent one.
 *
 * Both variables are read from the environment (set in Vercel); see
 * `.env.example`. The client is created lazily so a missing variable surfaces
 * at request time as a handled error instead of crashing the build.
 */

let client: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (typeof window !== "undefined") {
    throw new Error("lib/supabase.ts is server-only and must not run in the browser.");
  }

  if (client) return client;

  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Supabase is not configured: set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    );
  }

  client = createClient(url, serviceRoleKey, {
    auth: {
      // No user sessions on the server — never persist or refresh tokens.
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  return client;
}
