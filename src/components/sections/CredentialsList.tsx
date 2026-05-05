import { Container } from "@/components/ui/Container";
import { Section, SectionHeader } from "@/components/ui/Section";

export function CredentialsList({
  items,
  eyebrow,
  title,
  lede,
  surface = "warm",
}: {
  items: string[];
  eyebrow?: string;
  title: string;
  lede?: string;
  surface?: "white" | "warm" | "alt";
}) {
  return (
    <Section surface={surface}>
      <Container size="md">
        <SectionHeader eyebrow={eyebrow} title={title} lede={lede} />
        <ul className="grid gap-4 md:grid-cols-2">
          {items.map((item, i) => (
            <li
              key={i}
              className="group relative flex items-start gap-3 rounded-xl border border-section-alt bg-white p-5 shadow-sm transition hover:border-brand-gold"
            >
              <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-gold/15 font-heading text-xs font-bold text-brand-gold-deep">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-sm leading-relaxed text-brand-ink-soft md:text-base">{item}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
