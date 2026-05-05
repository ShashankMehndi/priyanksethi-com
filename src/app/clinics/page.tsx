import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { getPage } from "@/lib/content-loader";
import { DOCTOR } from "@/config/doctor";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ClinicCard } from "@/components/sections/ClinicCard";
import { CtaRail } from "@/components/sections/CtaRail";

const URL = "/clinics";

export function generateMetadata() {
  const p = getPage(URL);
  return buildMetadata({ title: p?.title, description: p?.description, path: URL });
}

export default function Page() {
  const page = getPage(URL);
  if (!page) return notFound();
  return (
    <>
      <PageHero eyebrow="Visit" title={page.h1 || page.title} lede={page.description} />
      <Section surface="white">
        <Container size="lg">
          <SectionHeader title="Two Stunning Dentistry locations in Delhi" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {DOCTOR.clinics.map((c) => (
              <ClinicCard
                key={c.slug}
                slug={c.slug}
                title={c.name}
                region={c.region}
                address={c.address}
                surface="warm"
              />
            ))}
          </div>
          <p className="mt-12 max-w-2xl text-sm text-brand-ink-soft">
            For appointment booking, the wider team and current treatment information,
            visit{" "}
            <a
              href={DOCTOR.brand.parentBrand.url}
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio-link font-semibold"
            >
              {DOCTOR.brand.parentBrand.name}
            </a>
            .
          </p>
        </Container>
      </Section>
      <CtaRail />
    </>
  );
}
