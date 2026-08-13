"use client";

import type { ReactNode } from "react";
import { track } from "@/lib/analytics";

type CtaButtonProps = {
  children: ReactNode;
  /** Anchor target for the single page-wide conversion action. */
  href: string;
  /** Where the click happened — recorded on the `cta_click` event. */
  location: string;
  variant?: "primary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onNavigate?: () => void;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-[-0.01em] transition duration-200 ease-out select-none";

const variants = {
  primary:
    "bg-accent text-ink-950 shadow-[0_8px_24px_-12px_rgba(240,178,62,0.7)] hover:bg-accent-strong hover:shadow-[0_10px_28px_-10px_rgba(240,178,62,0.75)] active:scale-[0.99]",
  ghost:
    "hairline bg-white/[0.03] text-bone-50 hover:border-white/20 hover:bg-white/[0.07]",
};

// Minimum 44px tap height on every size — mobile-first tap targets.
const sizes = {
  sm: "h-11 px-5 text-sm",
  md: "h-12 px-6 text-[0.9375rem]",
  lg: "h-[3.25rem] px-7 text-base sm:h-14 sm:px-8",
};

/**
 * Every CTA on the page points at the same early-access signup; this component
 * guarantees the analytics event fires consistently wherever it is used.
 */
export default function CtaButton({
  children,
  href,
  location,
  variant = "primary",
  size = "md",
  className = "",
  onNavigate,
}: CtaButtonProps) {
  return (
    <a
      href={href}
      onClick={() => {
        track("cta_click", { location, label: String(children) });
        onNavigate?.();
      }}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </a>
  );
}
