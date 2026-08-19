import { sheetExample } from "@/lib/content";

/**
 * The worked-example sheet shown on the on-screen confirmation after a card
 * check is submitted. Illustrates the 8-question method on a fixed sample
 * card — never the visitor's own submission, which is answered by email.
 */
export default function SheetExample() {
  return (
    <div className="panel mt-6 p-5 sm:p-7">
      <p className="eyebrow">{sheetExample.eyebrow}</p>
      <p className="mt-2 text-sm text-mute-400">{sheetExample.sampleCardLabel}</p>

      <ul className="mt-5 flex flex-col gap-2.5">
        {sheetExample.checks.map((check) => (
          <li
            key={check.number}
            className={`hairline flex items-start gap-3 rounded-xl px-3.5 py-3 ${
              check.filled ? "bg-white/[0.03]" : "bg-transparent"
            }`}
          >
            <span
              aria-hidden="true"
              className={`mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full text-[0.7rem] font-bold ${
                check.filled
                  ? "bg-buy/20 text-buy"
                  : "border border-white/15 text-mute-500"
              }`}
            >
              {check.filled ? "✓" : "•"}
            </span>
            <div className="min-w-0">
              <p className="text-[0.8125rem] font-semibold tracking-[0.06em] text-bone-50">
                {check.number} · {check.title}
              </p>
              <p className="mt-1 text-[0.8125rem] leading-relaxed text-mute-400">
                {check.filled ? check.exampleFinding : "Checked personally for every card."}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="hairline mt-6 flex flex-wrap items-center gap-3 rounded-xl bg-buy/[0.08] border-buy/30 px-4 py-3">
        <span className="inline-flex items-center gap-1.5 text-sm font-bold tracking-[0.08em] text-buy">
          <span aria-hidden="true" className="h-1.5 w-1.5 flex-none rounded-full bg-buy" />
          {sheetExample.verdict.label}
        </span>
        <span className="text-[0.8125rem] leading-relaxed text-mute-400">
          {sheetExample.verdict.note}
        </span>
      </div>

      <div className="mt-6 flex flex-col items-start gap-3 border-t border-white/[0.06] pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-bone-50">{sheetExample.hook.headline}</p>
          <p className="mt-1 text-[0.8125rem] text-mute-400">{sheetExample.hook.body}</p>
        </div>
        <span className="inline-flex h-11 flex-none items-center justify-center gap-2 rounded-xl bg-buy/15 px-5 text-sm font-semibold text-buy">
          <span aria-hidden="true">✓</span>
          {sheetExample.hook.cta}
        </span>
      </div>
    </div>
  );
}
