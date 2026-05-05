import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { getPage, getPagesByPrefix } from "@/lib/content-loader";
import { PageHero } from "@/components/layout/PageHero";
import { PressStrip, type PressItem } from "@/components/sections/PressStrip";
import { CtaRail } from "@/components/sections/CtaRail";

const URL = "/press";

export function generateMetadata() {
  const p = getPage(URL);
  return buildMetadata({ title: p?.title, description: p?.description, path: URL });
}

export default function Page() {
  const page = getPage(URL);
  if (!page) return notFound();

  const items: PressItem[] = getPagesByPrefix("/press")
    .filter((p) => p.url !== "/press")
    .map((p) => ({
      slug: p.url.split("/").pop() ?? "",
      image: (p.data.ogImage as string) ?? "",
      publication: (p.data.publication as string) || undefined,
      date: (p.data.date as string) || undefined,
      headline: (p.data.headline as string) || undefined,
    }))
    .filter((i) => i.image && i.slug);

  return (
    <>
      <PageHero eyebrow="Recognition" title={page.h1 || page.title} lede={page.description} />
      <PressStrip items={items} title="Selected coverage" surface="white" />
      <CtaRail />
    </>
  );
}
