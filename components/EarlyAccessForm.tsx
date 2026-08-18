"use client";

import { useCallback, useId, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { track } from "@/lib/analytics";
import ProductInterest from "@/components/ProductInterest";
import { hasSheetPdf, sheetHref } from "@/lib/sheet";
import { isValidEmail, MAX_EMAIL_LENGTH } from "@/lib/validation";
import { form as formCopy, signupSuccess } from "@/lib/content";

type Status = "idle" | "loading" | "success" | "error";

type EarlyAccessFormProps = {
  /** Analytics label for where the signup happened (e.g. "hero", "final_cta"). */
  source: string;
  submitLabel: string;
  autoFocus?: boolean;
  className?: string;
  /**
   * Overrides the generated input id so a nav CTA can link straight to the
   * field — the browser then scrolls to it and moves focus into it.
   */
  fieldId?: string;
  /** Line shown under the form, before the privacy link. */
  note?: string;
};

/** Ignore repeat submits fired within this window (double-tap / double-click). */
const SUBMIT_COOLDOWN_MS = 800;

export default function EarlyAccessForm({
  source,
  submitLabel,
  autoFocus = false,
  className = "",
  fieldId,
  note = "We only use your email for launch updates.",
}: EarlyAccessFormProps) {
  const generatedId = useId();
  const inputId = fieldId ?? generatedId;
  const statusId = useId();

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  /**
   * The row id the early-access endpoint returned. Held so the interest
   * answer updates that exact row by primary key — never a fresh insert,
   * never a lookup by email.
   */
  const [signedUpId, setSignedUpId] = useState("");

  // Refs (not state) so the guards apply immediately, before React re-renders.
  const inFlightRef = useRef(false);
  const lastSubmitRef = useRef(0);
  const startedRef = useRef(false);

  const handleChange = useCallback(
    (value: string) => {
      setEmail(value);
      if (status === "error") {
        setStatus("idle");
        setMessage("");
      }
      // Fire once, on the first keystroke of the session.
      if (!startedRef.current && value.length > 0) {
        startedRef.current = true;
        track("email_form_start", { source });
      }
    },
    [source, status],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const now = Date.now();
    if (inFlightRef.current || now - lastSubmitRef.current < SUBMIT_COOLDOWN_MS) {
      return;
    }
    if (status === "success") return;

    if (!isValidEmail(email)) {
      setStatus("error");
      setMessage(formCopy.invalidMessage);
      return;
    }

    inFlightRef.current = true;
    lastSubmitRef.current = now;
    setStatus("loading");
    setMessage("");

    const trimmed = email.trim();

    try {
      const response = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, source }),
      });

      const data: { ok?: boolean; error?: string; id?: string } = await response
        .json()
        .catch(() => ({}));

      if (!response.ok || !data.ok) {
        setStatus("error");
        setMessage(
          response.status === 400 ? formCopy.invalidMessage : formCopy.errorMessage,
        );
        track("free_sheet_error", { source, status: response.status });
        return;
      }

      setStatus("success");
      setMessage(formCopy.successMessage);
      setSignedUpId(data.id ?? "");
      track("free_sheet_signup", { source });
    } catch {
      setStatus("error");
      setMessage(formCopy.errorMessage);
      track("free_sheet_error", { source, status: "network" });
    } finally {
      inFlightRef.current = false;
    }
  }

  const isLoading = status === "loading";
  const isSuccess = status === "success";
  const isError = status === "error";

  if (isSuccess) {
    return (
      <div className={`w-full ${className}`}>
        {/*
          Stage A — the reward, on its own. Calm and uncluttered: a status
          line, a headline, one line of use-guidance, one highly visible
          button. Nothing about the paid Method appears here.
        */}
        <div className="panel w-full p-6 text-center sm:p-8 sm:text-left">
          <p className="flex items-center justify-center gap-2.5 sm:justify-start">
            <span
              aria-hidden="true"
              className="inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-accent text-[0.7rem] font-bold text-ink-950"
            >
              ✓
            </span>
            <span className="eyebrow">{signupSuccess.eyebrow}</span>
          </p>

          <h3
            role="status"
            className="mt-3 text-2xl leading-snug font-semibold tracking-[-0.01em] text-bone-50 sm:text-3xl"
          >
            {signupSuccess.headline}
          </h3>

          <p className="mx-auto mt-2.5 max-w-md text-[0.9375rem] leading-relaxed text-bone-200 sm:mx-0 sm:max-w-none">
            {signupSuccess.body}
          </p>

          {hasSheetPdf ? (
            <a
              href={sheetHref}
              download
              className="mt-5 inline-flex h-[3.5rem] w-full items-center justify-center rounded-xl bg-accent px-7 text-base font-semibold text-ink-950 transition duration-200 ease-out hover:bg-accent-strong active:scale-[0.99] sm:w-auto"
            >
              {signupSuccess.downloadLabel}
            </a>
          ) : (
            <Link
              href={sheetHref}
              className="mt-5 inline-flex h-[3.5rem] w-full items-center justify-center rounded-xl bg-accent px-7 text-base font-semibold text-ink-950 transition duration-200 ease-out hover:bg-accent-strong active:scale-[0.99] sm:w-auto"
            >
              {signupSuccess.openLabel}
            </Link>
          )}
        </div>

        {/*
          Generous separation, then Stage B — a large, separate premium
          invitation, not a continuation of the reward panel above. It is
          never a condition of Stage A and is measured as its own event.
          Only rendered once a row id came back — without one, the interest
          endpoint would have nothing to update.
        */}
        {signedUpId && (
          <div className="mt-8 sm:mt-10">
            <ProductInterest id={signedUpId} source={source} />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`w-full max-w-xl ${className}`}>
      <form onSubmit={handleSubmit} noValidate className="w-full">
        <label htmlFor={inputId} className="sr-only">
          {formCopy.label}
        </label>

        <div className="flex w-full flex-col gap-3 sm:flex-row">
          <input
            id={inputId}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            autoFocus={autoFocus}
            maxLength={MAX_EMAIL_LENGTH}
            required
            value={email}
            disabled={isLoading}
            onChange={(event) => handleChange(event.target.value)}
            placeholder={formCopy.placeholder}
            aria-invalid={isError || undefined}
            aria-describedby={message ? statusId : undefined}
            className={`h-[3.25rem] w-full min-w-0 flex-1 rounded-xl border bg-ink-900/80 px-4 text-base text-bone-50 transition placeholder:text-mute-500 focus:outline-none focus-visible:border-accent focus-visible:outline-none disabled:opacity-60 ${
              isError ? "border-pass/70" : "border-white/10 hover:border-white/20"
            }`}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex h-[3.25rem] flex-none items-center justify-center gap-2 rounded-xl bg-accent px-6 text-[0.9375rem] font-semibold text-ink-950 transition duration-200 ease-out hover:bg-accent-strong active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 sm:px-7"
          >
            {isLoading ? (
              <>
                <span
                  aria-hidden="true"
                  className="h-4 w-4 animate-spin rounded-full border-2 border-ink-950/30 border-t-ink-950"
                />
                Joining…
              </>
            ) : (
              submitLabel
            )}
          </button>
        </div>

        {/* Live region: announces validation, network and success messaging. */}
        <p
          id={statusId}
          role="status"
          aria-live="polite"
          className={`mt-2 min-h-[1.25rem] text-sm ${
            isError ? "text-pass" : "text-mute-400"
          }`}
        >
          {message}
        </p>
      </form>

      <p className="mt-0.5 text-sm text-mute-500">
        {note}{" "}
        <Link
          href="/privacy"
          className="text-mute-400 underline underline-offset-4 transition hover:text-bone-50"
        >
          Privacy Policy
        </Link>
      </p>
    </div>
  );
}
