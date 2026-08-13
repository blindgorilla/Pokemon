import Section from "@/components/Section";
import { audience } from "@/lib/content";

export default function AudienceSection() {
  const [intro, emphasis, closer] = audience.paragraphs;

  return (
    <Section id="who-its-for" className="border-t border-white/[0.06]">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <p className="eyebrow">Who It Is For</p>
          <h2 className="mt-4 text-[1.75rem] leading-[1.15] font-semibold tracking-[-0.02em] text-balance text-bone-50 sm:text-4xl lg:text-[2.75rem]">
            {audience.headline}
          </h2>

          <p className="mt-6 text-[0.9375rem] leading-relaxed text-mute-400 sm:text-lg">
            {intro}
          </p>
          <p className="mt-4 border-l-2 border-accent/60 pl-4 text-[1.0625rem] leading-relaxed font-medium text-bone-50 sm:text-xl">
            {emphasis}
          </p>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-mute-400 sm:text-lg">
            {closer}
          </p>
        </div>

        <ul className="panel flex flex-col divide-y divide-white/[0.06] p-1.5 sm:p-2">
          {audience.bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex items-start gap-3 px-3.5 py-3.5 text-[0.9375rem] leading-relaxed text-bone-200"
            >
              <span
                aria-hidden="true"
                className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent/70"
              />
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
