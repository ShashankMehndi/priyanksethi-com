"use client";

import { useMemo } from "react";

/**
 * Top blue marquee bar - SD-network signature element.
 * Carried over from `stunningdentistry-au/src/components/sections/AnnouncementTicker.tsx`
 * but stripped of the heavy region/scroll/footer-sentinel machinery;
 * single-tenant sites don't need any of that.
 *
 * The bar is sticky to the very top, sits ABOVE the Header.
 */

type Item = { label: string; iconKey?: "shield" | "doctor" | "hospital" | "tooth" | "globe" | "calendar" };

/** Top ticker - credentials + achievements (not hours/locations). */
const DEFAULT_ITEMS: Item[] = [
  { label: "Dr. Priyank Sethi · BDS · MDS · Ph.D. (Faculty of Dental Sciences)", iconKey: "doctor" },
  { label: "Digital Smile Designer · internationally certified", iconKey: "shield" },
  { label: "AAID member · AACD member", iconKey: "tooth" },
  { label: "Nobel Biocare certified surgeon · Straumann partner", iconKey: "shield" },
  { label: "ISO 9001:2015 certified practice", iconKey: "shield" },
  { label: "Awarded Best Dentist in India", iconKey: "shield" },
  { label: "1,000+ patients treated · 30+ countries", iconKey: "globe" },
  { label: "20+ years · complex implant & full-mouth rehabilitation", iconKey: "doctor" },
];

export function AnnouncementTicker({ items = DEFAULT_ITEMS }: { items?: Item[] }) {
  const repeated = useMemo(() => [...items, ...items], [items]);
  return (
    <div
      role="region"
      aria-label="Dr. Priyank Sethi achievements and credentials"
      className="sticky top-0 z-50 w-full overflow-hidden border-b border-white/10"
      style={{ background: "var(--grad-trust-strip)" }}
    >
      <div className="mx-auto flex w-max animate-marquee-scroll items-center gap-4 py-2 px-4" style={{ ["--dur" as string]: "45s" }}>
        {repeated.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-white md:text-xs"
          >
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-white/15">
              <DotIcon kind={item.iconKey} />
            </span>
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function DotIcon({ kind }: { kind?: Item["iconKey"] }) {
  const fill = "#F9E08E";
  switch (kind) {
    case "shield":
      return (
        <svg viewBox="0 0 12 12" width="10" height="10" fill={fill} aria-hidden="true">
          <path d="M6 1 L11 3 V6 C11 9 8 11 6 11 C4 11 1 9 1 6 V3 Z" />
        </svg>
      );
    case "doctor":
      return (
        <svg viewBox="0 0 12 12" width="10" height="10" fill={fill} aria-hidden="true">
          <circle cx="6" cy="4" r="2" />
          <path d="M2 11 C2 8.5 3.8 7 6 7 C8.2 7 10 8.5 10 11 Z" />
        </svg>
      );
    case "globe":
      return (
        <svg viewBox="0 0 12 12" width="10" height="10" fill="none" stroke={fill} strokeWidth="0.8" aria-hidden="true">
          <circle cx="6" cy="6" r="4.5" />
          <ellipse cx="6" cy="6" rx="2" ry="4.5" />
          <line x1="1.5" y1="6" x2="10.5" y2="6" />
        </svg>
      );
    case "calendar":
      return (
        <svg viewBox="0 0 12 12" width="10" height="10" fill={fill} aria-hidden="true">
          <rect x="2" y="3" width="8" height="7" rx="0.5" />
          <rect x="3" y="2" width="1" height="2" />
          <rect x="8" y="2" width="1" height="2" />
        </svg>
      );
    case "hospital":
      return (
        <svg viewBox="0 0 12 12" width="10" height="10" fill={fill} aria-hidden="true">
          <rect x="2" y="3" width="8" height="8" />
          <rect x="5.25" y="5" width="1.5" height="4" fill="#001070" />
          <rect x="4" y="6.25" width="4" height="1.5" fill="#001070" />
        </svg>
      );
    default:
      return <span className="inline-block h-1 w-1 rounded-full" style={{ background: fill }} />;
  }
}
