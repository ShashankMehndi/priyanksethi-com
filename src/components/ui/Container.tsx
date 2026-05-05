import type { ReactNode } from "react";

export function Container({
  children,
  size = "md",
  className = "",
}: {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const max = size === "sm" ? "max-w-3xl" : size === "lg" ? "max-w-7xl" : "max-w-5xl";
  return <div className={`mx-auto ${max} px-5 md:px-8 ${className}`}>{children}</div>;
}
