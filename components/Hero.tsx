import AnalysisDemo from "@/components/AnalysisDemo";
import EarlyAccessForm from "@/components/EarlyAccessForm";
import { hero } from "@/lib/content";

export default function Hero() {
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
          {/* Spelled out rather than using the `eyebrow` utility: this tag is
              long enough that it needs tighter tracking to hold one line. */}
          <p className="hairline rounded-full bg-white/[0.03] px-3 py-1.5 text-[0.6875rem] font-medium tracking-[0.13em] text-mute-400 uppercase sm:text-xs sm:tracking-[0.18em]">
            {hero.eyebrow}
          </p>

          <h1 className="mt-6 max-w-3xl text-[2rem] leading-[1.08] font-semibold tracking-[-0.03em] text-balance text-bone-50 sm:text-5xl lg:text-6xl">
            Know What to Buy.{" "}
            <span className="block text-mute-400 sm:inline">
              Know When to Pass.
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-bone-200 sm:mt-6 sm:text-xl">
            {hero.body}
          </p>

          {/* The email field is the CTA — no reveal step in front of the offer. */}
          <div className="mt-7 w-full max-w-xl sm:mt-8">
            <EarlyAccessForm source="hero" submitLabel={hero.ctaLabel} />

            <p className="mt-3 text-sm text-mute-500">{hero.microcopy}</p>
          </div>
        </div>

        <div className="rise mt-10 [animation-delay:140ms] sm:mt-20">
          <AnalysisDemo />
        </div>
      </div>
    </section>
  );
}
