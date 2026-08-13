import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { decisions, type DecisionKey } from "@/lib/content";

/** Static class maps — semantic decision colours, kept low-saturation. */
const styles: Record<
  DecisionKey,
  { border: string; label: string; dot: string; wash: string }
> = {
  buy: {
    border: "hover:border-buy/40",
    label: "text-buy",
    dot: "bg-buy",
    wash: "from-buy/[0.10]",
  },
  negotiate: {
    border: "hover:border-negotiate/40",
    label: "text-negotiate",
    dot: "bg-negotiate",
    wash: "from-negotiate/[0.10]",
  },
  wait: {
    border: "hover:border-wait/40",
    label: "text-wait",
    dot: "bg-wait",
    wash: "from-wait/[0.10]",
  },
  pass: {
    border: "hover:border-pass/40",
    label: "text-pass",
    dot: "bg-pass",
    wash: "from-pass/[0.10]",
  },
};

export default function DecisionResults() {
  return (
    <Section id="how-it-works" className="border-t border-white/[0.06]">
      <SectionHeading
        eyebrow="The Decision System"
        title={decisions.headline}
      />

      <div className="mt-10 grid gap-3 sm:mt-14 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        {decisions.items.map((item) => {
          const style = styles[item.key];
          return (
            <article
              key={item.key}
              className={`panel relative flex flex-col overflow-hidden p-5 transition duration-300 hover:-translate-y-1 sm:p-6 ${style.border}`}
            >
              <div
                aria-hidden="true"
                className={`pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b to-transparent ${style.wash}`}
              />
              <div className="relative">
                <span
                  aria-hidden="true"
                  className={`block h-1.5 w-1.5 rounded-full ${style.dot}`}
                />
                <h3
                  className={`mt-4 text-xl font-bold tracking-[0.06em] sm:text-2xl ${style.label}`}
                >
                  {item.label}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-mute-400">
                  {item.description}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
