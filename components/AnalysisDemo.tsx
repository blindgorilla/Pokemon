import SlabMockup from "@/components/SlabMockup";
import { analysisDemo } from "@/lib/content";

/** Original market-chart motif — illustrative shape, not real market data. */
function TrendSparkline() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 240 56"
      preserveAspectRatio="none"
      className="h-14 w-full"
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
 * Hero visual: an original slab mockup beside a card-analysis panel that shows
 * what an evaluation looks like when it is finished.
 */
export default function AnalysisDemo() {
  return (
    <div className="flex w-full flex-col items-center gap-6 sm:flex-row sm:items-stretch sm:gap-5 lg:gap-7">
      <div className="flex w-full justify-center sm:w-[38%] sm:items-center">
        <SlabMockup />
      </div>

      <div className="panel relative w-full overflow-hidden p-5 sm:w-[62%] sm:p-6">
        <div
          aria-hidden="true"
          className="grid-motif pointer-events-none absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_45%)]"
        />

        <div className="relative">
          <div className="flex items-center justify-between">
            <p className="text-[0.6875rem] font-semibold tracking-[0.22em] text-mute-400">
              {analysisDemo.title}
            </p>
            <span className="flex items-center gap-1.5 text-[0.625rem] font-medium tracking-[0.12em] text-mute-500">
              <span className="h-1.5 w-1.5 rounded-full bg-buy" />
              EVALUATED
            </span>
          </div>

          <dl className="mt-4 divide-y divide-white/[0.06] border-y border-white/[0.06]">
            {analysisDemo.metrics.map((metric) => (
              <div
                key={metric.label}
                className="flex items-center justify-between gap-4 py-2.5"
              >
                <dt className="text-[0.8125rem] text-mute-400">{metric.label}</dt>
                <dd
                  className={`font-mono text-[0.8125rem] font-medium tracking-tight sm:text-sm ${
                    metric.label === "Recent Trend" ? "text-buy" : "text-bone-50"
                  }`}
                >
                  {metric.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-3 opacity-80">
            <TrendSparkline />
          </div>

          <div className="mt-4 rounded-xl border border-accent/25 bg-accent/[0.07] px-4 py-4">
            <p className="text-[0.625rem] font-semibold tracking-[0.2em] text-accent/80">
              DECISION
            </p>
            <p className="mt-1 text-2xl font-bold tracking-[-0.01em] text-accent sm:text-[1.75rem]">
              {analysisDemo.decision}
            </p>
            <p className="mt-2 text-[0.8125rem] leading-relaxed text-mute-400">
              {analysisDemo.caption}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
