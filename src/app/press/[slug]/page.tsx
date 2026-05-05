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
  return getPagesByPrefix("/press")
    .filter((p) => p.url !== "/press")
    .map((p) => ({ slug: p.url.split("/").pop()! }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = getPage(`/press/${slug}`);
  return buildMetadata({
    title: p?.title,
    description: p?.description,
    path: `/press/${slug}`,
    ogImage: p?.ogImage,
  });
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const page = getPage(`/press/${slug}`);
  if (!page) return notFound();
  const publication = (page.data.publication as string) || "";
  const date = (page.data.date as string) || "";
  return (
    <>
      <PageHero
        eyebrow={[publication, date].filter(Boolean).join(" · ") || "Press"}
        title={page.h1 || page.title}
      />
      <section className="py-12 md:py-20">
        <Container size="md">
          <MarkdownBody source={page.body} />
          <p className="mt-12 text-sm">
            <Link href="/press" className="portfolio-link font-semibold">
              ← All press
            </Link>
          </p>
        </Container>
      </section>
      <CtaRail />
    </>
  );
}
