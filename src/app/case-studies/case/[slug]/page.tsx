import { notFound } from "next/navigation";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { getPage, getPagesByPrefix } from "@/lib/content-loader";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { MarkdownBody } from "@/lib/markdown";
import { CtaRail } from "@/components/sections/CtaRail";

type Params = { slug: string };

export function generateStaticParams() {
  return getPagesByPrefix("/case-studies/case")
    .map((p) => ({ slug: p.url.split("/").pop()! }))
    .filter((p) => p.slug);
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = getPage(`/case-studies/case/${slug}`);
  return buildMetadata({
    title: p?.title,
    description: p?.description,
    path: `/case-studies/case/${slug}`,
    ogImage: p?.ogImage,
  });
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const page = getPage(`/case-studies/case/${slug}`);
  if (!page) return notFound();
  return (
    <>
      <PageHero eyebrow="Case study" title={page.h1 || page.title} />
      <section className="py-12 md:py-20">
        <Container size="md">
          <MarkdownBody source={page.body} />
          <p className="mt-12 text-sm">
            <Link href="/case-studies" className="portfolio-link font-semibold">
              ← Back to all case studies
            </Link>
          </p>
        </Container>
      </section>
      <CtaRail />
    </>
  );
}
