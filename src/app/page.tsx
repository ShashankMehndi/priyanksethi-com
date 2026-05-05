import { getPage } from "@/lib/content-loader";
import { buildMetadata } from "@/lib/seo";
import { DoctorHero } from "@/components/sections/DoctorHero";
import { GlobalReachStat } from "@/components/sections/GlobalReachStat";
import { CaseStudyGrid, type CaseEntry } from "@/components/sections/CaseStudyGrid";
import { ReviewsWall, type Review } from "@/components/sections/ReviewsWall";
import { VideoTestimonialsGrid, type VideoEntry } from "@/components/sections/VideoTestimonialsGrid";
import { PressStrip, type PressItem } from "@/components/sections/PressStrip";
import { CtaRail } from "@/components/sections/CtaRail";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { PersonSchema } from "@/components/seo/PersonSchema";

export const metadata = buildMetadata({
  title: "Dr. Priyank Sethi — Implant & Cosmetic Dentist · Founder, Stunning Dentistry",
  description:
    "BDS · MDS · Ph.D. (Faculty of Dental Sciences). Founder of Stunning Dentistry. Over 1,000 patients treated across 30+ countries.",
  path: "/",
});

export default function HomePage() {
  const home = getPage("/");
  const cases = getPage("/case-studies");
  const reviewsPage = getPage("/testimonials/written");
  const videoPage = getPage("/testimonials/video");
  const pressPage = getPage("/press");

  const credentials = parseHomeCredentials(home?.body ?? "");
  const caseList = (cases?.data.cases as CaseEntry[] | undefined)?.slice(0, 6) ?? [];
  const reviews = (reviewsPage?.data.reviews as Review[] | undefined) ?? [];
  const videos = (videoPage?.data.videos as VideoEntry[] | undefined) ?? [];
  const pressItems = derivePressItems(pressPage?.body ?? "");

  return (
    <>
      <DoctorHero credentials={credentials} />
      <PersonSchema />

      <Section surface="white">
        <Container size="md">
          <SectionHeader
            eyebrow="At a glance"
            title="A clinician built for complex cases"
            lede="Two decades treating implant and full-mouth cases other practices have declined. International patients fly in for compressed-timeline care delivered by one operator from plan to outcome."
          />
          <div className="flex flex-wrap gap-3">
            <Button href="/about" variant="primary">Read the bio</Button>
            <Button href="/credentials" variant="ghost">Credentials</Button>
            <Button href="/awards" variant="ghost">Awards</Button>
          </div>
        </Container>
      </Section>

      <GlobalReachStat />

      {caseList.length > 0 && (
        <CaseStudyGrid
          eyebrow="Selected work"
          title="Case studies"
          lede="A portfolio of notable cases — cosmetic, implant, and full-mouth rehabilitation."
          cases={caseList}
        />
      )}

      {pressItems.length > 0 && (
        <PressStrip items={pressItems.slice(0, 5)} title="Featured in the press" />
      )}

      {videos.length > 0 && (
        <VideoTestimonialsGrid
          videos={videos}
          title="International patients on camera"
          surface="warm"
        />
      )}

      {reviews.length > 0 && (
        <ReviewsWall
          reviews={reviews}
          title="What patients say"
          lede={`${reviews.filter((r) => r.quote).length} verified Google reviews — read in full on the testimonials page.`}
          limit={6}
        />
      )}

      <CtaRail />
    </>
  );
}

function parseHomeCredentials(body: string): string[] {
  const lines = body.split("\n");
  const out: string[] = [];
  let inList = false;
  for (const l of lines) {
    if (/^##\s+At a glance/.test(l)) {
      inList = true;
      continue;
    }
    if (!inList) continue;
    if (/^##\s+/.test(l)) break;
    const m = l.match(/^[-*]\s+(.+)/);
    if (m) out.push(m[1].trim());
  }
  return out;
}

function derivePressItems(body: string): PressItem[] {
  // Matches lines like:  ![Press feature 1](/images/press/press01.jpg)
  const out: PressItem[] = [];
  const re = /!\[([^\]]+)\]\((\/images\/press\/[^)]+)\)/g;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(body))) {
    i++;
    out.push({ slug: `feature-${String(i).padStart(2, "0")}`, image: m[2], headline: m[1] });
  }
  return out;
}
