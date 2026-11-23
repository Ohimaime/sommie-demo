"use client";

import { motion } from "motion/react";
import { useBooking } from "./BookingProvider";
import { PlayIcon } from "./icons";
import Portrait from "./Portrait";
import SectionHeading from "./SectionHeading";

export default function IntroVideo() {
  const { openVideo } = useBooking();

  return (
    <section id="video" className="mx-auto max-w-5xl px-5 py-14 md:py-20">
      <SectionHeading eyebrow="Intro Video" title="Get to know the person behind the charts." />
      <motion.button
        type="button"
        onClick={openVideo}
        whileTap={{ scale: 0.985 }}
        aria-label="Play intro video: Meet Sommie — How I Started & What I Teach"
        className="group mt-8 block w-full overflow-hidden rounded-[28px] bg-sand text-left"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/8]">
          <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.03]">
            <Portrait sizes="(max-width: 1024px) 100vw, 1024px" className="object-[50%_22%]" />
          </div>
          <div className="absolute inset-0 bg-ink/35" />
          <span className="absolute left-1/2 top-1/2 grid size-[72px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ivory text-forest shadow-[0_10px_30px_rgba(26,24,23,0.25)] transition-transform duration-300 group-hover:scale-105">
            <PlayIcon size={26} className="translate-x-[2px]" />
          </span>
          <span className="absolute left-4 top-4 rounded-full bg-ivory px-3 py-1 text-[12px] font-medium tabular-nums text-ink">
            2:15
          </span>
        </div>
        <div className="flex items-end justify-between gap-4 p-5 md:p-7">
          <div className="min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-gold">Watch first</p>
            <p className="mt-1 font-display text-[24px] font-semibold leading-tight text-ink md:text-[30px]">
              Meet Sommie — How I Started &amp; What I Teach
            </p>
          </div>
          <span className="hidden shrink-0 text-[14px] font-medium text-forest underline decoration-gold underline-offset-4 sm:inline">
            Play video
          </span>
        </div>
      </motion.button>
    </section>
  );
}
