import Image from "next/image";
import { DOCTOR } from "@/config/doctor";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

/** Second portrait for CTA band (distinct from hero `img2`). */
const CTA_PORTRAIT_SRC = "/images/doctor/img4-small.jpg";

export function CtaRail() {
  return (
    <Section surface="ink">
      <Container size="lg">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center md:gap-10">
          <div className="flex w-full max-w-3xl flex-col gap-5 sm:flex-row sm:items-center sm:gap-6 md:gap-8">
            <div className="relative mx-auto h-[120px] w-[96px] shrink-0 overflow-hidden rounded-2xl ring-2 ring-white/20 shadow-[0_12px_40px_rgba(0,0,0,0.35)] sm:mx-0 sm:h-[140px] sm:w-[112px] md:h-[168px] md:w-[134px]">
              <Image
                src={CTA_PORTRAIT_SRC}
                alt={`${DOCTOR.name} — clinical portrait`}
                fill
                sizes="(min-width: 768px) 134px, 112px"
                className="object-cover object-[center_15%]"
              />
            </div>
            <div className="min-w-0 flex-1 text-center sm:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-gold">
                {DOCTOR.philosophy}
              </p>
              <h2 className="mt-2 font-heading text-2xl font-semibold text-white md:text-3xl">
                Talk to {DOCTOR.shortName}
              </h2>
              <p className="mt-2 max-w-xl text-sm text-white/70 md:text-base">
                A direct, non-obligatory consultation by audio or video — best for complex cases, second opinions, and
                patients planning to travel to India.
              </p>
            </div>
          </div>
          <div className="flex w-full flex-wrap justify-center gap-3 sm:w-auto sm:justify-start md:shrink-0">
            <Button href="/e-consult" variant="ink">
              Start an E-Consult
            </Button>
            <Button href={DOCTOR.contact.whatsappLink} variant="ghostOnInk" external>
              WhatsApp
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
