import { Container } from "@/components/ui/Container";
import { Section, SectionHeader } from "@/components/ui/Section";

export type Review = {
  name: string;
  date?: string;
  rating?: number;
  quote: string;
  avatar?: string;
};

export function ReviewsWall({
  reviews,
  eyebrow = "Patient reviews",
  title,
  lede,
  surface = "warm",
  limit,
}: {
  reviews: Review[];
  eyebrow?: string;
  title: string;
  lede?: string;
  surface?: "white" | "warm" | "alt";
  limit?: number;
}) {
  const list = (limit ? reviews.slice(0, limit) : reviews).filter((r) => r.quote);
  return (
    <Section surface={surface}>
      <Container size="lg">
        <SectionHeader eyebrow={eyebrow} title={title} lede={lede} />
        <div className="columns-1 gap-6 md:columns-2 lg:columns-3">
          {list.map((r, i) => (
            <article
              key={`${r.name}-${i}`}
              className="mb-6 inline-block w-full break-inside-avoid rounded-2xl bg-white p-6 ring-1 ring-section-alt"
            >
              <div className="flex items-center gap-1 text-brand-gold">
                {Array.from({ length: r.rating ?? 5 }).map((_, idx) => (
                  <span key={idx} aria-hidden>
                    ★
                  </span>
                ))}
              </div>
              <blockquote className="mt-3 text-sm leading-relaxed text-brand-ink-soft">
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <footer className="mt-4 flex items-center justify-between text-xs">
                <span className="font-semibold text-brand-ink">{r.name}</span>
                {r.date && <span className="text-brand-ink-soft/70">{r.date}</span>}
              </footer>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
