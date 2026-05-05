import type { MetadataRoute } from "next";
import { DOCTOR } from "@/config/doctor";
import { getAllPages } from "@/lib/content-loader";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = DOCTOR.brand.siteUrl;
  const now = new Date();
  return getAllPages().map((p) => ({
    url: base + (p.url === "/" ? "" : p.url),
    lastModified: now,
    changeFrequency: p.url === "/" ? ("daily" as const) : ("monthly" as const),
    priority: p.url === "/" ? 1.0 : p.url.split("/").length > 2 ? 0.5 : 0.8,
  }));
}
