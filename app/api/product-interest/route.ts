import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

/**
 * Records how a visitor answered the question about the future paid BUY OR PASS
 * Method. It is interest validation only — no payment is taken or authorised
 * anywhere in this flow.
 *
 * The answer updates the exact row app/api/early-access/route.ts created or
 * reused moments earlier, addressed by the id that endpoint returned — not by
 * looking the email back up. That means this request never needs to carry an
 * email at all: it updates one specific row by primary key and can never
 * insert a second one for the same person.
 *
 * The endpoint answers `{ ok: true }` whether or not a row matched. That is
 * deliberate: replying differently for a known id would turn this into an
 * oracle for probing which ids are real. The client never needs to know
 * either way — the analytics event has already fired by this point, and the
 * acknowledgement shown to the visitor does not depend on the response.
 */

type InterestPayload = {
  id?: unknown;
  interest?: unknown;
};

const INTEREST_VALUES = ["yes", "maybe", "no"] as const;

type Interest = (typeof INTEREST_VALUES)[number];

function isInterest(value: unknown): value is Interest {
  return (
    typeof value === "string" && INTEREST_VALUES.includes(value as Interest)
  );
}

// Standard UUID shape — matches what Postgres's gen_random_uuid() produces.
const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function isSignupId(value: unknown): value is string {
  return typeof value === "string" && UUID_PATTERN.test(value);
}

export async function POST(request: Request) {
  let payload: InterestPayload;

  try {
    payload = (await request.json()) as InterestPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  if (!isSignupId(payload.id) || !isInterest(payload.interest)) {
    return NextResponse.json({ ok: false, error: "invalid_payload" }, { status: 400 });
  }

  const { id, interest } = payload;

  try {
    const { error } = await getSupabaseAdmin()
      .from("early_access_signups")
      .update({
        product_interest: interest,
        interest_updated_at: new Date().toISOString(),
      })
      .eq("id", id);

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
