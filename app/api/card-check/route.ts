import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { isNonEmptyString } from "@/lib/validation";

/**
 * Step 1 of the "Ask before you buy" hero funnel: inserts a new card_checks
 * row from just the card name, with status = 'started'. The row id comes
 * back so the client can carry it into the step-2 submit endpoint
 * (app/api/card-check/submit/route.ts), which updates this exact row rather
 * than creating a second one.
 */

type StartPayload = {
  cardName?: unknown;
};

export async function POST(request: Request) {
  let payload: StartPayload;

  try {
    payload = (await request.json()) as StartPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  if (!isNonEmptyString(payload.cardName)) {
    return NextResponse.json({ ok: false, error: "invalid_card_name" }, { status: 400 });
  }

  const cardName = payload.cardName.trim();

  try {
    const { data, error } = await getSupabaseAdmin()
      .from("card_checks")
      .insert({ card_name: cardName, status: "started" })
      .select("id")
      .single();

    if (error || !data) {
      // eslint-disable-next-line no-console
      console.error("[card-check] supabase insert failed", error?.message);
      return NextResponse.json({ ok: false, error: "storage_error" }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id: data.id as string });
  } catch (cause) {
    // eslint-disable-next-line no-console
    console.error("[card-check] supabase unavailable", cause);
    return NextResponse.json({ ok: false, error: "storage_error" }, { status: 500 });
  }
}
