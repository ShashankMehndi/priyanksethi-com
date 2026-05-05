import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { getPage } from "@/lib/content-loader";
import { PageHero } from "@/components/layout/PageHero";
import { CaseStudyGrid, type CaseEntry } from "@/components/sections/CaseStudyGrid";
import { CtaRail } from "@/components/sections/CtaRail";

const URL = "/case-studies/celebrity";

export function generateMetadata() {
  const p = getPage(URL);
  return buildMetadata({ title: p?.title, description: p?.description, path: URL });
}

export default function Page() {
  const page = getPage(URL);
  if (!page) return notFound();
  // Celebrity cases stored on the parent /case-studies index, filtered here
  const allCases = (getPage("/case-studies")?.data.cases as CaseEntry[] | undefined) ?? [];
  const celebrity = allCases.filter((c) => c.celebrity);
  return (
    <>
      <PageHero
        eyebrow="Portfolio · Celebrity"
        title={page.h1 || page.title}
        lede={page.description}
      />
      <CaseStudyGrid cases={celebrity.length ? celebrity : allCases.slice(0, 2)} title="Celebrity transformations" surface="white" />
      <CtaRail />
    </>
  );
}
