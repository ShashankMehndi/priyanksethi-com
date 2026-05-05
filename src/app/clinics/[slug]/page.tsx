import { notFound } from "next/navigation";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { getPage } from "@/lib/content-loader";
import { DOCTOR } from "@/config/doctor";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { MarkdownBody } from "@/lib/markdown";
import { CtaRail } from "@/components/sections/CtaRail";

type Params = { slug: string };

export function generateStaticParams() {
  return DOCTOR.clinics.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = getPage(`/clinics/${slug}`);
  return buildMetadata({
    title: p?.title,
    description: p?.description,
    path: `/clinics/${slug}`,
    ogImage: p?.ogImage,
  });
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const page = getPage(`/clinics/${slug}`);
  if (!page) return notFound();
  return (
    <>
      <PageHero eyebrow="Clinic" title={page.h1 || page.title} />
      <section className="py-12 md:py-20">
        <Container size="md">
          <MarkdownBody source={page.body} />
          <p className="mt-12 text-sm">
            <Link href="/clinics" className="portfolio-link font-semibold">
              ← All clinics
            </Link>
          </p>
        </Container>
      </section>
      <CtaRail />
    </>
  );
}
