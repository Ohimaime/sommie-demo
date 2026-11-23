"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useDragControls, useReducedMotion } from "motion/react";
import type { Webinar } from "./data";
import { CalendarIcon, CameraIcon, CheckIcon, ClockIcon, CloseIcon, LockIcon } from "./icons";

type Props = {
  webinar: Webinar | null;
  alreadyReserved: boolean;
  onConfirm: (id: string) => void;
  onClose: () => void;
};

export default function BookingDrawer({ webinar, alreadyReserved, onConfirm, onClose }: Props) {
  const reduce = useReducedMotion();
  const controls = useDragControls();

  useEffect(() => {
    if (!webinar) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [webinar, onClose]);

  return (
    <AnimatePresence>
      {webinar && (
        <div className="fixed inset-0 z-[60]" key="booking">
          <motion.div
            className="absolute inset-0 bg-ink/45"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Reserve a seat: ${webinar.title}`}
            className="absolute inset-x-0 bottom-0 mx-auto flex max-h-[92dvh] w-full max-w-lg flex-col rounded-t-[28px] bg-ivory shadow-[0_-12px_40px_rgba(26,24,23,0.18)]"
            initial={reduce ? { opacity: 0 } : { y: "100%" }}
            animate={reduce ? { opacity: 1 } : { y: 0 }}
            exit={reduce ? { opacity: 0 } : { y: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            drag={reduce ? false : "y"}
            dragControls={controls}
            dragListener={false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.7 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 110 || info.velocity.y > 600) onClose();
            }}
          >
            <div
              className="flex shrink-0 cursor-grab touch-none justify-center pb-2 pt-3 active:cursor-grabbing"
              onPointerDown={(e) => controls.start(e)}
            >
              <span className="h-1.5 w-11 rounded-full bg-sand-deep" />
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-sand text-ink-soft transition-colors hover:text-ink"
            >
              <CloseIcon size={18} />
            </button>
            <div className="overflow-y-auto overscroll-contain px-6 pb-[calc(1.75rem+env(safe-area-inset-bottom))]">
              <BookingBody
                key={webinar.id}
                webinar={webinar}
                alreadyReserved={alreadyReserved}
                onConfirm={onConfirm}
                onClose={onClose}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function SessionSummary({ webinar }: { webinar: Webinar }) {
  return (
    <div className="rounded-2xl bg-sand p-4">
      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-gold">
        Session {webinar.number} · {webinar.category}
      </p>
      <p className="mt-1.5 font-display text-[21px] font-semibold leading-tight text-ink">
        {webinar.title}
      </p>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-[13px] text-ink-soft">
        <li className="flex items-center gap-1.5">
          <CalendarIcon size={15} /> {webinar.dateLabel}
        </li>
        <li className="flex items-center gap-1.5">
          <ClockIcon size={15} /> {webinar.time}
        </li>
        <li className="flex items-center gap-1.5">
          <CameraIcon size={15} /> {webinar.format}
        </li>
      </ul>
    </div>
  );
}

type Errors = Partial<Record<"name" | "email" | "phone", string>>;

function BookingBody({
  webinar,
  alreadyReserved,
  onConfirm,
  onClose,
}: {
  webinar: Webinar;
  alreadyReserved: boolean;
  onConfirm: (id: string) => void;
  onClose: () => void;
}) {
  const [status, setStatus] = useState<"form" | "loading" | "done">(
    alreadyReserved ? "done" : "form",
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const uid = useId();

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  function validate(): Errors {
    const e: Errors = {};
    if (name.trim().length < 2) e.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) e.email = "Enter a valid email address.";
    if (phone.replace(/\D/g, "").length < 10) e.phone = "Enter a WhatsApp number we can reach.";
    return e;
  }

  function submit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    setStatus("loading");
    timer.current = setTimeout(() => {
      onConfirm(webinar.id);
      setStatus("done");
    }, 750);
  }

  function downloadIcs() {
    const start = new Date(webinar.startUtc);
    const end = new Date(start.getTime() + webinar.durationMinutes * 60_000);
    const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Sommie//Webinars//EN",
      "BEGIN:VEVENT",
      `UID:${webinar.id}@sommie`,
      `DTSTAMP:${fmt(new Date())}`,
      `DTSTART:${fmt(start)}`,
      `DTEND:${fmt(end)}`,
      `SUMMARY:${webinar.title}`,
      "DESCRIPTION:Live on Zoom with Sommie. Your joining link will be sent to your email and WhatsApp.",
      "LOCATION:Zoom",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
    const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `sommie-${webinar.id}.ics`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  if (status === "done") {
    const first = name.trim().split(/\s+/)[0];
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="pt-4 text-center"
      >
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 14, stiffness: 260, delay: 0.05 }}
          className="mx-auto grid size-16 place-items-center rounded-full bg-forest text-ivory"
        >
          <CheckIcon size={30} />
        </motion.div>
        <h3 className="mt-5 font-display text-[30px] font-semibold leading-tight text-ink">
          Seat Reserved
        </h3>
        <p className="mt-1 text-[15px] font-medium text-forest">Reminder link ready</p>
        <p className="mx-auto mt-3 max-w-xs text-[14px] leading-relaxed text-ink-soft">
          {first ? `Thank you, ${first}. ` : ""}Your Zoom link and reminders will arrive by email
          and WhatsApp before the session starts.
        </p>
        <div className="mt-6 text-left">
          <SessionSummary webinar={webinar} />
        </div>
        <div className="mt-6 grid gap-3">
          <button
            type="button"
            onClick={downloadIcs}
            className="flex h-13 items-center justify-center gap-2 rounded-full bg-forest text-[15px] font-medium text-ivory transition-colors hover:bg-forest-deep"
          >
            <CalendarIcon size={18} /> Add to Calendar
          </button>
          <button
            type="button"
            onClick={onClose}
            className="h-13 rounded-full border border-line text-[15px] font-medium text-ink transition-colors hover:bg-sand"
          >
            Done
          </button>
        </div>
      </motion.div>
    );
  }

  const field =
    "mt-1.5 h-12 w-full rounded-xl border bg-white/70 px-4 text-[16px] text-ink outline-none transition-colors placeholder:text-ink-soft/50 focus:border-forest focus:bg-white";

  return (
    <form onSubmit={submit} noValidate className="pt-2">
      <p className="pr-10 text-[11px] font-medium uppercase tracking-[0.18em] text-ink-soft">
        Reserve your seat
      </p>
      <h3 className="mt-1 pr-10 font-display text-[28px] font-semibold leading-tight text-ink">
        Free live session
      </h3>
      <div className="mt-4">
        <SessionSummary webinar={webinar} />
      </div>

      <div className="mt-5 space-y-4">
        <div>
          <label htmlFor={`${uid}-name`} className="text-[13px] font-medium text-ink">
            Full name
          </label>
          <input
            id={`${uid}-name`}
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Adaeze Nwosu"
            aria-invalid={!!errors.name}
            className={`${field} ${errors.name ? "border-[#B4533C]" : "border-line"}`}
          />
          {errors.name && <p className="mt-1 text-[12px] text-[#B4533C]">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor={`${uid}-email`} className="text-[13px] font-medium text-ink">
            Email address
          </label>
          <input
            id={`${uid}-email`}
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            className={`${field} ${errors.email ? "border-[#B4533C]" : "border-line"}`}
          />
          {errors.email && <p className="mt-1 text-[12px] text-[#B4533C]">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor={`${uid}-phone`} className="text-[13px] font-medium text-ink">
            WhatsApp number
          </label>
          <input
            id={`${uid}-phone`}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+234 801 234 5678"
            aria-invalid={!!errors.phone}
            className={`${field} ${errors.phone ? "border-[#B4533C]" : "border-line"}`}
          />
          {errors.phone ? (
            <p className="mt-1 text-[12px] text-[#B4533C]">{errors.phone}</p>
          ) : (
            <p className="mt-1 text-[12px] text-ink-soft">Session reminders are sent here.</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 flex h-13 w-full items-center justify-center gap-2 rounded-full bg-forest text-[15px] font-medium text-ivory transition-colors hover:bg-forest-deep disabled:opacity-80"
      >
        {status === "loading" ? (
          <>
            <motion.span
              className="size-4 rounded-full border-[1.5px] border-ivory/40 border-t-ivory"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
            />
            Reserving your seat
          </>
        ) : (
          "Confirm Reservation"
        )}
      </button>
      <p className="mt-3 flex items-center justify-center gap-1.5 text-[12px] text-ink-soft">
        <LockIcon size={14} /> Your details are only used for session reminders.
      </p>
    </form>
  );
}
