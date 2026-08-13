import Section from "@/components/Section";
import { disclaimer } from "@/lib/content";

/**
 * Positioning guardrail, stated plainly and calmly — this is what the product
 * is not, so expectations are set before anyone joins the list.
 */
export default function DisclaimerSection() {
  return (
    <Section id="expectations" className="border-t border-white/[0.06]">
      <div className="panel mx-auto flex max-w-3xl flex-col items-start px-5 py-8 sm:px-10 sm:py-12">
        <p className="eyebrow">Setting Expectations</p>
        <h2 className="mt-4 text-[1.5rem] leading-[1.2] font-semibold tracking-[-0.02em] text-balance text-bone-50 sm:text-[2rem]">
          {disclaimer.headline}
        </h2>
        {disclaimer.paragraphs.map((paragraph) => (
          <p
            key={paragraph}
            className="mt-5 text-[0.9375rem] leading-relaxed text-mute-400 sm:text-base"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </Section>
  );
}
