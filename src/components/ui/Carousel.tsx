"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Touch-first horizontal carousel using native scroll-snap. Drag-to-scroll
 * on mobile is the platform default; on desktop we add prev/next buttons.
 *
 * Children render as flex items inside a snap row. The caller controls
 * each item's width (`shrink-0 basis-...`).
 *
 * `autoScroll`: slow continuous advance, loops to start; pauses on hover /
 * focus; off when `prefers-reduced-motion: reduce`.
 */
export function Carousel({
  children,
  ariaLabel,
  autoScroll = false,
}: {
  children: ReactNode;
  ariaLabel: string;
  /** Slowly scroll horizontally (e.g. case study strip). */
  autoScroll?: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const regionRef = useRef<HTMLDivElement | null>(null);
  const pausedRef = useRef(false);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  useEffect(() => {
    if (!autoScroll) return;
    const el = ref.current;
    if (!el) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let alive = true;
    const pxPerFrame = 0.55;

    const tick = () => {
      if (!alive) return;
      const row = ref.current;
      if (!row || pausedRef.current) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const max = row.scrollWidth - row.clientWidth;
      if (max <= 1) {
        raf = requestAnimationFrame(tick);
        return;
      }
      row.scrollLeft += pxPerFrame;
      if (row.scrollLeft >= max - 0.5) {
        row.scrollLeft = 0;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
    };
  }, [autoScroll]);

  const scrollBy = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const step = Math.max(el.clientWidth * 0.9, 240);
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div
      ref={regionRef}
      className="relative"
      role="region"
      aria-label={ariaLabel}
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
      onFocusCapture={() => {
        pausedRef.current = true;
      }}
      onBlurCapture={(e) => {
        const next = e.relatedTarget as Node | null;
        if (regionRef.current && next && regionRef.current.contains(next)) return;
        pausedRef.current = false;
      }}
    >
      <div
        ref={ref}
        className="snap-row hide-scrollbar -mx-5 flex gap-4 overflow-x-auto px-5 py-2 md:-mx-8 md:gap-6 md:px-8"
      >
        {children}
      </div>

      {/* Desktop prev/next */}
      <NavButton dir="prev" disabled={!canPrev} onClick={() => scrollBy(-1)} />
      <NavButton dir="next" disabled={!canNext} onClick={() => scrollBy(1)} />
    </div>
  );
}

function NavButton({
  dir,
  disabled,
  onClick,
}: {
  dir: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "prev" ? "Previous" : "Next"}
      className={`absolute top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-section-alt bg-white shadow-md transition md:inline-flex ${
        dir === "prev" ? "-left-3" : "-right-3"
      } ${disabled ? "opacity-30" : "hover:border-brand-blue hover:text-brand-blue"}`}
    >
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2">
        {dir === "prev" ? (
          <path d="M15 6L9 12L15 18" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M9 6L15 12L9 18" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </button>
  );
}
