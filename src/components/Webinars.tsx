"use client";

import { motion } from "motion/react";
import { useBooking } from "./BookingProvider";
import { CalendarIcon, CameraIcon, CheckIcon, ClockIcon, SeatIcon } from "./icons";
import SectionHeading from "./SectionHeading";

export default function Webinars() {
  const { webinars, reserved, openBooking } = useBooking();

  return (
    <section id="webinars" className="bg-sand">
      <div className="mx-auto max-w-5xl px-5 py-14 md:py-20">
        <SectionHeading
          eyebrow="Upcoming Webinars"
          title="Learn live. Ask anything."
          body="Free, practical sessions on Zoom. Seats are limited so every question gets answered."
        />
        <div className="mt-9 grid gap-4 md:grid-cols-3">
          {webinars.map((w, i) => {
            const isReserved = reserved.has(w.id);
            const few = w.seatsLeft <= 10;
            return (
              <motion.article
                key={w.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="flex min-w-0 flex-col rounded-[24px] bg-ivory p-5 md:p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-display text-[34px] font-semibold leading-none text-gold">{w.number}</p>
                    <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.16em] text-ink-soft">
                      {w.category}
                    </p>
                  </div>
                  <span
                    className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-medium tabular-nums ${
                      few ? "bg-forest text-ivory" : "border border-gold/60 text-ink"
                    }`}
                  >
                    <SeatIcon size={14} />
                    {w.seatsLeft} seats left
                  </span>
                </div>
                <h3 className="mt-4 font-display text-[24px] font-semibold leading-[1.12] text-ink">{w.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">{w.subtitle}</p>

                <dl className="mt-5 space-y-2.5 border-t border-line pt-4 text-[14px]">
                  <div className="flex items-center gap-3">
                    <dt className="text-forest"><CalendarIcon size={17} /><span className="sr-only">Date</span></dt>
                    <dd className="text-ink">{w.dateLabel}</dd>
                  </div>
                  <div className="flex items-center gap-3">
                    <dt className="text-forest"><ClockIcon size={17} /><span className="sr-only">Time</span></dt>
                    <dd className="text-ink">{w.time}</dd>
                  </div>
                  <div className="flex items-center gap-3">
                    <dt className="text-forest"><CameraIcon size={17} /><span className="sr-only">Format</span></dt>
                    <dd className="text-ink">{w.format}</dd>
                  </div>
                </dl>

                <div className="mt-auto pt-6">
                  <button
                    type="button"
                    onClick={() => openBooking(w.id)}
                    className={`flex h-12 w-full items-center justify-center gap-2 rounded-full text-[15px] font-medium transition-colors ${
                      isReserved
                        ? "border border-forest/30 text-forest hover:bg-sand"
                        : "bg-forest text-ivory hover:bg-forest-deep"
                    }`}
                  >
                    {isReserved ? (
                      <>
                        <CheckIcon size={18} /> Seat Reserved
                      </>
                    ) : (
                      "Reserve Seat"
                    )}
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
