"use client";

import { useEffect, useState } from "react";
import { CalendarIcon, FilmIcon, PersonIcon, QuoteIcon } from "./icons";

const items = [
  { id: "about", label: "About", Icon: PersonIcon },
  { id: "video", label: "Video", Icon: FilmIcon },
  { id: "webinars", label: "Webinars", Icon: CalendarIcon },
  { id: "reviews", label: "Reviews", Icon: QuoteIcon },
];

export default function MobileNav() {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Sections"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-ivory pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <ul className="mx-auto grid h-16 max-w-md grid-cols-4">
        {items.map(({ id, label, Icon }) => {
          const on = active === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={() => setActive(id)}
                aria-current={on ? "true" : undefined}
                className={`relative flex h-full flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors ${
                  on ? "text-forest" : "text-ink-soft"
                }`}
              >
                <span
                  className={`absolute top-0 h-[2px] w-6 rounded-full bg-gold transition-opacity ${
                    on ? "opacity-100" : "opacity-0"
                  }`}
                />
                <Icon size={21} />
                {label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
