import Link from "next/link";
import { DOCTOR } from "@/config/doctor";

export function ClinicCard({
  slug,
  title,
  region,
  address,
  surface = "white",
}: {
  slug: string;
  title: string;
  region: string;
  address: string;
  surface?: "white" | "warm";
}) {
  const bg = surface === "warm" ? "bg-section-warm" : "bg-white";
  return (
    <Link
      href={`/clinics/${slug}`}
      className={`group block rounded-2xl ${bg} p-6 ring-1 ring-section-alt transition hover:ring-brand-gold`}
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-brand-gold-deep">{region}</p>
      <h3 className="mt-1 font-heading text-xl font-semibold text-brand-ink">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-brand-ink-soft">{address}</p>
      <p className="mt-4 text-xs text-brand-ink-soft/70">{DOCTOR.contact.hours}</p>
      <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-brand-gold-deep">
        Location details →
      </p>
    </Link>
  );
}
