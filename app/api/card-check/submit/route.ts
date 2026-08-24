import { NextResponse } from "next/server";
import { sendCardCheckConfirmationEmail, sendCardCheckNotificationEmail } from "@/lib/email";
import { getSupabaseAdmin } from "@/lib/supabase";
import { isNonEmptyString, isValidEmail, normalizeEmail } from "@/lib/validation";

/**
 * Step 2 of the "Ask before you buy" hero funnel: updates the card_checks
 * row created in step 1 (app/api/card-check/route.ts) with the price and
 * email, marks it submitted, then attempts the Resend confirmation email.
 *
 * Storage happens first and independently of email delivery: the row must
 * be saved and this endpoint must answer success before the email is even
 * attempted, so a Resend failure never blocks the on-screen confirmation.
 */

type SubmitPayload = {
  id?: unknown;
  cardName?: unknown;
  price?: unknown;
  email?: unknown;
  wantsCourse?: unknown;
  wantsSubscription?: unknown;
};

// Standard UUID shape — matches what Postgres's gen_random_uuid() produces.
const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function isCheckId(value: unknown): value is string {
  return typeof value === "string" && UUID_PATTERN.test(value);
}

export async function POST(request: Request) {
  let payload: SubmitPayload;

  try {
    payload = (await request.json()) as SubmitPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  if (!isCheckId(payload.id)) {
    return NextResponse.json({ ok: false, error: "invalid_id" }, { status: 400 });
  }
  if (!isNonEmptyString(payload.price)) {
    return NextResponse.json({ ok: false, error: "invalid_price" }, { status: 400 });
  }
  if (!isValidEmail(payload.email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }
  if (!isNonEmptyString(payload.cardName)) {
    return NextResponse.json({ ok: false, error: "invalid_card_name" }, { status: 400 });
  }

  const id = payload.id;
  const price = payload.price.trim();
  const email = normalizeEmail(payload.email);
  const cardName = payload.cardName.trim();
  const wantsCourse = payload.wantsCourse === true;
  const wantsSubscription = payload.wantsSubscription === true;

  try {
    const { error } = await getSupabaseAdmin()
      .from("card_checks")
      .update({
        price,
        email,
        status: "submitted",
        submitted_at: new Date().toISOString(),
        wants_course: wantsCourse,
        wants_subscription: wantsSubscription,
      })
      .eq("id", id);

    if (error) {
      // eslint-disable-next-line no-console
      console.error("[card-check/submit] supabase update failed", error.message);
      return NextResponse.json({ ok: false, error: "storage_error" }, { status: 500 });
    }
  } catch (cause) {
    // eslint-disable-next-line no-console
    console.error("[card-check/submit] supabase unavailable", cause);
    return NextResponse.json({ ok: false, error: "storage_error" }, { status: 500 });
  }

  // Best-effort: the row is already saved, so a failure here must not
  // change the response the client sees.
  const emailResult = await sendCardCheckConfirmationEmail({
    cardName,
    email,
    wantsCourse,
    wantsSubscription,
  });
  if (!emailResult.ok) {
    // eslint-disable-next-line no-console
    console.error("[card-check/submit] resend send failed", emailResult.error);
  } else {
    const notificationResult = await sendCardCheckNotificationEmail({ cardName, price, email });
    if (!notificationResult.ok) {
      // eslint-disable-next-line no-console
      console.error("[card-check/submit] internal notification email failed", notificationResult.error);
    }
  }

  return NextResponse.json({ ok: true });
}
