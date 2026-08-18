import { heroBadges } from "@/lib/content";

/**
 * Growth badge: sparkline + the headline result, pinned to the photo's
 * top-left corner. Purely a credibility cue — no verdict of its own.
 */
export function GrowthBadge() {
  return (
    <div className="hairline rise absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full border-white/[0.14] bg-ink-950/70 px-2.5 py-1.5 backdrop-blur-md sm:top-4 sm:left-4 sm:gap-2 sm:px-3 sm:py-2">
      <svg
        aria-hidden="true"
        viewBox="0 0 32 14"
        className="h-3 w-7 flex-none text-slab-gold sm:h-3.5 sm:w-8"
      >
        <polyline
          points="1,12 8,9 13,10.5 19,5 24,6.5 31,1"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-[family-name:var(--font-plex-mono)] text-[0.5625rem] leading-tight tracking-[0.01em] text-bone-200 sm:text-[0.6875rem]">
        {heroBadges.growth.stat}{" "}
        <span className="text-mute-400">{heroBadges.growth.caption}</span>
      </span>
    </div>
  );
}

/**
 * Standalone decision badge, pinned to the photo's bottom-right corner.
 * Just a dot + the word — no price, no stats.
 */
export function BuyBadge() {
  return (
    <div className="rise absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full border border-buy/40 bg-buy/[0.12] px-2.5 py-1.5 backdrop-blur-md sm:right-4 sm:bottom-4 sm:px-3 sm:py-2">
      <span aria-hidden="true" className="h-1.5 w-1.5 flex-none rounded-full bg-buy" />
      <span className="font-[family-name:var(--font-plex-mono)] text-[0.6875rem] font-medium tracking-[0.08em] text-buy sm:text-xs">
        {heroBadges.decision}
      </span>
    </div>
  );
}
