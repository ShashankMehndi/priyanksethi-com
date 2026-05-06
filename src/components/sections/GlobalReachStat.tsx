/**
 * Compact trust strip - same warm ivory as CA `bg-section-warm` (`#FBF6EA` via --section-surface).
 * Single auto-scrolling marquee row, minimal height (no large Section padding).
 */
export function GlobalReachStat({
  patients = "1,000+",
  countries = "30+",
}: {
  patients?: string;
  countries?: string;
}) {
  const stats = [
    { value: patients, label: "Patients treated" },
    { value: countries, label: "Countries served" },
    { value: "20+", label: "Years of practice" },
  ];
  // 6 copies so the row is wide enough that the -50% translate covers a visibly
  // moving span on every viewport (3 stats are too few for a perceptible scroll).
  const doubled = [...stats, ...stats, ...stats, ...stats, ...stats, ...stats];

  return (
    <section
      className="relative w-full overflow-hidden border-y border-brand-ink/[0.06] bg-section-warm py-1.5 md:py-2"
      aria-label={`Practice reach: ${patients} patients treated, ${countries} countries served, over 20 years of practice`}
    >
      <div
        className="animate-marquee-scroll flex w-max items-center gap-x-8 md:gap-x-14"
        style={{ ["--dur" as string]: "22s" }}
        aria-hidden
      >
        {doubled.map((s, i) => (
          <span
            key={`${s.label}-${i}`}
            className="flex shrink-0 items-baseline gap-2 whitespace-nowrap text-brand-ink"
          >
            <span className="font-heading text-lg font-semibold tabular-nums text-brand-gold-deep md:text-xl">
              {s.value}
            </span>
            <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-brand-ink-soft md:text-[10px]">
              {s.label}
            </span>
          </span>
        ))}
      </div>
    </section>
  );
}
