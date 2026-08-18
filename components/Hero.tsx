import Image from "next/image";

import AnalysisDemo from "@/components/AnalysisDemo";
import EarlyAccessForm from "@/components/EarlyAccessForm";
import { hero, HERO_FIELD_ID } from "@/lib/content";

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
          photograph 39% on the right — and the photograph is capped well
          inside its column so the headline stays the heaviest element.
          Below lg it collapses to one column in the intended reading order:
          label, headline, copy, form, microcopy, photo.
        */}
        <div className="grid gap-8 lg:grid-cols-[61fr_39fr] lg:items-center lg:gap-14">
          <div className="rise flex flex-col items-start">
            <p className="hairline eyebrow rounded-full bg-white/[0.05] px-3 py-1.5 text-bone-200">
              {hero.eyebrow}
            </p>

            <h1 className="mt-5 max-w-3xl text-[2.125rem] leading-[1.08] font-semibold tracking-[-0.03em] text-balance text-bone-50 sm:text-5xl lg:text-6xl">
              {hero.headlineLead}{" "}
              <span className="block text-mute-400 sm:inline">
                {hero.headlineTrail}
              </span>
            </h1>

            {/* Credibility evidence — a specific personal result, not a
                promise. Qualified immediately by the disclaimer below. */}
            <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-bone-200 sm:mt-5 sm:text-xl">
              {hero.body}
            </p>

            {/* The free-value line — what the sheet itself does for the
                reader, kept visually lighter than the credibility line. */}
            <p className="mt-2.5 max-w-2xl text-base leading-relaxed text-mute-400 sm:text-lg">
              {hero.subBody}
            </p>

            <p className="mt-2.5 max-w-xl text-xs leading-relaxed text-mute-500">
              {hero.disclaimer}
            </p>

            {/*
              The idle form keeps the original max-w-xl width; the success
              state (Stage A reward + Stage B invitation) is allowed to use
              the full hero column instead, since Part 2 calls for a wider,
              more substantial panel than a narrow vertical form.
            */}
            <div className="mt-6 w-full sm:mt-7">
              <EarlyAccessForm
                source="hero"
                submitLabel={hero.ctaLabel}
                fieldId={HERO_FIELD_ID}
                note={hero.formNote}
              />
            </div>
          </div>

          {/*
            Authenticity visual: a real collection, carrying no verdict of its
            own. The portrait source (1200x1600) is cropped past the empty
            bedding at the top so the cards and the hand fill the frame — a
            compact 4:3 on mobile, square on desktop.
          */}
          <figure className="rise w-full max-w-md [animation-delay:80ms] lg:ml-auto lg:max-w-[22rem]">
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
                  plate below legible without darkening the cards themselves. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-950/70 to-transparent"
              />

              <figcaption className="absolute bottom-3 left-3 rounded-lg border border-white/[0.12] border-l-2 border-l-accent bg-ink-950/75 px-2.5 py-1.5 backdrop-blur-[2px]">
                <span className="block text-[0.5625rem] font-semibold tracking-[0.16em] text-accent uppercase">
                  {hero.collection.label}
                </span>
                <span className="mt-0.5 block text-[0.75rem] leading-snug text-bone-200">
                  {hero.collection.caption}
                </span>
              </figcaption>
            </div>
          </figure>
        </div>

        {/* Kept close to the hero: proof should read as the next beat, not a
            separate section. */}
        <div className="rise mt-7 [animation-delay:140ms] sm:mt-10 lg:mt-12">
          <AnalysisDemo />
        </div>
      </div>
    </section>
  );
}
