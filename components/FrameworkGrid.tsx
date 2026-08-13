import FrameworkCard from "@/components/FrameworkCard";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { framework } from "@/lib/content";

export default function FrameworkGrid() {
  return (
    <Section id="framework" className="border-t border-white/[0.06]">
      <SectionHeading
        eyebrow="The 8-Pillar Framework"
        title={framework.headline}
      />

      <div className="mt-10 grid gap-3 sm:mt-14 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        {framework.pillars.map((pillar) => (
          <FrameworkCard key={pillar.number} {...pillar} />
        ))}
      </div>
    </Section>
  );
}
