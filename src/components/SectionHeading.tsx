export default function SectionHeading({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="max-w-xl">
      <p className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-ink-soft">
        <span className="h-px w-8 bg-gold" />
        {eyebrow}
      </p>
      <h2 className="mt-4 font-display text-[36px] font-medium leading-[1.05] text-ink md:text-[46px]">{title}</h2>
      {body && <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{body}</p>}
    </div>
  );
}
