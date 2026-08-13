import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  children: ReactNode;
  /** Extra classes for the outer <section> (background treatments, borders). */
  className?: string;
  /** Extra classes for the inner container (width overrides). */
  innerClassName?: string;
  /** Renders as a plain <div> when the content is already inside a landmark. */
  as?: "section" | "div";
};

/**
 * Page section shell: consistent vertical rhythm and gutters, mobile-first.
 * Gutters stay at 20px on a ~390px viewport so nothing ever touches the edge.
 */
export default function Section({
  id,
  children,
  className = "",
  innerClassName = "",
  as: Tag = "section",
}: SectionProps) {
  return (
    <Tag id={id} className={`relative w-full ${className}`}>
      <div
        className={`mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24 lg:py-28 ${innerClassName}`}
      >
        {children}
      </div>
    </Tag>
  );
}
