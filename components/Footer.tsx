import Link from "next/link";
import Wordmark from "@/components/Wordmark";
import { nav, site } from "@/lib/content";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.06] bg-ink-950">
      <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 sm:py-14">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <Wordmark />
            <p className="mt-3 text-sm leading-relaxed text-mute-500">
              {site.tagline}. A decision-making methodology for collectors — not
              financial advice, and not a prediction of future prices.
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-3">
            {nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-mute-400 transition-colors hover:text-bone-50"
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/privacy"
              className="text-sm text-mute-400 transition-colors hover:text-bone-50"
            >
              Privacy Policy
            </Link>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/[0.06] pt-6 text-xs leading-relaxed text-mute-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="max-w-md sm:text-right">
            Pokémon and related trademarks are the property of their respective
            owners. This site is independent and not affiliated with, endorsed by
            or sponsored by any card publisher or grading company.
          </p>
        </div>
      </div>
    </footer>
  );
}
