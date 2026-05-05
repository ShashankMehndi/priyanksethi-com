import { notFound } from "next/navigation";
import { getPage } from "@/lib/content-loader";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { MarkdownBody } from "@/lib/markdown";
import { CtaRail } from "@/components/sections/CtaRail";

/**
 * Renders any markdown page from the content folder using a consistent
 * inner-page layout: PageHero + body + CtaRail. Used for the long tail of
 * routes (about, credentials, awards, philosophy, stunning-dentistry, etc.)
 * that don't need bespoke section composition.
 */
export function MarkdownPage({
  url,
  eyebrow,
  showCta = true,
}: {
  url: string;
  eyebrow?: string;
  showCta?: boolean;
}) {
  const page = getPage(url);
  if (!page) return notFound();

  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={page.h1 || page.title}
        lede={page.description}
      />
      <section className="py-12 md:py-20">
        <Container size="md">
          <MarkdownBody source={page.body} />
        </Container>
      </section>
      {showCta && <CtaRail />}
    </>
  );
}
