import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeader } from "@/components/ui/Section";

export type PressItem = {
  slug: string;
  image: string;
  publication?: string;
  date?: string;
  headline?: string;
};

export function PressStrip({
  items,
  eyebrow = "In the press",
  title,
  surface = "alt",
}: {
  items: PressItem[];
  eyebrow?: string;
  title: string;
  surface?: "white" | "warm" | "alt";
}) {
  return (
    <Section surface={surface}>
      <Container size="lg">
        <SectionHeader eyebrow={eyebrow} title={title} />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {items.map((p) => (
            <Link
              key={p.slug}
              href={`/press/${p.slug}`}
              className="group flex flex-col overflow-hidden rounded-xl bg-white ring-1 ring-section-alt transition hover:ring-brand-gold"
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={p.image}
                  alt={p.headline ?? p.publication ?? "Press feature"}
                  fill
                  sizes="(min-width: 768px) 200px, 50vw"
                  className="object-cover"
                />
              </div>
              {(p.publication || p.headline) && (
                <div className="px-3 py-2 text-xs">
                  {p.publication && (
                    <p className="font-semibold uppercase tracking-wider text-brand-gold-deep">
                      {p.publication}
                    </p>
                  )}
                  {p.headline && <p className="mt-1 line-clamp-2 text-brand-ink-soft">{p.headline}</p>}
                </div>
              )}
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
