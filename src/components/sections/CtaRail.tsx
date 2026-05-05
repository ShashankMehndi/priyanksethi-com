import { DOCTOR } from "@/config/doctor";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export function CtaRail() {
  return (
    <Section surface="ink">
      <Container size="lg">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-gold">
              {DOCTOR.philosophy}
            </p>
            <h2 className="mt-2 font-heading text-2xl font-semibold text-white md:text-3xl">
              Talk to {DOCTOR.shortName}
            </h2>
            <p className="mt-2 max-w-xl text-sm text-white/70 md:text-base">
              A direct, non-obligatory consultation by audio or video — best for complex cases, second opinions, and patients planning to travel to India.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/e-consult" variant="ink">
              Start an E-Consult
            </Button>
            <Button href={DOCTOR.contact.whatsappLink} variant="ghost" external className="!border-white/30 !text-white hover:!bg-white/10">
              WhatsApp
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
