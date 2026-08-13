"use client";

import { useEffect, useState } from "react";
import CtaButton from "@/components/CtaButton";
import Wordmark from "@/components/Wordmark";
import { nav } from "@/lib/content";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu when the viewport grows past the breakpoint.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (query.matches) setOpen(false);
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-white/[0.08] bg-ink-950/85 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8 lg:h-[4.5rem]"
      >
        <a
          href="/#top"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2.5"
        >
          <Wordmark />
          <span className="sr-only">BUY OR PASS — home</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-7">
            {nav.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-mute-400 transition-colors hover:text-bone-50"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <CtaButton href={nav.cta.href} location="navbar" size="sm">
            {nav.cta.label}
          </CtaButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-lg text-bone-50 transition hover:bg-white/5 md:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden="true" className="relative block h-4 w-5">
            <span
              className={`absolute left-0 block h-[1.5px] w-5 bg-current transition-transform duration-300 ${
                open ? "top-[7px] rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] block h-[1.5px] w-5 bg-current transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-[1.5px] w-5 bg-current transition-transform duration-300 ${
                open ? "top-[7px] -rotate-45" : "top-[14px]"
              }`}
            />
          </span>
        </button>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-white/[0.06] bg-ink-950/95 backdrop-blur-xl md:hidden"
      >
        <ul className="mx-auto flex w-full max-w-6xl flex-col px-5 py-2">
          {nav.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex h-12 items-center text-[0.9375rem] font-medium text-bone-200 transition-colors hover:text-bone-50"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="py-3">
            <CtaButton
              href={nav.cta.href}
              location="navbar_mobile"
              size="md"
              className="w-full"
              onNavigate={() => setOpen(false)}
            >
              {nav.cta.label}
            </CtaButton>
          </li>
        </ul>
      </div>
    </header>
  );
}
