"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { VIDEO_DURATION, videoChapters, videoTakeaways } from "./data";
import { ArrowRightIcon, CloseIcon, PauseIcon, PlayIcon } from "./icons";
import Portrait from "./Portrait";

type Props = { open: boolean; onClose: () => void; onReserve: () => void };

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

export default function VideoModal({ open, onClose, onReserve }: Props) {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center md:items-center md:p-8" key="video">
          <motion.div
            className="absolute inset-0 bg-ink/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Meet Sommie — How I Started & What I Teach"
            className="relative flex max-h-[94dvh] w-full max-w-2xl flex-col overflow-hidden rounded-t-[28px] bg-ivory md:rounded-[28px]"
            initial={reduce ? { opacity: 0 } : { y: 60, opacity: 0, scale: 0.98 }}
            animate={reduce ? { opacity: 1 } : { y: 0, opacity: 1, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { y: 40, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            <Player onClose={onClose} />
            <div className="overflow-y-auto overscroll-contain px-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-5">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-gold">
                Intro · 2:15
              </p>
              <h3 className="mt-1 font-display text-[26px] font-semibold leading-tight text-ink">
                Meet Sommie — How I Started &amp; What I Teach
              </h3>
              <p className="mt-5 text-[12px] font-medium uppercase tracking-[0.16em] text-ink-soft">
                Key takeaways
              </p>
              <ol className="mt-2 divide-y divide-line">
                {videoTakeaways.map((t, i) => (
                  <li key={t.title} className="flex gap-4 py-3.5">
                    <span className="w-7 shrink-0 font-display text-[22px] font-semibold leading-none text-gold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <p className="text-[15px] font-medium text-ink">{t.title}</p>
                      <p className="mt-0.5 text-[14px] leading-relaxed text-ink-soft">{t.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <button
                type="button"
                onClick={onReserve}
                className="mt-4 flex h-13 w-full items-center justify-center gap-2 rounded-full bg-forest text-[15px] font-medium text-ivory transition-colors hover:bg-forest-deep"
              >
                Reserve a Webinar Seat <ArrowRightIcon size={18} />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function Player({ onClose }: { onClose: () => void }) {
  const [playing, setPlaying] = useState(true);
  const [time, setTime] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setTime((t) => {
        const next = t + 0.25;
        if (next >= VIDEO_DURATION) {
          setPlaying(false);
          return VIDEO_DURATION;
        }
        return next;
      });
    }, 250);
    return () => clearInterval(id);
  }, [playing]);

  const toggle = () => {
    if (!playing && time >= VIDEO_DURATION) setTime(0);
    setPlaying((p) => !p);
  };

  const seek = (clientX: number) => {
    const el = barRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
    setTime(ratio * VIDEO_DURATION);
  };

  const pct = (time / VIDEO_DURATION) * 100;
  const chapter = [...videoChapters].reverse().find((c) => time >= c.at) ?? videoChapters[0];

  return (
    <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-ink">
      <div className="absolute inset-0 opacity-70">
        <Portrait sizes="(max-width: 768px) 100vw, 672px" className="object-[50%_25%]" />
      </div>
      <div className="absolute inset-0 bg-ink/45" />

      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause video" : "Play video"}
        className="absolute inset-0 grid place-items-center"
      >
        <span className={`transition-opacity duration-300 ${playing ? "opacity-0 hover:opacity-100" : "opacity-100"}`}>
          <motion.span
            key={playing ? "pause" : "play"}
            initial={{ scale: 0.85 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
            className="grid size-16 place-items-center rounded-full bg-ivory text-forest"
          >
            {playing ? <PauseIcon size={24} /> : <PlayIcon size={24} className="translate-x-[2px]" />}
          </motion.span>
        </span>
      </button>

      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close video"
        className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-ink/60 text-ivory transition-colors hover:bg-ink"
      >
        <CloseIcon size={18} />
      </button>

      <div className="absolute left-4 top-4 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-ivory/90">
        <span className="size-1.5 rounded-full bg-gold" />
        {chapter.label}
      </div>

      <div className="absolute inset-x-0 bottom-0 px-4 pb-3 pt-6">
        <div
          ref={barRef}
          role="slider"
          tabIndex={0}
          aria-label="Seek"
          aria-valuemin={0}
          aria-valuemax={VIDEO_DURATION}
          aria-valuenow={Math.round(time)}
          aria-valuetext={`${fmt(time)} of ${fmt(VIDEO_DURATION)}`}
          className="group relative flex h-5 cursor-pointer touch-none items-center"
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            seek(e.clientX);
          }}
          onPointerMove={(e) => {
            if (e.currentTarget.hasPointerCapture(e.pointerId)) seek(e.clientX);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") setTime((t) => Math.min(VIDEO_DURATION, t + 5));
            if (e.key === "ArrowLeft") setTime((t) => Math.max(0, t - 5));
          }}
        >
          <div className="relative h-[3px] w-full rounded-full bg-ivory/30">
            {videoChapters.slice(1).map((c) => (
              <span
                key={c.at}
                className="absolute top-0 h-full w-[2px] bg-ink/60"
                style={{ left: `${(c.at / VIDEO_DURATION) * 100}%` }}
              />
            ))}
            <div className="absolute inset-y-0 left-0 rounded-full bg-gold" style={{ width: `${pct}%` }} />
            <span
              className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ivory"
              style={{ left: `${pct}%` }}
            />
          </div>
        </div>
        <div className="mt-1 flex items-center justify-between text-[12px] tabular-nums text-ivory/85">
          <button
            type="button"
            onClick={toggle}
            className="flex items-center gap-1.5"
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? <PauseIcon size={15} /> : <PlayIcon size={15} />}
            {fmt(time)} / {fmt(VIDEO_DURATION)}
          </button>
          <span className="text-ivory/60">Preview</span>
        </div>
      </div>
    </div>
  );
}
