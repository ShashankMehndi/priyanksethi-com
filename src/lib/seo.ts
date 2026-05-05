import type { Metadata } from "next";
import { DOCTOR } from "@/config/doctor";

const BASE = DOCTOR.brand.siteUrl;

export type PageSeo = {
  title?: string;
  description?: string;
  path: string;
  ogImage?: string;
  noindex?: boolean;
};

export function buildMetadata(input: PageSeo): Metadata {
  const url = absolute(input.path);
  const title = input.title ? `${input.title}` : DOCTOR.brand.siteName;
  const description = input.description ?? DOCTOR.tagline;
  const ogImage = absolute(input.ogImage ?? DOCTOR.brand.ogImage);
  return {
    // Opt out of the layout's "%s | Dr. Priyank Sethi" template — page
    // titles already include the doctor name when appropriate.
    title: { absolute: title },
    description,
    metadataBase: new URL(BASE),
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: DOCTOR.brand.siteName,
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: input.noindex
      ? { index: false, follow: true }
      : { index: true, follow: true },
  };
}

export function absolute(path: string): string {
  if (!path) return BASE;
  if (path.startsWith("http")) return path;
  return BASE + (path.startsWith("/") ? path : `/${path}`);
}
