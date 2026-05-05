import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function GlobalReachStat({
  patients = "1,000+",
  countries = "30+",
  surface = "ink",
}: {
  patients?: string;
  countries?: string;
  surface?: "white" | "warm" | "alt" | "ink";
}) {
  return (
    <Section surface={surface}>
      <Container size="lg">
        <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-3">
          <Stat label="Patients treated" value={patients} />
          <Stat label="Countries served" value={countries} />
          <Stat label="Years of practice" value="20+" />
        </div>
      </Container>
    </Section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-heading text-5xl font-semibold text-brand-gold md:text-6xl">{value}</p>
      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
        {label}
      </p>
    </div>
  );
}
