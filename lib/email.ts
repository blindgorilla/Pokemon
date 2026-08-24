/**
 * Confirmation email for a submitted card check, sent via the Resend HTTP
 * API directly (no SDK dependency — consistent with this repo's minimal
 * dependency policy).
 *
 * Server-only. Callers are expected to treat a failed send as non-fatal: the
 * card_checks row must already be saved before this is called, and a send
 * failure here must never block or fail the on-screen confirmation.
 */

import { askForm, sheetExample } from "./content";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const FROM_ADDRESS = "ask@buyorpasscards.com";
const SUBJECT = "Your card check is in — here's what I check for every card";

// Brand colours, inlined (email clients don't reliably load external/embedded
// CSS) — matches app/globals.css's ink/accent/buy tokens.
const COLOR_INK = "#0b0d10";
const COLOR_ACCENT = "#f0b23e";
const COLOR_BUY = "#2f9e5b";

type SendCardCheckEmailInput = {
  cardName: string;
  email: string;
  wantsCourse: boolean;
  wantsSubscription: boolean;
};

type SendResult = { ok: true } | { ok: false; error: string };

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Branded HTML, built from the same worked-example data as the on-screen
 * confirmation (components/SheetExample.tsx via lib/content.ts's
 * `sheetExample`) so the two can't drift apart. Deliberately simpler than the
 * on-screen sheet — table-based layout, inline styles only, no images — since
 * email clients render CSS inconsistently.
 */
function buildEmailHtml(cardName: string, wantsCourse: boolean, wantsSubscription: boolean): string {
  const safeCardName = escapeHtml(cardName);

  const rows = sheetExample.checks
    .map((check) => {
      const [headline, ...rest] = (check.exampleFinding ?? "").split(" — ");
      const detail = rest.join(" — ");
      return `<tr>
        <td style="padding:0 0 10px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8f7f5;border-left:3px solid ${COLOR_BUY};border-radius:6px;">
            <tr>
              <td style="padding:12px 14px;">
                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    <td valign="top" style="padding-right:10px;">
                      <span style="display:inline-block;width:20px;height:20px;line-height:20px;text-align:center;border-radius:50%;background:${COLOR_BUY};color:#ffffff;font-size:12px;font-weight:700;">&#10003;</span>
                    </td>
                    <td>
                      <div style="font-weight:700;font-size:12px;letter-spacing:0.06em;color:#0b0d10;text-transform:uppercase;">
                        ${check.number} &middot; ${escapeHtml(check.title)}
                      </div>
                      <div style="font-size:14px;line-height:1.5;color:#333333;margin-top:4px;">
                        <strong>${escapeHtml(headline)}</strong>${detail ? ` — ${escapeHtml(detail)}` : ""}
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>`;
    })
    .join("");

  const courseLine = wantsCourse
    ? `<p style="margin:0 0 16px;">${escapeHtml(askForm.confirmation.courseOptInConfirmation)}</p>`
    : "";

  const subscriptionLine = wantsSubscription
    ? `<p style="margin:0 0 16px;">${escapeHtml(askForm.confirmation.subscriptionOptInConfirmation)}</p>`
    : "";

  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f4f4f4;font-family:Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:24px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:10px;overflow:hidden;">
            <tr>
              <td style="background:${COLOR_INK};padding:22px 32px;">
                <div style="font-family:Helvetica,Arial,sans-serif;font-size:18px;font-weight:800;letter-spacing:0.08em;color:${COLOR_ACCENT};">
                  BUY OR PASS
                </div>
                <div style="font-family:Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:0.06em;color:#9aa1ad;margin-top:2px;text-transform:uppercase;">
                  The Pok&eacute;mon Card Decision System
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 32px 8px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="font-size:15px;line-height:1.5;color:#111111;">
                      <p style="margin:0 0 16px;">Hey,</p>
                      <p style="margin:0 0 16px;">
                        <strong>${safeCardName}</strong> is in the queue. I check every submission
                        personally and I'll reply with your answer within 24–48 hours.
                      </p>
                      ${courseLine}
                      ${subscriptionLine}
                      <p style="margin:0 0 4px;font-weight:700;">While you wait, here's what I check for every card:</p>
                      <p style="margin:0 0 18px;font-size:13px;color:#666666;">${escapeHtml(sheetExample.sampleCardLabel)}</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${rows}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 32px 32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fdf6e8;border:1px solid #f0dfb2;border-radius:8px;">
                  <tr>
                    <td style="padding:16px 18px;font-size:14px;line-height:1.5;color:#5a4a1f;">
                      Got another card you want checked too? Just reply directly to this email
                      with the name and price — I'll take a look.
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function sendCardCheckConfirmationEmail({
  cardName,
  email,
  wantsCourse,
  wantsSubscription,
}: SendCardCheckEmailInput): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const replyTo = process.env.REPLY_TO_EMAIL;

  if (!apiKey) {
    return { ok: false, error: "missing_resend_api_key" };
  }

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: [email],
        reply_to: replyTo || undefined,
        subject: SUBJECT,
        html: buildEmailHtml(cardName, wantsCourse, wantsSubscription),
      }),
    });

    if (!response.ok) {
      const body = await response.text().catch(() => "");
      return { ok: false, error: `resend_${response.status}: ${body.slice(0, 300)}` };
    }

    return { ok: true };
  } catch (cause) {
    return { ok: false, error: cause instanceof Error ? cause.message : "network_error" };
  }
}

type SendCardCheckNotificationInput = {
  cardName: string;
  price: string;
  /** Optional card #/set/condition the customer volunteered on step 2. */
  details: string | null;
  email: string;
};

/**
 * Internal alert sent to Samu (REPLY_TO_EMAIL) whenever a card check is
 * submitted, with Reply-To set to the customer's email so replying from his
 * own inbox routes straight back to them. Best-effort, same as the customer
 * confirmation email — a failure here must never affect the response the
 * client sees.
 */
export async function sendCardCheckNotificationEmail({
  cardName,
  price,
  details,
  email,
}: SendCardCheckNotificationInput): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const notifyTo = process.env.REPLY_TO_EMAIL;

  if (!apiKey) {
    return { ok: false, error: "missing_resend_api_key" };
  }
  if (!notifyTo) {
    return { ok: false, error: "missing_reply_to_email" };
  }

  const text = [
    `Card: ${cardName}`,
    `Price entered: ${price}`,
    ...(details ? [`Card #/condition: ${details}`] : []),
    `Customer email: ${email}`,
    "",
    "Reply directly to this email to answer them.",
  ].join("\n");

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: [notifyTo],
        reply_to: email,
        subject: `New card check: ${cardName}`,
        text,
      }),
    });

    if (!response.ok) {
      const body = await response.text().catch(() => "");
      return { ok: false, error: `resend_${response.status}: ${body.slice(0, 300)}` };
    }

    return { ok: true };
  } catch (cause) {
    return { ok: false, error: cause instanceof Error ? cause.message : "network_error" };
  }
}
