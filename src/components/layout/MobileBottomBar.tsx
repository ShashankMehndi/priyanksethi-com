import Link from "next/link";
import { DOCTOR } from "@/config/doctor";
import { AccreditationBar } from "@/components/layout/AccreditationBar";

/**
 * Fixed mobile dock: WhatsApp / Call / E-Consult, then accreditation marquee flush
 * under the buttons (above home indicator). Hidden from md.
 */
export function MobileBottomBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex flex-col md:hidden">
      <div className="flex h-11 shrink-0 items-stretch border-t border-black/[0.06] bg-white/[0.92] text-[11px] text-brand-ink/75 shadow-[0_-4px_24px_rgba(0,0,0,0.06)] backdrop-blur-md">
        <a
          href={DOCTOR.contact.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 flex-col items-center justify-center gap-0.5 border-r border-black/[0.06] text-[#0a7a52] active:bg-black/[0.03]"
          aria-label="WhatsApp Dr. Sethi's clinic"
        >
          <WhatsAppIcon />
          <span className="font-medium uppercase tracking-wide text-brand-ink/55">WhatsApp</span>
        </a>
        <a
          href={`tel:${DOCTOR.contact.phone}`}
          className="flex flex-1 flex-col items-center justify-center gap-0.5 border-r border-black/[0.06] text-brand-blue active:bg-black/[0.03]"
          aria-label="Call Dr. Sethi's clinic"
        >
          <PhoneIcon />
          <span className="font-medium uppercase tracking-wide text-brand-ink/55">Call</span>
        </a>
        <Link
          href="/e-consult"
          className="flex flex-1 flex-col items-center justify-center gap-0.5 text-brand-ink/80 active:bg-black/[0.03]"
          aria-label="Start an E-Consult with Dr. Sethi"
        >
          <ChatIcon />
          <span className="font-medium uppercase tracking-wide text-brand-ink/55">E-Consult</span>
        </Link>
      </div>
      <div className="shrink-0 pb-[env(safe-area-inset-bottom,0px)]">
        <AccreditationBar />
      </div>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="opacity-90">
      <path d="M19.6 4.4A10 10 0 002.5 17.6L1 23l5.5-1.5A10 10 0 1019.6 4.4ZM12 20.6a8.6 8.6 0 01-4.4-1.2l-.3-.2-3.3.9.9-3.2-.2-.3A8.6 8.6 0 1112 20.6Zm5-6.4-.6-.3c-.3-.1-1.7-.8-1.9-.9s-.5-.1-.6.1l-.8 1c-.2.2-.3.2-.5.1a7 7 0 01-2-1.3 7.5 7.5 0 01-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4a.5.5 0 000-.4l-.9-2.1c-.2-.5-.5-.4-.6-.5h-.5c-.2 0-.4 0-.7.3a3 3 0 00-1 2.2c0 1.3 1 2.6 1.1 2.8.1.1 2 3.1 4.9 4.4l1.6.6 1 .1c.5 0 1.5-.6 1.7-1.2s.2-1.1.2-1.2-.2-.2-.5-.4Z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="opacity-90">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92Z" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="opacity-90">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2Z" />
    </svg>
  );
}
