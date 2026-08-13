"use client";

import { useEffect } from "react";

/**
 * Forces the viewport to the top when the page mounts.
 *
 * Belt-and-braces for a Next.js scroll quirk: after a client-side navigation it
 * calls `scrollIntoView()` on the route segment's top-level nodes, so a page
 * that renders several siblings can end up scrolled to the last of them. The
 * page structure already avoids that; this guards the behaviour if the markup
 * is ever refactored. Runs as a passive effect — after Next's own scroll
 * handling in the same commit — and uses "instant" so it overrides any smooth
 * scroll already in flight (`html { scroll-behavior: smooth }` is global).
 */
export default function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return null;
}
