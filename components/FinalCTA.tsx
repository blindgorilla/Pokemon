import EarlyAccessForm from "@/components/EarlyAccessForm";
import Section from "@/components/Section";
import { finalCta } from "@/lib/content";

export default function FinalCTA() {
  return (
    <Section
      id="early-access"
      className="relative overflow-hidden border-t border-white/[0.06]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[26rem] bg-[radial-gradient(55%_60%_at_50%_100%,rgba(240,178,62,0.13),transparent_70%)]"
      />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        <p className="eyebrow">Early Access</p>

        <h2 className="mt-4 text-[1.75rem] leading-[1.15] font-semibold tracking-[-0.02em] text-balance text-bone-50 sm:text-4xl lg:text-[2.75rem]">
          {finalCta.headline}
        </h2>

        <p className="mt-5 max-w-xl text-[0.9375rem] leading-relaxed text-mute-400 sm:text-lg">
          {finalCta.body}
        </p>

        <div className="hairline mt-8 flex items-center gap-3 rounded-full bg-white/[0.03] px-5 py-2.5">
          <span className="text-xs tracking-[0.14em] text-mute-400 uppercase">
            {finalCta.priceLabel}
          </span>
          <span className="text-lg font-semibold text-accent">
            {finalCta.priceValue}
          </span>
        </div>

        <div className="mt-8 w-full max-w-xl">
          <EarlyAccessForm source="final_cta" submitLabel={finalCta.ctaLabel} />
        </div>

        <p className="mt-1 text-sm text-mute-500">{finalCta.microcopy}</p>
      </div>
    </Section>
  );
}
