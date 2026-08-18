import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { isValidEmail, normalizeEmail } from "@/lib/validation";

/**
 * Early-access signup endpoint.
 *
 * It validates the payload and upserts the address into Supabase
 * (`early_access_signups`), keyed on the table's unique `email` constraint —
 * one visitor always maps to exactly one row, whether this is their first
 * signup or a repeat. The row's id is returned to the client and carried
 * into the product-interest step, so that step updates this same row instead
 * of matching by email or creating a second one.
 *
 * The commented block further down is the single integration point for a
 * real email / CRM provider (ConvertKit, Beehiiv, Mailchimp, Loops, Resend
 * Audiences, …) — still inactive, and if it is ever wired up it must not be
 * able to fail the signup: storage happens first and independently of any
 * email delivery.
 *
 * Credentials are read from the environment only — never hard-code a key.
 * See `.env.example` for the expected variables.
 */

type SignupPayload = {
  email?: unknown;
  source?: unknown;
};

export async function POST(request: Request) {
  let payload: SignupPayload;

  try {
    payload = (await request.json()) as SignupPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 },
    );
  }

  if (!isValidEmail(payload.email)) {
    return NextResponse.json(
      { ok: false, error: "invalid_email" },
      { status: 400 },
    );
  }

  const email = normalizeEmail(payload.email);
  const source = typeof payload.source === "string" ? payload.source : "unknown";

  // --- Storage: always first, and the only thing that can fail the signup ---
  // Upsert on the unique `email` constraint: a repeat signup updates the
  // existing row (and its `source`) rather than erroring or creating a
  // second one. Either way the row's id comes back so the client can carry
  // it into the product-interest step.
  let id: string;
  try {
    const { data, error } = await getSupabaseAdmin()
      .from("early_access_signups")
      .upsert({ email, source }, { onConflict: "email" })
      .select("id")
      .single();

    if (error || !data) {
      // eslint-disable-next-line no-console
      console.error("[early-access] supabase upsert failed", error?.message);
      return NextResponse.json(
        { ok: false, error: "storage_error" },
        { status: 500 },
      );
    }

    id = data.id as string;
  } catch (cause) {
    // Missing configuration or a transport failure — same generic response.
    // eslint-disable-next-line no-console
    console.error("[early-access] supabase unavailable", cause);
    return NextResponse.json(
      { ok: false, error: "storage_error" },
      { status: 500 },
    );
  }

  const apiKey = process.env.EMAIL_PROVIDER_API_KEY;
  const listId = process.env.EMAIL_PROVIDER_LIST_ID;

  if (apiKey && listId) {
    // --- INTEGRATION POINT ------------------------------------------------
    // Replace the block below with a real provider call, e.g.:
    //
    // const response = await fetch(`${process.env.EMAIL_PROVIDER_ENDPOINT}`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${apiKey}`,
    //   },
    //   body: JSON.stringify({ email, list_id: listId, source }),
    // });
    // if (!response.ok) {
    //   return NextResponse.json({ ok: false, error: "provider_error" }, { status: 502 });
    // }
    // ----------------------------------------------------------------------
  } else if (process.env.NODE_ENV !== "production") {
    // Dev visibility while no provider is configured. Never logged in prod so
    // that submitted addresses do not end up in production log storage.
    // eslint-disable-next-line no-console
    console.log(`[early-access] signup received (${source}): ${email}`);
  }

  return NextResponse.json({ ok: true, id });
}
