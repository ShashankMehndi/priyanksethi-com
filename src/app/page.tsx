import Link from "next/link";
import { getPage } from "@/lib/content-loader";
import { buildMetadata } from "@/lib/seo";
import { DOCTOR } from "@/config/doctor";
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
            title="The specialist — and the practice he founded"
            lede={
              <>
                <p>
                  <span className="font-semibold text-brand-ink">{DOCTOR.name}</span> ({DOCTOR.postNominals}) is an
                  implant and cosmetic dentist with two decades on complex full-mouth and implant rehabilitation —
                  including cases other practices have declined. International patients routinely travel to Delhi for
                  compressed timelines, with one operator guiding plan through outcome.
                </p>
                <p>
                  From that work he founded{" "}
                  <Link
                    href="/stunning-dentistry"
                    className="font-semibold text-brand-blue underline decoration-brand-blue/40 underline-offset-2 transition hover:decoration-brand-blue"
                  >
                    {DOCTOR.brand.parentBrand.name}
                  </Link>
                  — boutique clinics in South and North Delhi built around{" "}
                  <span className="font-semibold text-brand-ink">{DOCTOR.philosophy}</span>.
                </p>
              </>
            }
          />
          <div className="flex flex-wrap gap-2">
            <Button href="/about" variant="primary" size="sm">
              Read the bio
            </Button>
            <Button href="/stunning-dentistry" variant="ghost" size="sm">
              About Stunning Dentistry
            </Button>
            <Button href="/credentials" variant="ghost" size="sm">
              Credentials
            </Button>
            <Button href="/awards" variant="ghost" size="sm">
              Awards
            </Button>
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
