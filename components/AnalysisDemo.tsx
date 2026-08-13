import Image from "next/image";
import { analysisDemo } from "@/lib/content";

/**
 * Hero visual: the card being evaluated, the decision it led to, and the four
 * conclusions that supported it — in that order, so the relationship reads
 * "this card → these factors → BUY" within seconds, on mobile as on desktop.
 *
 * The real card photo (/public/example-card.jpeg) is always rendered; it stays
 * deliberately narrow (~22% of the panel on desktop) so the verdict dominates.
 */
export default function AnalysisDemo() {
  return (
    <figure className="w-full">
      <div className="panel relative overflow-hidden p-4 sm:p-6">
        <div
          aria-hidden="true"
          className="grid-motif pointer-events-none absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_45%)]"
        />

        <div className="relative">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[0.8125rem] font-semibold tracking-[0.08em] text-bone-200 sm:text-sm">
              {analysisDemo.title}
            </p>
            <span className="flex flex-none items-center gap-1.5 text-[0.625rem] font-medium tracking-[0.12em] text-mute-500">
              <span className="h-1.5 w-1.5 rounded-full bg-buy" />
              {analysisDemo.status}
            </span>
          </div>

          <div className="mt-4 flex flex-col gap-4 sm:mt-5 sm:flex-row sm:items-start sm:gap-6">
            {/* 1 — the card being evaluated (real photo, shown at every size) */}
            <div className="mx-auto w-[8.5rem] shrink-0 sm:mx-0 sm:w-[22%] sm:min-w-[8rem]">
              <div className="overflow-hidden rounded-xl border border-white/[0.10] bg-ink-900/70 p-1.5 shadow-[0_26px_50px_-32px_rgba(0,0,0,0.95)]">
                <Image
                  src={analysisDemo.cardImage}
                  alt={analysisDemo.cardAlt}
                  width={1320}
                  height={1565}
                  priority
                  sizes="(min-width: 640px) 22vw, 136px"
                  className="h-auto w-full rounded-lg"
                />
              </div>
              <p className="mt-2 text-center text-[0.625rem] font-semibold tracking-[0.2em] text-mute-500 sm:text-left">
                {analysisDemo.cardLabel}
              </p>
            </div>

            <div className="min-w-0 flex-1">
              {/* 2 — the decision, the dominant element of the panel */}
              <div className="relative overflow-hidden rounded-xl border border-buy/25 bg-buy/[0.07] px-4 py-4 sm:px-6 sm:py-5">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-buy/[0.10] to-transparent"
                />
                <div className="relative">
                  <p className="flex items-center gap-2 text-[0.625rem] font-semibold tracking-[0.2em] text-buy/80">
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full bg-buy"
                    />
                    {analysisDemo.decisionLabel}
                  </p>
                  <p className="mt-1.5 text-[2.5rem] leading-none font-bold tracking-[0.04em] text-buy sm:text-[3.25rem]">
                    {analysisDemo.decision}
                  </p>
                  <p className="mt-2.5 text-[0.875rem] leading-relaxed text-bone-200">
                    {analysisDemo.caption}
                  </p>
                </div>
              </div>

              {/* 3 — the supporting conclusions, deliberately compact */}
              <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-0 sm:mt-4 sm:grid-cols-4 sm:gap-x-3">
                {analysisDemo.factors.map((factor) => (
                  <div
                    key={factor.label}
                    className="flex items-baseline justify-between gap-2 border-t border-white/[0.06] py-2 sm:flex-col sm:justify-start sm:gap-1"
                  >
                    <dt className="text-[0.75rem] text-mute-500">
                      {factor.label}
                    </dt>
                    <dd className="text-[0.8125rem] font-medium text-bone-200">
                      {factor.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>

      <figcaption className="mt-3 text-center text-[0.8125rem] leading-relaxed text-mute-500 sm:text-left">
        {analysisDemo.figureCaption}
      </figcaption>
    </figure>
  );
}
