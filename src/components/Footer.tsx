"use client";

import { useBooking } from "./BookingProvider";
import { ArrowRightIcon, InstagramIcon, TikTokIcon, WhatsAppIcon, XIcon, YouTubeIcon } from "./icons";

const socials = [
  { label: "Instagram", Icon: InstagramIcon },
  { label: "YouTube", Icon: YouTubeIcon },
  { label: "TikTok", Icon: TikTokIcon },
  { label: "X", Icon: XIcon },
  { label: "WhatsApp", Icon: WhatsAppIcon },
];

export default function Footer() {
  const { openBooking } = useBooking();

  return (
    <footer className="bg-forest text-ivory">
      <div className="mx-auto max-w-5xl px-5 pb-[calc(2.5rem+64px+env(safe-area-inset-bottom))] pt-16 md:pb-10 md:pt-20">
        <p className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-ivory/70">
          <span className="h-px w-8 bg-gold" />
          Next session is filling up
        </p>
        <h2 className="mt-4 max-w-lg font-display text-[40px] font-medium leading-[1.04] md:text-[54px]">
          Ready to learn directly from <em className="text-gold">Sommie?</em>
        </h2>
        <button
          type="button"
          onClick={() => openBooking()}
          className="mt-8 flex h-13 w-full items-center justify-center gap-2 rounded-full bg-ivory px-7 text-[15px] font-medium text-forest transition-colors hover:bg-sand sm:w-auto"
        >
          Reserve a Webinar Seat <ArrowRightIcon size={18} />
        </button>

        <div className="mt-16 flex flex-col gap-6 border-t border-ivory/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-[24px] font-semibold tracking-[0.14em]">
            SOMMIE<span className="text-gold">.</span>
          </p>
          <ul className="flex gap-2">
            {socials.map(({ label, Icon }) => (
              <li key={label}>
                <a
                  href="#"
                  aria-label={label}
                  className="grid size-10 place-items-center rounded-full border border-ivory/20 text-ivory/85 transition-colors hover:border-gold hover:text-gold"
                >
                  <Icon size={18} />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-6 text-[12px] leading-relaxed text-ivory/55">
          © 2026 Sommie. Trading involves risk. Educational content only — not financial advice.
        </p>
      </div>
    </footer>
  );
}
