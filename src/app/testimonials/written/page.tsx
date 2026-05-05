import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { getPage } from "@/lib/content-loader";
import { PageHero } from "@/components/layout/PageHero";
import { ReviewsWall, type Review } from "@/components/sections/ReviewsWall";
import { CtaRail } from "@/components/sections/CtaRail";

const URL = "/testimonials/written";

export function generateMetadata() {
  const p = getPage(URL);
  return buildMetadata({ title: p?.title, description: p?.description, path: URL });
}

export default function Page() {
  const page = getPage(URL);
  if (!page) return notFound();
  const reviews = (page.data.reviews as Review[] | undefined) ?? [];
  return (
    <>
      <PageHero eyebrow="Testimonials · Written" title={page.h1 || page.title} lede={page.description} />
      <ReviewsWall reviews={reviews} title="Verified Google reviews" surface="white" />
      <CtaRail />
    </>
  );
}
