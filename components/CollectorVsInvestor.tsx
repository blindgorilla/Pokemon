import Section from "@/components/Section";
import { brains } from "@/lib/content";

type ColumnProps = {
  title: string;
  quote: string;
  items: readonly string[];
  accent: "collector" | "investor";
};

function BrainColumn({ title, quote, items, accent }: ColumnProps) {
  const isInvestor = accent === "investor";

  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-5 sm:p-7 ${
        isInvestor
          ? "border-accent/25 bg-accent/[0.04]"
          : "border-white/[0.09] bg-white/[0.02]"
      }`}
    >
      <h3
        className={`text-sm font-semibold tracking-[0.16em] ${
          isInvestor ? "text-accent" : "text-mute-400"
        }`}
      >
        {title.toUpperCase()}
      </h3>

      <p className="mt-4 text-lg leading-snug font-medium text-bone-50 sm:text-xl">
        “{quote}”
      </p>

      <ul className="mt-6 flex flex-col gap-2.5">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-center gap-3 text-[0.9375rem] text-bone-200"
          >
            <span
              aria-hidden="true"
              className={`h-px w-4 flex-none ${
                isInvestor ? "bg-accent/60" : "bg-white/25"
              }`}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Visually distinct band: lighter charcoal panel, tighter type, side-by-side
 * comparison on desktop and stacked on mobile.
 */
export default function CollectorVsInvestor() {
  return (
    <Section
      id="mindset"
      className="overflow-hidden border-y border-white/[0.08] bg-ink-800"
    >
      {/* Lifted charcoal band + a single soft wash sets this section apart. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_80%_0%,rgba(240,178,62,0.07),transparent_65%)]"
      />

      <div className="relative max-w-3xl">
        <p className="eyebrow">Two Ways to Decide</p>
        <h2 className="mt-4 text-[1.75rem] leading-[1.15] font-semibold tracking-[-0.02em] text-balance text-bone-50 sm:text-4xl lg:text-[2.75rem]">
          {brains.headline}
        </h2>
        <p className="mt-5 text-[0.9375rem] leading-relaxed text-mute-400 sm:text-lg">
          {brains.intro}
        </p>
      </div>

      <div className="relative mt-10 grid gap-4 sm:mt-14 lg:grid-cols-2 lg:gap-5">
        <BrainColumn
          title={brains.collector.title}
          quote={brains.collector.quote}
          items={brains.collector.items}
          accent="collector"
        />
        <BrainColumn
          title={brains.investor.title}
          quote={brains.investor.quote}
          items={brains.investor.items}
          accent="investor"
        />

        {/* Divider glyph — sits between the columns on large screens. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-ink-950 text-sm text-mute-400 lg:flex"
        >
          ≠
        </span>
      </div>

      <p className="mt-10 max-w-2xl text-[1.0625rem] leading-relaxed font-medium text-bone-50 sm:text-xl">
        {brains.closer}
      </p>
    </Section>
  );
}
