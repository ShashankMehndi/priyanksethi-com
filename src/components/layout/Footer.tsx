import Link from "next/link";
import { DOCTOR } from "@/config/doctor";

export function Footer() {
  return (
    <footer className="bg-brand-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-4 md:px-8 md:py-20">
        <div className="md:col-span-2">
          <p className="font-heading text-xl font-semibold text-white">{DOCTOR.name}</p>
          <p className="mt-1 text-sm text-white/60">{DOCTOR.postNominals}</p>
          <p className="mt-4 max-w-md text-sm text-white/70">
            Founder of <Link href="/stunning-dentistry" className="underline decoration-brand-gold underline-offset-4 hover:decoration-2">Stunning Dentistry</Link>. Implant and cosmetic dentist · {DOCTOR.philosophy}.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {DOCTOR.social.facebook && <SocialLink href={DOCTOR.social.facebook} label="Facebook" />}
            {DOCTOR.social.instagram && <SocialLink href={DOCTOR.social.instagram} label="Instagram" />}
            {DOCTOR.social.youtube && <SocialLink href={DOCTOR.social.youtube} label="YouTube" />}
            {DOCTOR.social.linkedin && <SocialLink href={DOCTOR.social.linkedin} label="LinkedIn" />}
            {DOCTOR.social.twitter && <SocialLink href={DOCTOR.social.twitter} label="Twitter / X" />}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-gold">Explore</p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li><Link href="/about" className="hover:text-brand-gold">About</Link></li>
            <li><Link href="/case-studies" className="hover:text-brand-gold">Case studies</Link></li>
            <li><Link href="/press" className="hover:text-brand-gold">Press</Link></li>
            <li><Link href="/publications" className="hover:text-brand-gold">Publications</Link></li>
            <li><Link href="/speaking" className="hover:text-brand-gold">Speaking</Link></li>
            <li><Link href="/blog" className="hover:text-brand-gold">Blog</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-gold">Talk to him</p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li><Link href="/e-consult" className="hover:text-brand-gold">E-Consult</Link></li>
            <li><Link href="/contact" className="hover:text-brand-gold">Contact</Link></li>
            <li><Link href="/clinics" className="hover:text-brand-gold">Clinics</Link></li>
            <li>
              <a href={`tel:${DOCTOR.contact.phone}`} className="hover:text-brand-gold">
                {DOCTOR.contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={DOCTOR.contact.whatsappLink} target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold">
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-5 py-5 text-xs text-white/50 md:flex-row md:items-center md:px-8">
          <p>© {new Date().getFullYear()} {DOCTOR.brand.legalName}. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/privacy" className="hover:text-brand-gold">Privacy</Link>
            <Link href="/terms" className="hover:text-brand-gold">Terms</Link>
            <a
              href={DOCTOR.brand.parentBrand.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-gold"
            >
              Visit {DOCTOR.brand.parentBrand.name} →
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-full border border-white/20 px-3 py-1.5 text-xs text-white/70 transition hover:border-brand-gold hover:text-brand-gold"
    >
      {label}
    </a>
  );
}
