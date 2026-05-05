import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { getPage } from "@/lib/content-loader";
import { PageHero } from "@/components/layout/PageHero";
import { CaseStudyGrid, type CaseEntry } from "@/components/sections/CaseStudyGrid";
import { CtaRail } from "@/components/sections/CtaRail";

const URL = "/case-studies";

export function generateMetadata() {
  const p = getPage(URL);
  return buildMetadata({ title: p?.title, description: p?.description, path: URL });
}

export default function Page() {
  const page = getPage(URL);
  if (!page) return notFound();
  const cases = (page.data.cases as CaseEntry[] | undefined) ?? [];
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title={page.h1 || page.title}
        lede={page.description}
      />
      <CaseStudyGrid cases={cases} title="Selected cases" surface="white" />
      <CtaRail />
    </>
  );
}
