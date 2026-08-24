"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { track } from "@/lib/analytics";
import SheetExample from "@/components/SheetExample";
import { askForm } from "@/lib/content";
import { isValidEmail, MAX_EMAIL_LENGTH } from "@/lib/validation";

type Step = "cardName" | "details" | "confirmation";
type Status = "idle" | "loading" | "error";

type CardCheckFormProps = {
  /** Analytics label for where the form is rendered (e.g. "hero"). */
  source: string;
  /** Overrides the generated id on the card-name field so nav CTAs can focus it. */
  fieldId?: string;
};

/** Ignore repeat submits fired within this window (double-tap / double-click). */
const SUBMIT_COOLDOWN_MS = 800;

export default function CardCheckForm({ source, fieldId }: CardCheckFormProps) {
  const generatedId = useId();
  const cardNameId = fieldId ?? generatedId;
  const priceId = useId();
  const detailsId = useId();
  const emailId = useId();
  const statusId = useId();

  const [step, setStep] = useState<Step>("cardName");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const [cardName, setCardName] = useState("");
  const [checkId, setCheckId] = useState("");
  const [price, setPrice] = useState("");
  const [details, setDetails] = useState("");
  const [email, setEmail] = useState("");
  const [wantsCourse, setWantsCourse] = useState(false);
  const [wantsSubscription, setWantsSubscription] = useState(false);
  const courseOptInId = useId();
  const subscriptionOptInId = useId();

  const inFlightRef = useRef(false);
  const lastSubmitRef = useRef(0);

  /** Blocks only an actual in-flight or just-fired network submit — never a client-validation rejection. */
  function readyForNetworkSubmit(): boolean {
    const now = Date.now();
    if (inFlightRef.current || now - lastSubmitRef.current < SUBMIT_COOLDOWN_MS) {
      return false;
    }
    inFlightRef.current = true;
    lastSubmitRef.current = now;
    return true;
  }

  async function handleStartSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlightRef.current) return;

    const trimmedName = cardName.trim();
    if (!trimmedName) {
      setStatus("error");
      setMessage(askForm.step1.requiredError);
      return;
    }

    if (!readyForNetworkSubmit()) return;

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/card-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cardName: trimmedName }),
      });

      const data: { ok?: boolean; id?: string } = await response.json().catch(() => ({}));

      if (!response.ok || !data.ok || !data.id) {
        setStatus("error");
        setMessage(askForm.genericErrorMessage);
        track("card_check_error", { source, step: "start", status: response.status });
        return;
      }

      setCardName(trimmedName);
      setCheckId(data.id);
      setStatus("idle");
      setMessage("");
      setStep("details");
      track("card_check_started", { source });
    } catch {
      setStatus("error");
      setMessage(askForm.genericErrorMessage);
      track("card_check_error", { source, step: "start", status: "network" });
    } finally {
      inFlightRef.current = false;
    }
  }

  async function handleDetailsSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlightRef.current) return;

    const trimmedPrice = price.trim();
    const trimmedDetails = details.trim();
    const trimmedEmail = email.trim();

    if (!trimmedPrice) {
      setStatus("error");
      setMessage(askForm.step2.priceRequiredError);
      return;
    }
    if (!isValidEmail(trimmedEmail)) {
      setStatus("error");
      setMessage(askForm.step2.emailInvalidError);
      return;
    }

    if (!readyForNetworkSubmit()) return;

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/card-check/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: checkId,
          cardName,
          price: trimmedPrice,
          details: trimmedDetails || undefined,
          email: trimmedEmail,
          wantsCourse,
          wantsSubscription,
        }),
      });

      const data: { ok?: boolean } = await response.json().catch(() => ({}));

      if (!response.ok || !data.ok) {
        setStatus("error");
        setMessage(askForm.genericErrorMessage);
        track("card_check_error", { source, step: "submit", status: response.status });
        return;
      }

      setPrice(trimmedPrice);
      setDetails(trimmedDetails);
      setEmail(trimmedEmail);
      setStatus("idle");
      setMessage("");
      setStep("confirmation");
      track("card_check_submitted", { source });
    } catch {
      setStatus("error");
      setMessage(askForm.genericErrorMessage);
      track("card_check_error", { source, step: "submit", status: "network" });
    } finally {
      inFlightRef.current = false;
    }
  }

  const isLoading = status === "loading";
  const isError = status === "error";

  if (step === "confirmation") {
    return (
      <div className="w-full">
        <div className="panel w-full p-5 sm:p-8">
          <p className="flex items-start gap-2.5">
            <span
              aria-hidden="true"
              className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-accent text-[0.7rem] font-bold text-ink-950"
            >
              ✓
            </span>
            <span role="status" className="text-base leading-snug font-semibold tracking-[-0.01em] text-bone-50 sm:text-xl">
              {askForm.confirmation.headerTemplate(cardName)}
            </span>
          </p>
          {wantsCourse && (
            <p className="mt-3 pl-[1.9375rem] text-sm leading-relaxed text-mute-400">
              {askForm.confirmation.courseOptInConfirmation}
            </p>
          )}
          {wantsSubscription && (
            <p className="mt-3 pl-[1.9375rem] text-sm leading-relaxed text-mute-400">
              {askForm.confirmation.subscriptionOptInConfirmation}
            </p>
          )}
        </div>
        <SheetExample />
      </div>
    );
  }

  if (step === "details") {
    return (
      <div className="w-full max-w-xl">
        <p className="text-[1.0625rem] leading-relaxed font-medium text-bone-50">
          {askForm.step2.headerTemplate(cardName)}
        </p>

        <form onSubmit={handleDetailsSubmit} noValidate className="mt-4 w-full">
          <div className="flex w-full flex-col gap-3">
            <div>
              <label htmlFor={priceId} className="sr-only">
                {askForm.step2.priceLabel}
              </label>
              <input
                id={priceId}
                name="price"
                type="text"
                autoFocus
                required
                value={price}
                disabled={isLoading}
                onChange={(event) => {
                  setPrice(event.target.value);
                  if (isError) {
                    setStatus("idle");
                    setMessage("");
                  }
                }}
                placeholder={askForm.step2.pricePlaceholder}
                aria-describedby={message ? statusId : undefined}
                className="h-[3.25rem] w-full min-w-0 rounded-xl border border-white/10 bg-ink-900/80 px-4 text-base text-bone-50 transition placeholder:text-mute-500 hover:border-white/20 focus:outline-none focus-visible:border-accent focus-visible:outline-none disabled:opacity-60"
              />
            </div>

            <div>
              <label htmlFor={detailsId} className="sr-only">
                {askForm.step2.detailsLabel}
              </label>
              <input
                id={detailsId}
                name="details"
                type="text"
                maxLength={280}
                value={details}
                disabled={isLoading}
                onChange={(event) => setDetails(event.target.value)}
                placeholder={askForm.step2.detailsPlaceholder}
                className="h-[3.25rem] w-full min-w-0 rounded-xl border border-white/10 bg-ink-900/80 px-4 text-base text-bone-50 transition placeholder:text-mute-500 hover:border-white/20 focus:outline-none focus-visible:border-accent focus-visible:outline-none disabled:opacity-60"
              />
            </div>

            <div>
              <label htmlFor={emailId} className="sr-only">
                {askForm.step2.emailLabel}
              </label>
              <input
                id={emailId}
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                maxLength={MAX_EMAIL_LENGTH}
                required
                value={email}
                disabled={isLoading}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (isError) {
                    setStatus("idle");
                    setMessage("");
                  }
                }}
                placeholder={askForm.step2.emailPlaceholder}
                aria-describedby={message ? statusId : undefined}
                className="h-[3.25rem] w-full min-w-0 rounded-xl border border-white/10 bg-ink-900/80 px-4 text-base text-bone-50 transition placeholder:text-mute-500 hover:border-white/20 focus:outline-none focus-visible:border-accent focus-visible:outline-none disabled:opacity-60"
              />
            </div>

            <label
              htmlFor={courseOptInId}
              className="flex cursor-pointer items-start gap-2.5 py-1 text-sm leading-relaxed text-mute-400"
            >
              <input
                id={courseOptInId}
                name="wantsCourse"
                type="checkbox"
                checked={wantsCourse}
                disabled={isLoading}
                onChange={(event) => setWantsCourse(event.target.checked)}
                className="mt-0.5 h-[1.125rem] w-[1.125rem] flex-none rounded border-white/20 bg-ink-900/80 text-accent accent-accent focus-visible:outline-none disabled:opacity-60"
              />
              <span>{askForm.step2.courseOptInLabel}</span>
            </label>

            <label
              htmlFor={subscriptionOptInId}
              className="flex cursor-pointer items-start gap-2.5 py-1 text-sm leading-relaxed text-mute-400"
            >
              <input
                id={subscriptionOptInId}
                name="wantsSubscription"
                type="checkbox"
                checked={wantsSubscription}
                disabled={isLoading}
                onChange={(event) => setWantsSubscription(event.target.checked)}
                className="mt-0.5 h-[1.125rem] w-[1.125rem] flex-none rounded border-white/20 bg-ink-900/80 text-accent accent-accent focus-visible:outline-none disabled:opacity-60"
              />
              <span>{askForm.step2.subscriptionOptInLabel}</span>
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex h-[3.25rem] w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 text-[0.9375rem] font-semibold text-ink-950 transition duration-200 ease-out hover:bg-accent-strong active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <span
                    aria-hidden="true"
                    className="h-4 w-4 animate-spin rounded-full border-2 border-ink-950/30 border-t-ink-950"
                  />
                  Sending…
                </>
              ) : (
                askForm.step2.submitLabel
              )}
            </button>
          </div>

          <p
            id={statusId}
            role="status"
            aria-live="polite"
            className={`mt-2 min-h-[1.25rem] text-sm ${isError ? "text-pass" : "text-mute-400"}`}
          >
            {message}
          </p>
        </form>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl">
      <form onSubmit={handleStartSubmit} noValidate className="w-full">
        <label htmlFor={cardNameId} className="sr-only">
          {askForm.step1.label}
        </label>

        <div className="flex w-full flex-col gap-3 sm:flex-row">
          <input
            id={cardNameId}
            name="cardName"
            type="text"
            autoComplete="off"
            required
            value={cardName}
            disabled={isLoading}
            onChange={(event) => {
              setCardName(event.target.value);
              if (isError) {
                setStatus("idle");
                setMessage("");
              }
            }}
            placeholder={askForm.step1.placeholder}
            aria-invalid={isError || undefined}
            aria-describedby={message ? statusId : undefined}
            className={`h-[3.25rem] w-full min-w-0 flex-1 rounded-xl border bg-ink-900/80 px-4 text-base text-bone-50 transition placeholder:text-mute-500 focus:outline-none focus-visible:border-accent focus-visible:outline-none disabled:opacity-60 ${
              isError ? "border-pass/70" : "border-white/10 hover:border-white/20"
            }`}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex h-[3.25rem] w-full flex-none items-center justify-center gap-2 rounded-xl bg-accent px-7 text-[0.9375rem] font-semibold text-ink-950 transition duration-200 ease-out hover:bg-accent-strong active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
          >
            {isLoading ? (
              <>
                <span
                  aria-hidden="true"
                  className="h-4 w-4 animate-spin rounded-full border-2 border-ink-950/30 border-t-ink-950"
                />
                Sending…
              </>
            ) : (
              askForm.step1.submitLabel
            )}
          </button>
        </div>

        <p
          id={statusId}
          role="status"
          aria-live="polite"
          className={`mt-2 min-h-[1.25rem] text-sm ${isError ? "text-pass" : "text-mute-400"}`}
        >
          {message}
        </p>
      </form>
    </div>
  );
}
