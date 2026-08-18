import { heroSlab } from "@/lib/content";

/**
 * The worked-example slab: a small tilted card floating over the hero photo.
 * Header row (label + cert number), price, one decision badge and a 4-item
 * stat grid — no reasoning sentence or caption, the numbers carry it.
 */
export default function HeroSlab() {
  return (
    <div
      className="hairline rise absolute right-3 bottom-3 w-[calc(100%-3rem)] max-w-[13.5rem] -rotate-3 rounded-xl border-white/[0.14] bg-ink-950/85 p-3.5 shadow-[0_24px_48px_-20px_rgba(0,0,0,0.85)] backdrop-blur-md [animation-delay:120ms] sm:right-4 sm:bottom-4 sm:max-w-[14.5rem] sm:p-4"
    >
      <div className="flex items-center justify-between gap-2 font-[family-name:var(--font-plex-mono)]">
        <span className="text-[0.5625rem] tracking-[0.14em] text-mute-400 uppercase">
          {heroSlab.label}
        </span>
        <span className="text-[0.5625rem] tracking-[0.04em] text-mute-500">
          {heroSlab.cert}
        </span>
      </div>

      <p className="mt-2 font-[family-name:var(--font-fraunces)] text-[1.75rem] leading-none font-semibold text-bone-50 sm:text-[2rem]">
        {heroSlab.price}
      </p>

      <span className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-slab-gold/[0.16] px-2.5 py-1 font-[family-name:var(--font-plex-mono)] text-[0.6875rem] font-medium tracking-[0.1em] text-slab-gold">
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-slab-gold" />
        {heroSlab.decision}
      </span>

      <dl className="mt-3.5 grid grid-cols-2 gap-x-3 gap-y-2 border-t border-white/[0.08] pt-3">
        {heroSlab.factors.map((factor) => (
          <div key={factor.label}>
            <dt className="font-[family-name:var(--font-plex-mono)] text-[0.5625rem] tracking-[0.1em] text-mute-500">
              {factor.label}
            </dt>
            <dd className="mt-0.5 text-[0.75rem] font-medium text-bone-200">
              {factor.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
