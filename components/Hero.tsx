"use client";

import { useState } from "react";
import AnalysisDemo from "@/components/AnalysisDemo";
import EarlyAccessForm from "@/components/EarlyAccessForm";
import { track } from "@/lib/analytics";
import { hero } from "@/lib/content";

export default function Hero() {
  // The hero CTA reveals the email field in place rather than sending people
  // down the page — the signup is the only action on the whole site.
  const [revealed, setRevealed] = useState(false);

  return (
    <section id="top" className="relative overflow-hidden">
      {/* Ambient vault glow — one soft gradient, no page-wide neon. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-40 h-[38rem] bg-[radial-gradient(60%_55%_at_50%_0%,rgba(240,178,62,0.14),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="grid-motif pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(70%_55%_at_50%_0%,black,transparent)]"
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 pb-16 pt-24 sm:px-8 sm:pb-24 sm:pt-36 lg:pb-28 lg:pt-40">
        <div className="rise flex flex-col items-start">
          <p className="hairline eyebrow rounded-full bg-white/[0.03] px-3 py-1.5">
            {hero.eyebrow}
          </p>

          <h1 className="mt-6 max-w-3xl text-[2.125rem] leading-[1.08] font-semibold tracking-[-0.03em] text-balance text-bone-50 sm:text-5xl lg:text-6xl">
            Know When to Buy.{" "}
            <span className="block text-mute-400 sm:inline">
              And When to Pass.
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-bone-200 sm:mt-6 sm:text-xl">
            {hero.body}
          </p>

          <div className="mt-7 w-full max-w-xl sm:mt-8">
            {revealed ? (
              <EarlyAccessForm
                source="hero"
                submitLabel="Join Early Access"
                autoFocus
              />
            ) : (
              <button
                type="button"
                onClick={() => {
                  track("cta_click", { location: "hero", label: hero.ctaLabel });
                  setRevealed(true);
                }}
                className="inline-flex h-[3.25rem] w-full items-center justify-center rounded-full bg-accent px-8 text-base font-semibold text-ink-950 shadow-[0_10px_30px_-14px_rgba(240,178,62,0.8)] transition duration-200 ease-out hover:bg-accent-strong active:scale-[0.99] sm:h-14 sm:w-auto"
              >
                {hero.ctaLabel}
              </button>
            )}

            <p className="mt-4 text-[0.9375rem] leading-relaxed text-bone-200">
              {hero.teaser}
            </p>
            <p className="mt-2 text-sm text-mute-500">{hero.microcopy}</p>
          </div>
        </div>

        <div className="rise mt-10 [animation-delay:140ms] sm:mt-20">
          <AnalysisDemo />
        </div>
      </div>
    </section>
  );
}
