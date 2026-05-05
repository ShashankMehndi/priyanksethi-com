import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeader } from "@/components/ui/Section";

export type CaseEntry = {
  name: string;
  slug: string;
  image: string;
  href?: string;
  celebrity?: boolean;
};

export function CaseStudyGrid({
  cases,
  eyebrow,
  title,
  lede,
  surface = "white",
}: {
  cases: CaseEntry[];
  eyebrow?: string;
  title: string;
  lede?: string;
  surface?: "white" | "warm" | "alt";
}) {
  return (
    <Section surface={surface}>
      <Container size="lg">
        <SectionHeader eyebrow={eyebrow} title={title} lede={lede} />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {cases.map((c) => (
            <Link
              key={c.slug}
              href={c.href ?? `/case-studies/case/${c.slug}`}
              className="group relative block overflow-hidden rounded-2xl bg-section-warm ring-1 ring-section-alt transition hover:ring-brand-gold"
            >
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-300 group-hover:scale-[1.03]"
                />
              </div>
              {c.celebrity && (
                <span className="absolute left-3 top-3 rounded-full bg-brand-gold px-2.5 py-1 text-xs font-semibold text-brand-ink shadow-sm">
                  Celebrity case
                </span>
              )}
              <div className="flex items-center justify-between gap-2 p-4">
                <p className="font-heading text-base font-semibold text-brand-ink">{c.name}</p>
                <span className="text-xs font-medium uppercase tracking-wider text-brand-gold-deep">
                  Read →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
