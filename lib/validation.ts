/**
 * Shared email validation, used by the client form and the API route so both
 * sides agree on what counts as a valid address.
 */

// Deliberately pragmatic: catches the realistic typos without rejecting valid
// but unusual addresses. Real deliverability is confirmed by the email provider.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;

export const MAX_EMAIL_LENGTH = 254;

export function isValidEmail(value: unknown): value is string {
  if (typeof value !== "string") return false;
  const email = value.trim();
  if (email.length === 0 || email.length > MAX_EMAIL_LENGTH) return false;
  return EMAIL_PATTERN.test(email);
}

export function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

/** True for any non-empty string once whitespace is trimmed. */
export function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}
