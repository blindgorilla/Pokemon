"use client";

import { useCallback, useId, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { track } from "@/lib/analytics";
import { isValidEmail, MAX_EMAIL_LENGTH } from "@/lib/validation";
import { form as formCopy } from "@/lib/content";

type Status = "idle" | "loading" | "success" | "error";

type EarlyAccessFormProps = {
  /** Analytics label for where the signup happened (e.g. "hero", "final_cta"). */
  source: string;
  submitLabel: string;
  autoFocus?: boolean;
  className?: string;
};

/** Ignore repeat submits fired within this window (double-tap / double-click). */
const SUBMIT_COOLDOWN_MS = 800;

export default function EarlyAccessForm({
  source,
  submitLabel,
  autoFocus = false,
  className = "",
}: EarlyAccessFormProps) {
  const inputId = useId();
  const statusId = useId();

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

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

    try {
      const response = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source }),
      });

      const data: { ok?: boolean; error?: string } = await response
        .json()
        .catch(() => ({}));

      if (!response.ok || !data.ok) {
        setStatus("error");
        setMessage(
          response.status === 400 ? formCopy.invalidMessage : formCopy.errorMessage,
        );
        track("early_access_error", { source, status: response.status });
        return;
      }

      setStatus("success");
      setMessage(formCopy.successMessage);
      track("early_access_signup", { source });
    } catch {
      setStatus("error");
      setMessage(formCopy.errorMessage);
      track("early_access_error", { source, status: "network" });
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
        <p
          role="status"
          className="panel flex items-start gap-3 px-5 py-4 text-[0.9375rem] leading-relaxed text-bone-50"
        >
          <span
            aria-hidden="true"
            className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-accent text-[0.7rem] font-bold text-ink-950"
          >
            ✓
          </span>
          {formCopy.successMessage}
        </p>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
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
          className={`mt-3 min-h-[1.25rem] text-sm ${
            isError ? "text-pass" : "text-mute-400"
          }`}
        >
          {message}
        </p>
      </form>

      <p className="mt-0.5 text-sm text-mute-500">
        We only use your email for launch updates.{" "}
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
