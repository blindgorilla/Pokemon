/**
 * Confirmation email for a submitted card check, sent via the Resend HTTP
 * API directly (no SDK dependency — consistent with this repo's minimal
 * dependency policy).
 *
 * Server-only. Callers are expected to treat a failed send as non-fatal: the
 * card_checks row must already be saved before this is called, and a send
 * failure here must never block or fail the on-screen confirmation.
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const FROM_ADDRESS = "ask@buyorpasscards.com";
const SUBJECT = "Your card check is in — here's what I check for every card";

type SendCardCheckEmailInput = {
  cardName: string;
  email: string;
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
 * Plain, clean HTML — deliberately simpler than the on-screen sheet, since
 * email clients render CSS inconsistently. Same 8-question content as
 * components/SheetExample.tsx, in a checklist-style layout instead of the
 * full card treatment.
 */
function buildEmailHtml(cardName: string): string {
  const safeCardName = escapeHtml(cardName);

  const checks: Array<{ title: string; finding?: string }> = [
    { title: "01 · PRICE", finding: "Recent sales cluster near €1,650 — the €2,100 asking price runs hot." },
    { title: "02 · LIQUIDITY", finding: "Sells multiple times a month — easy to exit later." },
    { title: "03 · TREND", finding: "Up steadily over 18 months, not a recent spike." },
    { title: "04 · SCARCITY", finding: "PSA population is low relative to raw supply still in circulation." },
    { title: "05 · DEMAND", finding: "Consistently one of the most-searched cards in the set." },
    { title: "06 · DESIRABILITY" },
    { title: "07 · GRADE" },
    { title: "08 · RISK & REWARD" },
  ];

  const rows = checks
    .map(({ title, finding }) => {
      const detail = finding
        ? escapeHtml(finding)
        : "Checked personally for every card.";
      return `<tr>
        <td style="padding:8px 0;border-bottom:1px solid #e5e5e5;">
          <div style="font-weight:600;font-size:13px;letter-spacing:0.04em;color:#111;">${title}</div>
          <div style="font-size:14px;color:#444;margin-top:2px;">${detail}</div>
        </td>
      </tr>`;
    })
    .join("");

  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f4f4f4;font-family:Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:24px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#ffffff;border-radius:8px;padding:32px;">
            <tr>
              <td style="font-size:15px;line-height:1.5;color:#111;">
                <p style="margin:0 0 16px;">Hey,</p>
                <p style="margin:0 0 16px;">
                  <strong>${safeCardName}</strong> is in the queue. I check every submission
                  personally and I'll reply with your answer within 24–48 hours.
                </p>
                <p style="margin:0 0 8px;font-weight:600;">While you wait, here's what I check for every card:</p>
              </td>
            </tr>
            <tr>
              <td>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${rows}
                </table>
              </td>
            </tr>
            <tr>
              <td style="font-size:15px;line-height:1.5;color:#111;padding-top:20px;">
                <p style="margin:0;">
                  Have another card you want checked too? Just reply directly to this email
                  with the name and price — I'll take a look.
                </p>
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
        html: buildEmailHtml(cardName),
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
