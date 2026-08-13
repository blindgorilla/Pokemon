import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { contents } from "@/lib/content";

export default function ProductContents() {
  return (
    <Section id="whats-inside" className="border-t border-white/[0.06]">
      <SectionHeading eyebrow="What You Get" title={contents.headline} />

      <div className="mt-10 grid gap-3 sm:mt-14 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {contents.items.map((item, index) => (
          <article
            key={item.title}
            className="panel flex flex-col p-5 transition duration-300 hover:-translate-y-1 hover:border-white/[0.16] sm:p-6"
          >
            <span
              aria-hidden="true"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.09] bg-white/[0.03] font-mono text-xs text-accent/80"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 text-[1.0625rem] leading-snug font-semibold text-bone-50">
              {item.title}
            </h3>
            <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-mute-400">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
