import type { ReactNode } from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { DOCTOR } from "@/config/doctor";
import { AccreditationBar } from "@/components/layout/AccreditationBar";

export function Footer() {
  return (
    <footer className="w-full bg-section-warm text-brand-ink">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-4 md:px-8 md:py-16">
        <div className="md:col-span-2">
          <p className="font-heading text-xl font-semibold text-brand-ink">{DOCTOR.name}</p>
          <p className="mt-1 text-sm text-brand-ink-soft">{DOCTOR.postNominals}</p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-brand-ink/80">
            Founder of{" "}
            <Link
              href="/stunning-dentistry"
              className="underline decoration-brand-blue/50 underline-offset-4 transition hover:decoration-brand-blue"
            >
              Stunning Dentistry
            </Link>
            . Implant and cosmetic dentist · {DOCTOR.philosophy}.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-[#98A2B3]">
            {DOCTOR.social.facebook && (
              <SocialIcon href={DOCTOR.social.facebook} label="Facebook">
                <FaFacebookF size={17} />
              </SocialIcon>
            )}
            {DOCTOR.social.instagram && (
              <SocialIcon href={DOCTOR.social.instagram} label="Instagram">
                <FaInstagram size={18} />
              </SocialIcon>
            )}
            {DOCTOR.social.youtube && (
              <SocialIcon href={DOCTOR.social.youtube} label="YouTube">
                <FaYoutube size={18} />
              </SocialIcon>
            )}
            {DOCTOR.social.linkedin && (
              <SocialIcon href={DOCTOR.social.linkedin} label="LinkedIn">
                <FaLinkedinIn size={17} />
              </SocialIcon>
            )}
            {DOCTOR.social.twitter && (
              <SocialIcon href={DOCTOR.social.twitter} label="X (Twitter)">
                <FaXTwitter size={16} />
              </SocialIcon>
            )}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-gold-deep">Explore</p>
          <ul className="mt-4 space-y-2 text-sm text-brand-ink/75">
            <li>
              <Link href="/about" className="transition hover:text-brand-blue">
                About
              </Link>
            </li>
            <li>
              <Link href="/case-studies" className="transition hover:text-brand-blue">
                Case studies
              </Link>
            </li>
            <li>
              <Link href="/press" className="transition hover:text-brand-blue">
                Press
              </Link>
            </li>
            <li>
              <Link href="/publications" className="transition hover:text-brand-blue">
                Publications
              </Link>
            </li>
            <li>
              <Link href="/speaking" className="transition hover:text-brand-blue">
                Speaking
              </Link>
            </li>
            <li>
              <Link href="/blog" className="transition hover:text-brand-blue">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        <div className="hidden md:block">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-gold-deep">Talk to him</p>
          <ul className="mt-4 space-y-2 text-sm text-brand-ink/75">
            <li>
              <Link href="/e-consult" className="transition hover:text-brand-blue">
                E-Consult
              </Link>
            </li>
            <li>
              <Link href="/contact" className="transition hover:text-brand-blue">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/clinics" className="transition hover:text-brand-blue">
                Clinics
              </Link>
            </li>
            <li>
              <a href={`tel:${DOCTOR.contact.phone}`} className="transition hover:text-brand-blue">
                {DOCTOR.contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={DOCTOR.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-brand-blue"
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Desktop: trust strip at end of footer. Mobile: strip lives in `MobileBottomBar` under the 3 CTAs. */}
      <div className="hidden md:block">
        <AccreditationBar />
      </div>

      <div className="border-t border-brand-ink/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-5 py-5 text-xs text-brand-ink/50 md:flex-row md:items-center md:px-8">
          <p>© {new Date().getFullYear()} {DOCTOR.brand.legalName}. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/privacy" className="transition hover:text-brand-blue">
              Privacy
            </Link>
            <Link href="/terms" className="transition hover:text-brand-blue">
              Terms
            </Link>
            <a
              href={DOCTOR.brand.parentBrand.url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-brand-blue"
            >
              Visit {DOCTOR.brand.parentBrand.name} →
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="rounded-full border border-brand-ink/10 p-2.5 text-brand-ink/55 transition hover:border-brand-blue/30 hover:text-brand-blue"
    >
      {children}
    </a>
  );
}
