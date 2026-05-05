import { Container } from "@/components/ui/Container";

/** Generic inner-page hero - for routes that don't have their own custom hero. */
export function PageHero({
  eyebrow,
  title,
  lede,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
}) {
  return (
    <section className="bg-gradient-to-b from-section-warm to-white pb-12 pt-12 md:pb-16 md:pt-20">
      <Container size="md">
        {eyebrow && (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand-gold-deep">
            {eyebrow}
          </p>
        )}
        <h1 className="font-heading text-4xl font-semibold tracking-tight text-brand-ink md:text-5xl">
          {title}
        </h1>
        {lede && <p className="mt-4 max-w-2xl text-base text-brand-ink-soft md:text-lg">{lede}</p>}
      </Container>
    </section>
  );
}
