import Image from "next/image";

import CardCheckForm from "@/components/CardCheckForm";
import { BuyBadge, GrowthBadge } from "@/components/HeroBadges";
import { hero, HERO_FIELD_ID } from "@/lib/content";

const DISCLAIMER_ID = "hero-result-disclaimer";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Ambient vault glow — one soft gradient, no page-wide neon. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-40 h-[38rem] bg-[radial-gradient(60%_55%_at_50%_0%,rgba(240,178,62,0.14),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="grid-motif pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(70%_55%_at_50%_0%,black,transparent)]"
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 pb-14 pt-[5.5rem] sm:px-8 sm:pb-20 sm:pt-32 lg:pb-24 lg:pt-36">
        {/*
          Desktop: the promise and the signup hold 61% on the left, the
          photograph 39% on the right. Below lg the visual comes first —
          photo-with-slab, then eyebrow/headline/copy/form — matching the
          reference mockup's mobile reading order.
        */}
        <div className="grid gap-8 lg:grid-cols-[61fr_39fr] lg:items-center lg:gap-14">
          <div className="rise order-2 flex flex-col items-start lg:order-1">
            <p className="hairline inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-3 py-1.5 font-[family-name:var(--font-plex-mono)] text-[0.75rem] leading-snug text-bone-200">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 flex-none rounded-full bg-slab-gold"
              />
              {hero.eyebrow}
            </p>

            <h1 className="mt-5 max-w-3xl font-[family-name:var(--font-fraunces)] text-[2.375rem] leading-[1.08] font-semibold tracking-[-0.02em] text-balance text-bone-50 sm:text-5xl lg:text-6xl">
              {hero.headlineLead}
              <span className="block">{hero.headlineTrail}</span>
            </h1>

            {/* The one subhead line: credibility evidence + the free-value
                promise together. The specific result carries a tooltip
                asterisk instead of a standalone disclaimer paragraph. */}
            <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-bone-200 sm:mt-5 sm:text-xl">
              {hero.body}
              <span className="group/tip relative inline-flex">
                <button
                  type="button"
                  aria-describedby={DISCLAIMER_ID}
                  className="ml-1 inline-flex h-4 w-4 flex-none translate-y-[-0.4em] items-center justify-center rounded-full border border-white/20 text-[0.625rem] leading-none text-mute-400 transition hover:border-slab-gold/60 hover:text-slab-gold focus-visible:outline-none"
                >
                  *
                </button>
                <span
                  id={DISCLAIMER_ID}
                  role="tooltip"
                  className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-60 -translate-x-1/2 rounded-lg border border-white/10 bg-ink-900 p-3 text-xs leading-relaxed text-mute-400 opacity-0 shadow-xl transition duration-150 group-focus-within/tip:opacity-100 group-hover/tip:opacity-100"
                >
                  {hero.disclaimer}
                </span>
              </span>
              {" "}— free.
            </p>

            <div className="mt-6 w-full sm:mt-7">
              <CardCheckForm source="hero" fieldId={HERO_FIELD_ID} />
            </div>
          </div>

          {/*
            Authenticity visual: a real collection, unobstructed except for
            two small corner badges. The portrait source (1200x1600) is
            cropped past the empty bedding at the top so the cards and the
            hand fill the frame — a compact 4:3 on mobile, square on desktop.
          */}
          <figure className="rise order-1 w-full max-w-md [animation-delay:80ms] lg:order-2 lg:ml-auto lg:max-w-[22rem]">
            <div className="hairline relative overflow-hidden rounded-2xl bg-ink-900">
              <Image
                src={hero.collection.image}
                alt={hero.collection.alt}
                width={1200}
                height={1600}
                priority
                sizes="(min-width: 1024px) 22rem, (min-width: 640px) 28rem, 100vw"
                className="aspect-[4/3] w-full object-cover [object-position:50%_58%] lg:aspect-square lg:[object-position:50%_74%]"
              />

              {/* Brand cue: one restrained gold hairline along the top edge. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent"
              />
              {/* Seats the bright photo on the near-black page and keeps the
                  corner badges legible without darkening the cards. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-950/60 to-transparent"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-ink-950/50 to-transparent"
              />

              <GrowthBadge />
              <BuyBadge />
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
