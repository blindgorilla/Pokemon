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
          Desktop: conversion copy (7/12) beside the collection photo (5/12).
          Below lg it collapses to one column in the required reading order —
          label, headline, copy, form, microcopy, photo, caption.
        */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="rise flex flex-col items-start lg:col-span-7">
            <p className="hairline eyebrow rounded-full bg-white/[0.05] px-3 py-1.5 text-bone-200">
              {hero.eyebrow}
            </p>

            <h1 className="mt-5 max-w-3xl text-[2.125rem] leading-[1.08] font-semibold tracking-[-0.03em] text-balance text-bone-50 sm:text-5xl lg:text-6xl">
              {hero.headlineLead}{" "}
              <span className="block text-mute-400 sm:inline">
                {hero.headlineTrail}
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-bone-200 sm:mt-5 sm:text-xl">
              {hero.body}
            </p>

            {/* The one action on the page: the email field, right here. */}
            <div className="mt-6 w-full max-w-xl sm:mt-7">
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
            own. Portrait source (3:4), so it is cropped compactly on mobile and
            shown near-native on desktop — in both cases centred on the cards
            and the hand rather than the sheet behind them.
          */}
          <figure className="rise w-full max-w-xl [animation-delay:80ms] lg:col-span-5 lg:ml-auto lg:max-w-[27rem]">
            <div className="hairline relative overflow-hidden rounded-2xl bg-ink-900">
              <Image
                src={hero.collection.image}
                alt={hero.collection.alt}
                width={1200}
                height={1600}
                priority
                sizes="(min-width: 1024px) 27rem, (min-width: 640px) 36rem, 100vw"
                className="aspect-[4/3] w-full object-cover [object-position:50%_58%] lg:aspect-[4/5] lg:[object-position:50%_50%]"
              />
              {/* Seats the bright photo on the near-black page — edge only. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-ink-950/40 to-transparent"
              />
            </div>

            <figcaption className="mt-3 flex items-center gap-2 text-[0.8125rem] leading-relaxed text-mute-500">
              <span
                aria-hidden="true"
                className="h-1 w-1 flex-none rounded-full bg-accent"
              />
              {hero.collection.caption}
            </figcaption>
          </figure>
        </div>

        <div className="rise mt-8 [animation-delay:140ms] sm:mt-16">
          <AnalysisDemo />
        </div>
      </div>
    </section>
  );
}
