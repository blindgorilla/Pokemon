"use client";

import { useCallback, useState } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";
import {
  productInterest as copy,
  type ProductInterestValue,
} from "@/lib/content";

/**
 * The second validation step, shown only after a successful free-sheet signup.
 *
 * It asks one question and takes one click — no second form, no payment. The
 * three answers fire three distinct events so interest in the paid Method can
 * be measured against `free_sheet_signup` rather than folded into it.
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

/**
 * One clear step down in emphasis per answer, using only the existing palette:
 * the accent stays reserved for the affirmative choice.
 */
const OPTION_STYLES: Record<ProductInterestValue, string> = {
  yes: "bg-accent text-ink-950 hover:bg-accent-strong",
  maybe:
    "hairline bg-white/[0.05] text-bone-50 hover:border-white/20 hover:bg-white/[0.08]",
  no: "hairline bg-transparent text-mute-400 hover:border-white/15 hover:text-bone-200",
};

export default function ProductInterest({ email, source }: ProductInterestProps) {
  const [answered, setAnswered] = useState(false);

  const choose = useCallback(
    (value: ProductInterestValue) => {
      if (answered) return;
      setAnswered(true);

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
    [answered, email, source],
  );

  return (
    <div className="mt-6 border-t border-white/[0.08] pt-6">
      <p className="eyebrow">{copy.eyebrow}</p>

      <p className="mt-3 text-[0.9375rem] leading-relaxed text-bone-200">
        {copy.intro}
      </p>

      <div className="hairline mt-4 inline-flex items-center gap-3 rounded-full bg-white/[0.03] px-4 py-2">
        <span className="text-[0.6875rem] tracking-[0.14em] text-mute-400 uppercase">
          {copy.priceLabel}
        </span>
        <span className="text-base font-semibold text-accent">
          {copy.priceValue}
        </span>
      </div>

      {answered ? (
        <p
          role="status"
          className="mt-5 text-[0.9375rem] leading-relaxed text-bone-50"
        >
          {copy.acknowledgement}
        </p>
      ) : (
        <>
          <p className="mt-5 text-[0.9375rem] font-semibold text-bone-50">
            {copy.question}
          </p>

          {/* Stacked at every width: the labels are long, and a full-width
              target is the easiest thing to tap on a phone. */}
          <div className="mt-3 flex flex-col gap-2.5">
            {copy.options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => choose(option.value)}
                className={`flex min-h-[3rem] w-full items-center justify-center rounded-xl px-4 py-2.5 text-center text-[0.875rem] leading-snug font-semibold tracking-[0.04em] uppercase transition duration-200 ease-out active:scale-[0.99] ${OPTION_STYLES[option.value]}`}
              >
                {/* One inline run, so a long label wraps like text instead of
                    breaking the lead onto a line of its own. */}
                <span className="text-balance">
                  {option.lead} — <span className="font-medium opacity-90">{option.label}</span>
                </span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
