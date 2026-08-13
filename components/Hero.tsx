import AnalysisDemo from "@/components/AnalysisDemo";
import EarlyAccessForm from "@/components/EarlyAccessForm";
import { hero, HERO_FIELD_ID } from "@/lib/content";

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

      <div className="relative mx-auto w-full max-w-6xl px-5 pb-14 pt-[5.5rem] sm:px-8 sm:pb-20 sm:pt-32 lg:pb-24 lg:pt-36">
        <div className="rise flex flex-col items-start">
          <p className="hairline eyebrow rounded-full bg-white/[0.05] px-3 py-1.5 text-bone-200">
            {hero.eyebrow}
          </p>

          <h1 className="mt-5 max-w-3xl text-[2.125rem] leading-[1.08] font-semibold tracking-[-0.03em] text-balance text-bone-50 sm:text-5xl lg:text-6xl">
            {hero.headlineLead}{" "}
            <span className="block text-mute-400 sm:inline">
              {hero.headlineTrail}
            </span>
          </h1>

          <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-bone-200 sm:mt-5 sm:text-xl">
            {hero.body}
          </p>

          {/* The one action on the page: the email field, right here. */}
          <div className="mt-6 w-full max-w-xl sm:mt-7">
            <EarlyAccessForm
              source="hero"
              submitLabel={hero.ctaLabel}
              fieldId={HERO_FIELD_ID}
              note={hero.formNote}
            />
          </div>
        </div>

        <div className="rise mt-8 [animation-delay:140ms] sm:mt-16">
          <AnalysisDemo />
        </div>
      </div>
    </section>
  );
}
