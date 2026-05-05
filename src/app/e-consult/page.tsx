import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { getPage } from "@/lib/content-loader";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { MarkdownBody } from "@/lib/markdown";
import { EConsultForm } from "@/components/sections/EConsultForm";

const URL = "/e-consult";

export function generateMetadata() {
  const p = getPage(URL);
  return buildMetadata({ title: p?.title, description: p?.description, path: URL });
}

export default function Page() {
  const page = getPage(URL);
  if (!page) return notFound();
  return (
    <>
      <PageHero eyebrow="Direct line" title={page.h1 || page.title} lede={page.description} />
      <section className="py-12 md:py-20">
        <Container size="md">
          <div className="grid gap-10 md:grid-cols-[1fr_1.1fr]">
            <div>
              <MarkdownBody source={page.body} />
            </div>
            <div>
              <EConsultForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
