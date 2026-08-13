import { NextResponse } from "next/server";
import { isValidEmail, normalizeEmail } from "@/lib/validation";

/**
 * Early-access signup endpoint.
 *
 * Today it validates the payload and returns success — no list storage yet.
 * The commented block below is the single integration point for a real email /
 * CRM provider (ConvertKit, Beehiiv, Mailchimp, Loops, Resend Audiences, …).
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

  return NextResponse.json({ ok: true });
}
