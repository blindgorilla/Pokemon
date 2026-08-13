import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  /** Heading level — the page keeps a single <h1> in the hero. */
  as?: "h2" | "h3";
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  as: Tag = "h2",
  className = "",
}: SectionHeadingProps) {
  const alignment =
    align === "center" ? "text-center mx-auto items-center" : "text-left";

  return (
    <div className={`flex flex-col ${alignment} ${className}`}>
      {eyebrow ? <p className="eyebrow mb-4">{eyebrow}</p> : null}
      <Tag className="text-[1.75rem] leading-[1.15] font-semibold tracking-[-0.02em] text-balance text-bone-50 sm:text-4xl lg:text-[2.75rem]">
        {title}
      </Tag>
      {intro ? (
        <p
          className={`mt-5 max-w-2xl text-[0.9375rem] leading-relaxed text-mute-400 sm:text-lg ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}
