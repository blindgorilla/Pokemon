import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { isValidEmail, normalizeEmail } from "@/lib/validation";

/**
 * Records how a visitor answered the question about the future paid BUY OR PASS
 * Method. It is interest validation only — no payment is taken or authorised
 * anywhere in this flow.
 *
 * The answer lands on the `early_access_signups` row created moments earlier by
 * app/api/early-access/route.ts, so a signup can be compared against the
 * interest it did (or did not) turn into.
 *
 * The endpoint answers `{ ok: true }` whether or not a row matched. That is
 * deliberate: replying differently for a known address would turn this into an
 * oracle for testing whether an email is on the list. The client never needs to
 * know either way — the analytics event has already fired by this point, and
 * the acknowledgement shown to the visitor does not depend on the response.
 */

type InterestPayload = {
  email?: unknown;
  interest?: unknown;
};

const INTEREST_VALUES = ["yes", "maybe", "no"] as const;

type Interest = (typeof INTEREST_VALUES)[number];

function isInterest(value: unknown): value is Interest {
  return (
    typeof value === "string" && INTEREST_VALUES.includes(value as Interest)
  );
}

export async function POST(request: Request) {
  let payload: InterestPayload;

  try {
    payload = (await request.json()) as InterestPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  if (!isValidEmail(payload.email) || !isInterest(payload.interest)) {
    return NextResponse.json({ ok: false, error: "invalid_payload" }, { status: 400 });
  }

  const email = normalizeEmail(payload.email);
  const interest = payload.interest;

  try {
    const { error } = await getSupabaseAdmin()
      .from("early_access_signups")
      .update({
        product_interest: interest,
        product_interest_at: new Date().toISOString(),
      })
      .eq("email", email);

    if (error) {
      // eslint-disable-next-line no-console
      console.error("[product-interest] supabase update failed", error.message);
      return NextResponse.json({ ok: false, error: "storage_error" }, { status: 500 });
    }
  } catch (cause) {
    // eslint-disable-next-line no-console
    console.error("[product-interest] supabase unavailable", cause);
    return NextResponse.json({ ok: false, error: "storage_error" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
