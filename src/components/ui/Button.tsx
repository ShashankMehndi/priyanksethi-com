import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "ghost" | "ink";

const styles: Record<Variant, string> = {
  primary:
    "bg-brand-ink text-white hover:bg-black border border-brand-ink shadow-sm",
  ghost:
    "bg-transparent text-brand-ink border border-brand-ink/20 hover:border-brand-ink hover:bg-brand-ink/5",
  ink: "bg-brand-gold text-brand-ink border border-brand-gold-deep hover:bg-brand-gold-soft",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
}) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition ${styles[variant]} ${className}`;
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
