"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { DOCTOR } from "@/config/doctor";

type NavItem = { label: string; href: string; children?: { label: string; href: string }[] };

const NAV: NavItem[] = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Bio", href: "/about" },
      { label: "Credentials", href: "/credentials" },
      { label: "Awards", href: "/awards" },
      { label: "Memberships", href: "/memberships" },
      { label: "Philosophy", href: "/philosophy" },
      { label: "Global practice", href: "/global-practice" },
    ],
  },
  {
    label: "Work",
    href: "/case-studies",
    children: [
      { label: "Case studies", href: "/case-studies" },
      { label: "Celebrity cases", href: "/case-studies/celebrity" },
      { label: "Press & media", href: "/press" },
      { label: "Publications", href: "/publications" },
      { label: "Speaking", href: "/speaking" },
    ],
  },
  {
    label: "Testimonials",
    href: "/testimonials",
    children: [
      { label: "Written reviews", href: "/testimonials/written" },
      { label: "Video testimonials", href: "/testimonials/video" },
    ],
  },
  { label: "Stunning Dentistry", href: "/stunning-dentistry" },
  { label: "Clinics", href: "/clinics" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-section-alt bg-white/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-3 md:px-8 md:py-4">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="font-heading text-base font-semibold text-brand-ink md:text-lg">
            {DOCTOR.name}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-gold-deep">
            {DOCTOR.philosophy}
          </span>
        </Link>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-1 text-sm">
            {NAV.map((item) => (
              <li key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className={`rounded-full px-3 py-2 transition ${
                    isActive(pathname, item.href)
                      ? "bg-brand-ink text-white"
                      : "text-brand-ink hover:bg-section-warm"
                  }`}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="invisible absolute left-1/2 top-full z-50 mt-2 w-56 -translate-x-1/2 rounded-xl border border-section-alt bg-white p-2 opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100">
                    {item.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className="block rounded-md px-3 py-2 text-sm text-brand-ink-soft hover:bg-section-warm hover:text-brand-ink"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href="/e-consult"
          className="hidden rounded-full bg-brand-gold px-4 py-2 text-sm font-semibold text-brand-ink shadow-sm hover:bg-brand-gold-soft md:inline-flex"
        >
          E-Consult
        </Link>

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="rounded-md border border-section-alt p-2 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M6 6L18 18M18 6L6 18" strokeLinecap="round" />
            ) : (
              <>
                <path d="M3 6h18" strokeLinecap="round" />
                <path d="M3 12h18" strokeLinecap="round" />
                <path d="M3 18h18" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-section-alt bg-white md:hidden">
          <div className="px-5 py-3">
            {NAV.map((item) => (
              <details key={item.href} className="group border-b border-section-alt py-2 last:border-0">
                <summary className="flex cursor-pointer list-none items-center justify-between py-2 text-sm font-semibold text-brand-ink">
                  <span>{item.label}</span>
                  {item.children && <span className="text-brand-gold-deep group-open:rotate-180 transition">⌃</span>}
                </summary>
                {item.children && (
                  <div className="mt-1 space-y-1 pb-2 pl-3">
                    {item.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        onClick={() => setMobileOpen(false)}
                        className="block py-1 text-sm text-brand-ink-soft hover:text-brand-ink"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </details>
            ))}
            <Link
              href="/e-consult"
              onClick={() => setMobileOpen(false)}
              className="mt-3 block rounded-full bg-brand-gold px-4 py-2.5 text-center text-sm font-semibold text-brand-ink"
            >
              E-Consult
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}
