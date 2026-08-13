import SlabMockup from "@/components/SlabMockup";
import { analysisDemo } from "@/lib/content";

function CheckItem({ label }: { label: string }) {
  return (
    <li className="flex items-center gap-2">
      <span
        aria-hidden="true"
        className="inline-flex h-4 w-4 flex-none items-center justify-center rounded-full bg-buy/15 text-[0.6rem] font-bold text-buy"
      >
        ✓
      </span>
      <span className="text-[0.8125rem] text-bone-200">{label}</span>
    </li>
  );
}

/**
 * Hero visual: one question, one card, one verdict. The panel is deliberately
 * number-free — it shows what a finished decision looks like, not a calculation
 * run on the visitor's behalf.
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
          <p className="text-[0.6875rem] font-semibold tracking-[0.22em] text-mute-400">
            {analysisDemo.eyebrow}
          </p>

          <div className="mt-4 flex flex-col gap-4 sm:mt-5 sm:flex-row sm:items-start sm:gap-6">
            {/* Original slab motif — generated, no photography or card artwork. */}
            <div className="mx-auto w-[8.5rem] flex-none sm:mx-0 sm:w-[9rem] lg:w-[10.5rem]">
              <SlabMockup />
            </div>

            <div className="min-w-0 flex-1">
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
                    {analysisDemo.reason}
                  </p>
                </div>
              </div>

              <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 sm:grid-cols-4">
                {analysisDemo.checks.map((check) => (
                  <CheckItem key={check} label={check} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <figcaption className="mt-3 text-center text-[0.8125rem] leading-relaxed text-mute-500 sm:text-left">
        {analysisDemo.caption}
      </figcaption>
    </figure>
  );
}
