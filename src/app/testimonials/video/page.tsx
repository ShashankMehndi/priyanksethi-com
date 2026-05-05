import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { getPage } from "@/lib/content-loader";
import { PageHero } from "@/components/layout/PageHero";
import { VideoTestimonialsGrid, type VideoEntry } from "@/components/sections/VideoTestimonialsGrid";
import { CtaRail } from "@/components/sections/CtaRail";

const URL = "/testimonials/video";

export function generateMetadata() {
  const p = getPage(URL);
  return buildMetadata({ title: p?.title, description: p?.description, path: URL });
}

export default function Page() {
  const page = getPage(URL);
  if (!page) return notFound();
  const videos = (page.data.videos as VideoEntry[] | undefined) ?? [];
  return (
    <>
      <PageHero eyebrow="Testimonials · Video" title={page.h1 || page.title} lede={page.description} />
      <VideoTestimonialsGrid videos={videos} title="International patients on camera" surface="white" />
      <CtaRail />
    </>
  );
}
