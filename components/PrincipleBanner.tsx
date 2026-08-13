import Section from "@/components/Section";
import { principle } from "@/lib/content";

/** Core-principle banner — one of only two places foil texture is used. */
export default function PrincipleBanner() {
  return (
    <Section className="border-t border-white/[0.06]">
      <div className="panel relative overflow-hidden px-5 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
        <div
          aria-hidden="true"
          className="foil pointer-events-none absolute inset-0 opacity-[0.5]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-ink-950/70"
        />

        <div className="relative max-w-3xl">
          <p className="eyebrow">Core Principle</p>
          <h2 className="mt-5 text-[1.625rem] leading-[1.2] font-semibold tracking-[-0.02em] text-balance text-bone-50 sm:text-[2.25rem] lg:text-[2.5rem]">
            {principle.statement}
          </h2>
          <p className="mt-6 text-[0.9375rem] leading-relaxed text-mute-400 sm:text-lg">
            {principle.body}
          </p>
        </div>
      </div>
    </Section>
  );
}
