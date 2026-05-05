/**
 * Accreditation / trust-badge marquee — rendered at the bottom of `<Footer>`,
 * sticky on mobile so it sits just above the bottom CTA bar while scrolling the footer.
 */

const BADGES = [
  { label: "BDS · MDS · PhD", sub: "Dental Sciences" },
  { label: "Digital Smile Designer", sub: "Internationally Certified" },
  { label: "AAID Member", sub: "Implantology" },
  { label: "AACD Member", sub: "Cosmetic Dentistry" },
  { label: "ISO 9001:2015", sub: "Certified Practice" },
  { label: "Nobel Biocare", sub: "Certified Surgeon" },
  { label: "Straumann Partner", sub: "Certified Implantologist" },
  { label: "DSD Certified", sub: "Digital Smile Design" },
  { label: "1,000+ Patients", sub: "Across 30+ Countries" },
  { label: "20+ Years", sub: "Clinical Excellence" },
];

export function AccreditationBar() {
  const doubled = [...BADGES, ...BADGES];
  return (
    <div
      className="relative overflow-hidden border-b border-black/[0.08]"
      style={{ background: "var(--grad-trust-strip)" }}
    >
      {/* gold cap line on top */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(232,212,168,0.6) 30%, #F5E6C4 50%, rgba(232,212,168,0.6) 70%, transparent 100%)",
        }}
      />
      <div
        className="animate-marquee-scroll flex w-max items-center gap-6 py-2 text-white"
        style={{ ["--dur" as string]: "55s" }}
        aria-hidden
      >
        {doubled.map((b, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-2 whitespace-nowrap"
          >
            <span
              aria-hidden
              className="h-1 w-1 rounded-full bg-brand-gold opacity-80"
            />
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-white">
              {b.label}
            </span>
            <span className="text-[11px] text-white/60">{b.sub}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
