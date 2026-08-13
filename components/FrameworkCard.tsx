import type { Pillar } from "@/lib/content";

export default function FrameworkCard({
  number,
  title,
  question,
  explanation,
}: Pillar) {
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

      <p className="mt-3 text-sm leading-relaxed text-mute-400">{explanation}</p>

      {/* Hairline that warms on hover — the only interactive flourish. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-5 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
    </article>
  );
}
