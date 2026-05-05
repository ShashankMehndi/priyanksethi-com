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
  const rating = r.rating ?? 5;
  const initial = r.name.replace(/^Dr\.\s*/i, "").trim().charAt(0) || "•";

  return (
    <article
      className={`relative flex h-full flex-col overflow-hidden rounded-2xl bg-white p-6 shadow-[0_4px_28px_rgba(27,42,74,0.07)] ring-1 ring-brand-ink/[0.06] transition-shadow duration-300 hover:shadow-[0_10px_40px_rgba(27,42,74,0.11)] sm:p-7 ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-gold via-brand-gold-soft to-brand-gold/25"
        aria-hidden
      />

      <div className="mt-1 flex items-start gap-4">
        {r.avatar ? (
          <div
            className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-section-warm shadow-[0_2px_14px_rgba(27,42,74,0.12)] ring-2 ring-white ring-offset-2 ring-offset-white sm:h-[52px] sm:w-[52px]"
            aria-hidden
          >
            <Image
              src={r.avatar}
              alt=""
              fill
              sizes="(max-width: 640px) 48px, 52px"
              className="object-cover"
            />
          </div>
        ) : (
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-section-warm to-section-alt font-heading text-lg font-semibold text-brand-ink shadow-inner ring-2 ring-white ring-offset-2 ring-offset-white sm:h-[52px] sm:w-[52px]"
            aria-hidden
          >
            {initial}
          </div>
        )}

        <div className="min-w-0 flex-1 pt-0.5">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <span className="font-heading text-base font-semibold tracking-tight text-brand-ink">{r.name}</span>
            {r.date ? (
              <span className="text-[11px] font-medium uppercase tracking-wide text-brand-ink-soft/75">{r.date}</span>
            ) : null}
          </div>
          <p className="sr-only">{rating} out of 5 stars</p>
          <div className="mt-2 flex items-center gap-px" aria-hidden>
            {Array.from({ length: rating }).map((_, idx) => (
              <span
                key={idx}
                className="text-[14px] leading-none text-brand-gold drop-shadow-[0_1px_0_rgba(141,110,27,0.2)] sm:text-[15px]"
              >
                ★
              </span>
            ))}
          </div>
        </div>
      </div>

      <blockquote className="mt-5 flex-1 border-l-[3px] border-brand-gold/50 pl-4 font-heading text-[15px] leading-[1.65] text-brand-ink sm:text-base">
        &ldquo;{r.quote}&rdquo;
      </blockquote>
    </article>
  );
}
