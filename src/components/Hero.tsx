"use client";

import { motion, useReducedMotion } from "motion/react";
import { useBooking } from "./BookingProvider";
import { PlayIcon } from "./icons";
import Portrait from "./Portrait";

const pillars = [
  { title: "Forex Trading", body: "Read market structure, manage risk, trade with a plan." },
  { title: "Affiliate Marketing", body: "Turn honest content into steady, trackable commissions." },
  { title: "Live Mentorship", body: "Weekly sessions and direct answers to your questions." },
];

export default function Hero() {
  const { openBooking, openVideo } = useBooking();
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section id="about" className="mx-auto max-w-5xl px-5 pb-14 pt-8 md:pb-20 md:pt-14">
      <div className="grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-14">
        <div className="min-w-0">
          <motion.p
            {...rise(0)}
            className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-ink-soft"
          >
            <span className="h-px w-8 bg-gold" />
            Forex · Affiliate · Mentorship
          </motion.p>
          <motion.h1
            {...rise(0.08)}
            className="mt-5 font-display text-[44px] font-medium leading-[1.02] tracking-[-0.01em] text-ink sm:text-[54px] md:text-[64px]"
          >
            Build income streams that <em className="font-medium text-forest">fund the life</em> you want.
          </motion.h1>
          <motion.p {...rise(0.16)} className="mt-5 max-w-md text-[16px] leading-relaxed text-ink-soft">
            I&apos;m Sommie — a forex trader, affiliate marketer and lifestyle creator. I teach the
            exact systems I use, through practical live webinars and mentorship that meet you where
            you are.
          </motion.p>
          <motion.div {...rise(0.24)} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => openBooking()}
              className="h-13 rounded-full bg-forest px-7 text-[15px] font-medium text-ivory transition-colors hover:bg-forest-deep"
            >
              Reserve a Webinar Seat
            </button>
            <button
              type="button"
              onClick={openVideo}
              className="flex h-13 items-center justify-center gap-3 rounded-full border border-ink/15 pl-2 pr-6 text-[15px] font-medium text-ink transition-colors hover:border-ink/30 hover:bg-sand"
            >
              <span className="grid size-9 place-items-center rounded-full bg-sand text-forest">
                <PlayIcon size={16} className="translate-x-px" />
              </span>
              Watch Intro Video
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[360px] md:max-w-none"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[28px] bg-sand">
            <Portrait sizes="(max-width: 768px) 360px, 420px" preload className="object-[50%_20%]" />
          </div>
          <span className="pointer-events-none absolute inset-3 rounded-t-[999px] rounded-b-[22px] border border-ivory/50" />
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="absolute bottom-5 left-3 flex items-center gap-3 rounded-2xl bg-ivory px-4 py-3 shadow-[0_10px_30px_rgba(26,24,23,0.12)] md:-left-8 md:bottom-10"
          >
            <span className="font-display text-[30px] font-semibold leading-none text-forest">3+</span>
            <span className="text-[12px] font-medium leading-tight text-ink">
              Years Trading &amp;
              <br />
              Digital Income
            </span>
            <span className="absolute -top-1 right-3 size-2 rounded-full bg-gold" />
          </motion.div>
        </motion.div>
      </div>

      <div className="mt-14 grid gap-px overflow-hidden rounded-[22px] border border-line bg-line sm:grid-cols-3">
        {pillars.map((p, i) => (
          <div key={p.title} className="bg-ivory p-5">
            <p className="font-display text-[15px] font-semibold text-gold">{String(i + 1).padStart(2, "0")}</p>
            <p className="mt-1 font-display text-[22px] font-semibold leading-tight text-ink">{p.title}</p>
            <p className="mt-1.5 text-[14px] leading-relaxed text-ink-soft">{p.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
