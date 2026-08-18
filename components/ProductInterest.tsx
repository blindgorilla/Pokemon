"use client";

import { useCallback, useState } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";
import {
  productInterest as copy,
  type ProductInterestValue,
} from "@/lib/content";

/**
 * Stage B of the post-signup experience: a large, separate product
 * invitation for the paid BUY OR PASS Method — not a survey. One dominant
 * CTA, two quiet alternatives. All three answers fire distinct events so
 * interest in the paid Method can be measured against `free_sheet_signup`
 * rather than folded into it. No payment happens here.
 */

type ProductInterestProps = {
  /** The address that just signed up, so the answer can be stored beside it. */
  email: string;
  /** Where the signup happened ("hero", "final_cta") — carried into analytics. */
  source: string;
};

const EVENTS: Record<ProductInterestValue, AnalyticsEvent> = {
  yes: "paid_product_interest_yes",
  maybe: "paid_product_interest_maybe",
  no: "paid_product_interest_no",
};

export default function ProductInterest({ email, source }: ProductInterestProps) {
  const [answer, setAnswer] = useState<ProductInterestValue | null>(null);

  const choose = useCallback(
    (value: ProductInterestValue) => {
      if (answer) return;
      setAnswer(value);

      // Analytics first: the measurement must not depend on storage succeeding.
      track(EVENTS[value], { source });

      // Best-effort persistence. The acknowledgement is already on screen, and
      // a failure here must never look like the answer was rejected.
      void fetch("/api/product-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, interest: value }),
      }).catch(() => {});
    },
    [answer, email, source],
  );

  return (
    <div className="panel relative overflow-hidden border-accent/[0.16] p-6 sm:p-10 lg:p-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(240,178,62,0.10),transparent_75%)]"
      />

      <div className="relative mx-auto max-w-2xl text-center lg:max-w-3xl">
        <p className="eyebrow">{copy.eyebrow}</p>

        <h3 className="mt-3 text-2xl leading-[1.15] font-semibold tracking-[-0.02em] text-balance text-bone-50 sm:text-[2rem] lg:text-4xl">
          {copy.headline}
        </h3>

        {/* WHAT the free sheet gives vs HOW the Method decides — the one
            distinction that has to land here. */}
        <div className="mx-auto mt-5 max-w-xl space-y-1.5 text-[0.9375rem] leading-relaxed text-bone-200 sm:text-base">
          <p>
            {copy.whatVsHow.what.prefix}
            <strong className="font-semibold text-accent">
              {copy.whatVsHow.what.emphasis}
            </strong>
            {copy.whatVsHow.what.suffix}
          </p>
          <p>
            {copy.whatVsHow.how.prefix}
            <strong className="font-semibold text-accent">
              {copy.whatVsHow.how.emphasis}
            </strong>
            {copy.whatVsHow.how.suffix}
          </p>
        </div>

        {/* Three scannable outcomes, not paragraphs. */}
        <dl className="mt-8 grid gap-5 text-left sm:mt-10 sm:grid-cols-3 sm:gap-6">
          {copy.benefits.map((benefit) => (
            <div key={benefit.title} className="hairline rounded-xl bg-white/[0.03] p-4">
              <dt className="text-[0.8125rem] font-semibold tracking-[0.01em] text-bone-50">
                {benefit.title}
              </dt>
              <dd className="mt-1.5 text-[0.8125rem] leading-relaxed text-mute-400">
                {benefit.body}
              </dd>
            </div>
          ))}
        </dl>

        {/* Credibility, immediately qualified — never a promise of return. */}
        <p className="mx-auto mt-8 max-w-xl text-[0.875rem] leading-relaxed text-mute-400 sm:mt-10">
          {copy.proof}
        </p>
        <p className="mt-1.5 text-xs text-mute-500">{copy.proofDisclaimer}</p>

        <div className="hairline mt-6 inline-flex items-center gap-3 rounded-full bg-white/[0.03] px-4 py-2">
          <span className="text-[0.6875rem] tracking-[0.14em] text-mute-400 uppercase">
            {copy.priceLabel}
          </span>
          <span className="text-base font-semibold text-accent">{copy.priceValue}</span>
        </div>

        {answer ? (
          <p role="status" className="mx-auto mt-7 max-w-md text-[0.9375rem] leading-relaxed text-bone-50">
            {copy.acknowledgements[answer]}
          </p>
        ) : (
          <div className="mx-auto mt-7 flex max-w-sm flex-col items-center gap-3">
            <button
              type="button"
              onClick={() => choose("yes")}
              className="inline-flex min-h-[3.5rem] w-full items-center justify-center rounded-xl bg-accent px-6 py-3 text-center text-[0.9375rem] font-bold tracking-[0.02em] text-ink-950 uppercase transition duration-200 ease-out hover:bg-accent-strong active:scale-[0.99]"
            >
              {copy.primaryCta}
            </button>

            {/* Deliberately quiet — text-weight, not button-weight, so the
                dominant CTA above is the only thing that reads as an action. */}
            <div className="flex items-center gap-5 text-sm">
              <button
                type="button"
                onClick={() => choose("maybe")}
                className="min-h-[2.75rem] px-1 text-mute-400 underline underline-offset-4 transition hover:text-bone-200"
              >
                {copy.maybeCta}
              </button>
              <button
                type="button"
                onClick={() => choose("no")}
                className="min-h-[2.75rem] px-1 text-mute-500 underline underline-offset-4 transition hover:text-mute-400"
              >
                {copy.noCta}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
