"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { webinars as initialWebinars, type Webinar } from "./data";
import BookingDrawer from "./BookingDrawer";
import VideoModal from "./VideoModal";

type Ctx = {
  webinars: Webinar[];
  reserved: Set<string>;
  openBooking: (webinarId?: string) => void;
  openVideo: () => void;
};

const BookingContext = createContext<Ctx | null>(null);

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used inside BookingProvider");
  return ctx;
}

export default function BookingProvider({ children }: { children: React.ReactNode }) {
  const [webinars, setWebinars] = useState(initialWebinars);
  const [reserved, setReserved] = useState<Set<string>>(() => new Set());
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [videoOpen, setVideoOpen] = useState(false);

  const openBooking = useCallback((webinarId?: string) => {
    setVideoOpen(false);
    setBookingId(webinarId ?? initialWebinars[0].id);
  }, []);

  const openVideo = useCallback(() => setVideoOpen(true), []);

  const confirmBooking = useCallback(
    (id: string) => {
      if (reserved.has(id)) return;
      setReserved(new Set(reserved).add(id));
      setWebinars((list) =>
        list.map((w) => (w.id === id ? { ...w, seatsLeft: Math.max(0, w.seatsLeft - 1) } : w)),
      );
    },
    [reserved],
  );

  const anyOpen = bookingId !== null || videoOpen;
  useEffect(() => {
    if (!anyOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [anyOpen]);

  const value = useMemo(
    () => ({ webinars, reserved, openBooking, openVideo }),
    [webinars, reserved, openBooking, openVideo],
  );

  const active = webinars.find((w) => w.id === bookingId) ?? null;

  return (
    <BookingContext.Provider value={value}>
      {children}
      <BookingDrawer
        webinar={active}
        alreadyReserved={active ? reserved.has(active.id) : false}
        onConfirm={confirmBooking}
        onClose={() => setBookingId(null)}
      />
      <VideoModal
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
        onReserve={() => openBooking()}
      />
    </BookingContext.Provider>
  );
}
