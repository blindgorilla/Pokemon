import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { caseStudies } from "@/lib/content";

export default function CaseStudies() {
  return (
    <Section id="case-studies">
      <SectionHeading
        eyebrow="Real Case Studies"
        title={caseStudies.headline}
        intro={caseStudies.intro}
      />

      <div className="mt-10 grid gap-3 sm:mt-14 sm:grid-cols-2 sm:gap-4">
        {caseStudies.items.map((item) => (
          <article
            key={item.title}
            className="panel flex flex-col p-5 transition duration-300 hover:-translate-y-1 hover:border-white/[0.16] sm:p-6"
          >
            <span className="text-[0.6875rem] font-semibold tracking-[0.16em] text-accent/80">
              {item.subtitle.toUpperCase()}
            </span>
            <h3 className="mt-3 text-lg leading-snug font-semibold tracking-[-0.01em] text-bone-50 sm:text-xl">
              {item.title}
            </h3>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-mute-400">
              {item.description}
            </p>
          </article>
        ))}
      </div>

      <p className="mt-8 text-[0.9375rem] leading-relaxed text-bone-200 sm:text-base">
        {caseStudies.footnote}
      </p>
    </Section>
  );
}
