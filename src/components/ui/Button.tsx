import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "ghost" | "ghostOnInk" | "ink" | "gold";
type Size = "md" | "sm";

const sizeStyles: Record<Size, string> = {
  md: "gap-2 px-6 py-3 text-sm",
  sm: "gap-1.5 px-4 py-2 text-xs",
};

const styles: Record<Variant, string> = {
  // Primary = SD brand blue (per SD-CA conventions)
  primary:
    "text-white shadow-[0_4px_14px_rgba(0,88,200,0.30)] hover:shadow-[0_8px_20px_rgba(0,88,200,0.40)] hover:brightness-110",
  // Ghost = neutral outline on light surfaces (!text/!bg so parent `text-white` on section never wins)
  ghost:
    "!bg-white !text-brand-ink border border-brand-ink/15 hover:!border-brand-blue hover:!text-brand-blue",
  // Ghost on dark ink sections — avoids fighting `ghost` + overrides (same-specificity clashes in CSS)
  ghostOnInk:
    "!border !border-white/30 !bg-transparent !text-white hover:!border-white/50 hover:!bg-white/10",
  // Ink = dark navy (rare; used on light heroes when blue would clash)
  ink: "bg-brand-ink text-white hover:bg-black border border-brand-ink",
  // Gold = warm gold gradient CTA (per SD-CA gold variant)
  gold:
    "text-white shadow-[0_8px_24px_rgba(245,158,11,0.35)] hover:shadow-[0_12px_28px_rgba(247,184,68,0.45)] hover:brightness-105",
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  external?: boolean;
}) {
  // Inline gradient backgrounds for primary + gold (CSS vars don't compile to hex in Tailwind v4 arbitrary props)
  const inlineBg =
    variant === "primary"
      ? { background: "var(--grad-brand-blue)" }
      : variant === "gold"
        ? { background: "var(--grad-gold-cta)" }
        : undefined;
  const cls = `inline-flex items-center justify-center rounded-full font-semibold transition ${sizeStyles[size]} ${styles[variant]} ${className}`;
  if (external) {
    return (
      <a href={href} className={cls} style={inlineBg} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} style={inlineBg}>
      {children}
    </Link>
  );
}
