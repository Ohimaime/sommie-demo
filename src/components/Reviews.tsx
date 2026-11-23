import { reviews } from "./data";
import { QuoteIcon, StarIcon } from "./icons";
import SectionHeading from "./SectionHeading";

export default function Reviews() {
  return (
    <section id="reviews" className="mx-auto max-w-5xl px-5 py-14 md:py-20">
      <SectionHeading
        eyebrow="Student Reviews"
        title="Real people, real progress."
        body="Students across Nigeria, Ghana and the UK on what changed after learning with Sommie."
      />
      <div className="mt-9 grid gap-4 md:grid-cols-2">
        {reviews.map((r) => {
          const initials = r.name
            .split(" ")
            .map((n) => n[0])
            .join("");
          return (
            <figure key={r.name} className="flex min-w-0 flex-col rounded-[24px] border border-line bg-ivory p-6">
              <div className="flex items-center justify-between">
                <QuoteIcon size={30} className="text-gold" />
                <div className="flex gap-0.5 text-gold" aria-label="Rated 5 out of 5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} size={15} fill="currentColor" />
                  ))}
                </div>
              </div>
              <blockquote className="mt-4 font-display text-[21px] font-medium leading-snug text-ink">
                {r.quote}
              </blockquote>
              <p className="mt-5 border-l-2 border-gold pl-3 text-[14px] font-medium text-forest">{r.outcome}</p>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-sand font-display text-[17px] font-semibold text-forest">
                  {initials}
                </span>
                <span className="min-w-0">
                  <span className="block text-[15px] font-medium text-ink">{r.name}</span>
                  <span className="block text-[13px] text-ink-soft">
                    {r.role} · {r.location}
                  </span>
                </span>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}
