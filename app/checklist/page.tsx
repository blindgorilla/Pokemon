import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { checklist, framework } from "@/lib/content";

export const metadata: Metadata = {
  title: "The BUY OR PASS Checklist | BUY OR PASS",
  description: checklist.subtitle,
  alternates: { canonical: "/checklist" },
  // The checklist is the reward handed over after signup, not a landing page —
  // reachable by anyone with the link, but kept out of search results.
  robots: { index: false, follow: true },
};

/**
 * The free lead magnet. No signup gate: by the time anyone lands here they have
 * already joined the list. The eight items reuse the framework copy verbatim so
 * the checklist and the page's framework grid can never drift apart.
 */
export default function ChecklistPage() {
  return (
    <>
      <Navbar />
      <main>
        <div className="mx-auto w-full max-w-3xl px-5 pt-24 pb-16 sm:px-8 sm:pt-36 sm:pb-24">
          <p className="eyebrow">Free Checklist</p>

          <h1 className="mt-4 text-[2rem] leading-[1.12] font-semibold tracking-[-0.02em] text-balance text-bone-50 sm:text-[2.75rem]">
            {checklist.title}
          </h1>

          <p className="mt-4 text-[1.0625rem] leading-relaxed text-bone-200 sm:text-lg">
            {checklist.subtitle}
          </p>

          <ol className="mt-10 flex flex-col gap-3 sm:mt-12 sm:gap-4">
            {framework.pillars.map((pillar) => (
              <li key={pillar.number} className="panel p-5 sm:p-6">
                <div className="flex items-baseline gap-3">
                  <span
                    aria-hidden="true"
                    className="font-mono text-xs tracking-[0.15em] text-accent/70"
                  >
                    {pillar.number}
                  </span>
                  <h2 className="text-sm font-semibold tracking-[0.12em] text-bone-50">
                    {pillar.title}
                  </h2>
                </div>

                <p className="mt-3 text-[0.9375rem] leading-snug font-medium text-bone-200">
                  {pillar.question}
                </p>

                <p className="mt-2 text-sm leading-relaxed text-mute-400">
                  {pillar.explanation}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-12 border-t border-white/[0.06] pt-8">
            <Link
              href="/"
              className="text-[0.9375rem] text-accent underline underline-offset-4 transition hover:text-accent-strong"
            >
              ← {checklist.backLabel}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
