import type { ReactNode } from "react";
import type { Pillar } from "@/lib/content";

type FrameworkCardProps = Pillar & {
  /**
   * Landing-page cards are teasers — number, title and question only. The
   * checklist page opts in to the full explanation.
   */
  showExplanation?: boolean;
  /** Interactive footer (checkbox, notes) appended inside the panel. */
  children?: ReactNode;
};

export default function FrameworkCard({
  number,
  title,
  question,
  explanation,
  showExplanation = false,
  children,
}: FrameworkCardProps) {
  return (
    <article className="panel group relative flex flex-col overflow-hidden p-5 transition duration-300 hover:-translate-y-1 hover:border-white/[0.16] sm:p-6">
      <span
        aria-hidden="true"
        className="font-mono text-xs tracking-[0.15em] text-accent/70"
      >
        {number}
      </span>

      <h3 className="mt-3 text-sm font-semibold tracking-[0.12em] text-bone-50">
        {title}
      </h3>

      <p className="mt-3 text-[0.9375rem] leading-snug font-medium text-bone-200">
        {question}
      </p>

      {showExplanation ? (
        <p className="mt-3 text-sm leading-relaxed text-mute-400">
          {explanation}
        </p>
      ) : null}

      {children}

      {/* Hairline that warms on hover — the only interactive flourish. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-5 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
    </article>
  );
}
