import type { Metadata } from "next";
import ChecklistItem from "@/components/ChecklistItem";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { checklist, framework } from "@/lib/content";

export const metadata: Metadata = {
  title: `${checklist.title} | BUY OR PASS`,
  description: checklist.subtitle,
  alternates: { canonical: "/checklist" },
  robots: { index: true, follow: true },
};

/**
 * The reward already granted at signup — no gate, no form. An interactive
 * worksheet over the same eight pillars shown as teasers on the landing page.
 */
export default function ChecklistPage() {
  return (
    <>
      <Navbar />
      <main>
        <div className="mx-auto w-full max-w-6xl px-5 pt-28 pb-16 sm:px-8 sm:pt-36 sm:pb-24">
          <p className="eyebrow">{checklist.eyebrow}</p>
          <h1 className="mt-4 text-[2rem] leading-[1.12] font-semibold tracking-[-0.02em] text-balance text-bone-50 sm:text-[2.75rem]">
            {checklist.title}
          </h1>
          <p className="mt-4 max-w-2xl text-[0.9375rem] leading-relaxed text-bone-200 sm:text-lg">
            {checklist.subtitle}
          </p>
          <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-mute-400">
            {checklist.intro}
          </p>

          <div className="mt-10 grid gap-3 sm:mt-14 sm:grid-cols-2 sm:gap-4">
            {framework.pillars.map((pillar) => (
              <ChecklistItem key={pillar.number} pillar={pillar} />
            ))}
          </div>

          <p className="mt-8 text-sm leading-relaxed text-mute-500">
            {checklist.footnote}
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
