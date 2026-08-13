import Image from "next/image";
import { analysisDemo } from "@/lib/content";

/** Original market-chart motif — illustrative shape, not real market data. */
function TrendSparkline() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 240 56"
      preserveAspectRatio="none"
      className="h-8 w-full sm:h-10"
      fill="none"
    >
      <defs>
        <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f0b23e" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#f0b23e" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 44 L24 40 L48 43 L72 34 L96 37 L120 26 L144 30 L168 18 L192 22 L216 12 L240 8 V56 H0 Z"
        fill="url(#spark-fill)"
      />
      <path
        d="M0 44 L24 40 L48 43 L72 34 L96 37 L120 26 L144 30 L168 18 L192 22 L216 12 L240 8"
        stroke="#f0b23e"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Hero visual: the card being evaluated, the decision it led to, and the data
 * that supported it — in that order, so the relationship reads
 * "this card → supporting analysis → BUY" on the first glance.
 *
 * The card stays deliberately small (152px on mobile) so the verdict is the
 * dominant element of the panel and stays within the first scroll at ~390px.
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
            <p className="text-[0.6875rem] font-semibold tracking-[0.22em] text-mute-400">
              {analysisDemo.title}
            </p>
            <span className="flex items-center gap-1.5 text-[0.625rem] font-medium tracking-[0.12em] text-mute-500">
              <span className="h-1.5 w-1.5 rounded-full bg-buy" />
              {analysisDemo.status}
            </span>
          </div>

          <div className="mt-4 flex flex-col gap-4 sm:mt-5 sm:flex-row sm:items-start sm:gap-6">
            {/* 1 — the card being evaluated */}
            <div className="mx-auto w-[9.5rem] shrink-0 sm:mx-0 sm:w-[10rem] lg:w-[11.5rem]">
              <div className="overflow-hidden rounded-xl border border-white/[0.10] bg-ink-900/70 p-1.5 shadow-[0_26px_50px_-32px_rgba(0,0,0,0.95)]">
                <Image
                  src={analysisDemo.cardImage}
                  alt={analysisDemo.cardAlt}
                  width={1320}
                  height={1565}
                  priority
                  sizes="(min-width: 1024px) 184px, (min-width: 640px) 160px, 152px"
                  className="h-auto w-full rounded-lg"
                />
              </div>
              <p className="mt-2 text-center text-[0.625rem] font-semibold tracking-[0.2em] text-mute-500 sm:text-left">
                {analysisDemo.cardLabel}
              </p>
            </div>

            <div className="min-w-0 flex-1">
              {/* 2 — the decision, the dominant element of the panel */}
              <div className="relative overflow-hidden rounded-xl border border-buy/25 bg-buy/[0.07] px-4 py-3.5 sm:px-5 sm:py-4">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-buy/[0.10] to-transparent"
                />
                <div className="relative">
                  <p className="flex items-center gap-2 text-[0.625rem] font-semibold tracking-[0.2em] text-buy/80">
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full bg-buy"
                    />
                    DECISION
                  </p>
                  <p className="mt-1.5 text-[1.875rem] leading-none font-bold tracking-[0.04em] text-buy sm:text-[2.25rem]">
                    {analysisDemo.decision}
                  </p>
                  <p className="mt-2 text-[0.8125rem] leading-relaxed text-bone-200">
                    {analysisDemo.caption}
                  </p>
                </div>
              </div>

              {/* 3 — supporting stats, deliberately secondary */}
              <dl className="mt-3 divide-y divide-white/[0.06] border-y border-white/[0.06] sm:mt-4">
                {analysisDemo.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="flex items-center justify-between gap-4 py-1.5 sm:py-2"
                  >
                    <dt className="text-[0.75rem] text-mute-500">
                      {metric.label}
                    </dt>
                    <dd
                      className={`font-mono text-[0.75rem] font-medium tracking-tight sm:text-[0.8125rem] ${
                        metric.label === "Recent Trend"
                          ? "text-buy/90"
                          : "text-bone-200"
                      }`}
                    >
                      {metric.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-2 opacity-70">
                <TrendSparkline />
              </div>
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
