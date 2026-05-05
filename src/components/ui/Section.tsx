import type { ReactNode } from "react";

type Surface = "white" | "warm" | "alt" | "ink";

export function Section({
  children,
  surface = "white",
  id,
  className = "",
}: {
  children: ReactNode;
  surface?: Surface;
  id?: string;
  className?: string;
}) {
  const bg =
    surface === "warm"
      ? "bg-section-warm"
      : surface === "alt"
        ? "bg-section-alt"
        : surface === "ink"
          ? "bg-brand-ink text-white"
          : "bg-white";
  return (
    <section id={id} className={`relative w-full py-16 md:py-24 ${bg} ${className}`}>
      {children}
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  lede,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  align?: "left" | "center";
}) {
  return (
    <header className={`mb-10 md:mb-14 ${align === "center" ? "text-center mx-auto max-w-2xl" : ""}`}>
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand-gold-deep">
          {eyebrow}
        </p>
      )}
      <h2 className="font-heading text-3xl font-semibold tracking-tight text-current md:text-4xl">
        {title}
      </h2>
      {lede && <p className="mt-4 text-base text-brand-ink-soft md:text-lg">{lede}</p>}
    </header>
  );
}
