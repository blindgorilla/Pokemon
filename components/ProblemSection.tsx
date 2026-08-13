import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { problem } from "@/lib/content";

export default function ProblemSection() {
  return (
    <Section id="problem" className="border-t border-white/[0.06]">
      <SectionHeading
        eyebrow="The Problem"
        title={problem.headline}
        intro={problem.intro}
      />

      <ul className="mt-10 grid gap-3 sm:mt-12 sm:grid-cols-2">
        {problem.questions.map((question, index) => (
          <li
            key={question}
            className="panel flex items-start gap-3.5 px-4 py-4 transition duration-300 hover:-translate-y-0.5 hover:border-white/[0.16] sm:px-5"
          >
            <span
              aria-hidden="true"
              className="mt-0.5 font-mono text-xs text-mute-500"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-[0.9375rem] leading-relaxed text-bone-200">
              {question}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-10 text-[1.0625rem] leading-relaxed font-medium text-bone-50 sm:text-xl">
        {problem.closer}
      </p>
    </Section>
  );
}
