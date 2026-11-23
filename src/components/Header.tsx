"use client";

import { useEffect, useState } from "react";
import { useBooking } from "./BookingProvider";

export default function Header() {
  const { openBooking } = useBooking();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 bg-ivory pt-[env(safe-area-inset-top)] transition-[border-color] duration-300 ${
        scrolled ? "border-b border-line" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-5">
        <a href="#about" className="font-display text-[26px] font-semibold leading-none tracking-[0.14em] text-ink">
          SOMMIE<span className="text-gold">.</span>
        </a>
        <nav className="hidden items-center gap-8 text-[14px] text-ink-soft md:flex" aria-label="Primary">
          <a href="#about" className="transition-colors hover:text-ink">About</a>
          <a href="#video" className="transition-colors hover:text-ink">Video</a>
          <a href="#webinars" className="transition-colors hover:text-ink">Webinars</a>
          <a href="#reviews" className="transition-colors hover:text-ink">Reviews</a>
        </nav>
        <button
          type="button"
          onClick={() => openBooking()}
          className="h-10 shrink-0 rounded-full bg-forest px-4.5 text-[13.5px] font-medium text-ivory transition-colors hover:bg-forest-deep"
        >
          Join Next Webinar
        </button>
      </div>
    </header>
  );
}
