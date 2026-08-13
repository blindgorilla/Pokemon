/**
 * Original graded-slab silhouette. Deliberately generic: an abstract prism
 * motif and neutral grading label — no Pokémon artwork, logos or characters.
 */
export default function SlabMockup({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`relative aspect-[2/3] w-full max-w-[15rem] select-none sm:max-w-[17rem] ${className}`}
    >
      {/* Slab shell */}
      <div className="absolute inset-0 rounded-[1.25rem] border border-white/[0.14] bg-gradient-to-b from-white/[0.13] to-white/[0.03] p-[0.4rem] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)] backdrop-blur-sm">
        <div className="relative flex h-full w-full flex-col rounded-[0.9rem] border border-white/[0.08] bg-ink-900/80 p-3">
          {/* Grading label strip */}
          <div className="flex items-center justify-between rounded-md border border-white/[0.08] bg-ink-850 px-2.5 py-2">
            <div className="flex flex-col">
              <span className="text-[0.5rem] font-semibold tracking-[0.2em] text-mute-500">
                CERTIFIED
              </span>
              <span className="text-[0.6rem] font-semibold tracking-[0.08em] text-bone-200">
                MINT
              </span>
            </div>
            <span className="rounded bg-accent/15 px-2 py-1 text-sm font-bold leading-none text-accent">
              10
            </span>
          </div>

          {/* Card window with restrained foil sheen */}
          <div className="foil relative mt-3 flex-1 overflow-hidden rounded-lg border border-white/[0.08]">
            <div className="absolute inset-0 bg-ink-950/55" />
            <svg
              viewBox="0 0 120 180"
              className="absolute inset-0 h-full w-full"
              fill="none"
            >
              <defs>
                <linearGradient id="slab-prism" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#f0b23e" stopOpacity="0.85" />
                  <stop offset="55%" stopColor="#f0b23e" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#62a8f5" stopOpacity="0.28" />
                </linearGradient>
              </defs>
              <path
                d="M60 34 L92 90 L60 146 L28 90 Z"
                stroke="url(#slab-prism)"
                strokeWidth="1.25"
              />
              <path
                d="M60 58 L78 90 L60 122 L42 90 Z"
                stroke="url(#slab-prism)"
                strokeWidth="1"
                opacity="0.8"
              />
              <path d="M28 90 H92" stroke="#ffffff" strokeOpacity="0.08" />
              <path d="M60 34 V146" stroke="#ffffff" strokeOpacity="0.08" />
            </svg>
          </div>

          {/* Serial strip — data-plate motif */}
          <div className="mt-3 flex items-center justify-between font-mono text-[0.55rem] tracking-[0.14em] text-mute-500">
            <span>SN 0042 · 118</span>
            <span>POP 1,412</span>
          </div>
        </div>
      </div>
    </div>
  );
}
