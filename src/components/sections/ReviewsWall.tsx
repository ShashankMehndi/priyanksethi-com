import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Carousel } from "@/components/ui/Carousel";

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
  variant = "carousel",
}: {
  reviews: Review[];
  eyebrow?: string;
  title: string;
  lede?: string;
  surface?: "white" | "warm" | "alt";
  limit?: number;
  /** "carousel" = swipeable (default for homepage). "wall" = masonry (used on /testimonials/written). */
  variant?: "carousel" | "wall";
}) {
  const list = (limit ? reviews.slice(0, limit) : reviews).filter((r) => r.quote);
  return (
    <Section surface={surface}>
      <Container size="lg">
        <SectionHeader eyebrow={eyebrow} title={title} lede={lede} />
        {variant === "wall" ? (
          <div className="columns-1 gap-6 md:columns-2 lg:columns-3">
            {list.map((r, i) => (
              <ReviewArticle key={`${r.name}-${i}`} r={r} className="mb-6 inline-block w-full break-inside-avoid" />
            ))}
          </div>
        ) : (
          <Carousel ariaLabel={title} autoScroll>
            {list.map((r, i) => (
              <ReviewArticle
                key={`${r.name}-${i}`}
                r={r}
                className="shrink-0 basis-[82%] sm:basis-[48%] lg:basis-[32%]"
              />
            ))}
          </Carousel>
        )}
      </Container>
    </Section>
  );
}

function ReviewArticle({ r, className }: { r: Review; className: string }) {
  return (
    <article className={`rounded-2xl bg-white p-6 ring-1 ring-section-alt ${className}`}>
      <div className="flex items-start gap-4">
        {r.avatar ? (
          <div
            className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-brand-gold/35 shadow-sm"
            aria-hidden
          >
            <Image src={r.avatar} alt="" fill sizes="56px" className="object-cover" />
          </div>
        ) : null}
        <div className="min-w-0 flex-1">
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
          <footer className="mt-4 flex flex-wrap items-center justify-between gap-x-2 gap-y-1 text-xs">
            <span className="font-semibold text-brand-ink">{r.name}</span>
            {r.date && <span className="text-brand-ink-soft/70">{r.date}</span>}
          </footer>
        </div>
      </div>
    </article>
  );
}
