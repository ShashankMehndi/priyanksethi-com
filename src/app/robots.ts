import type { MetadataRoute } from "next";
import { DOCTOR } from "@/config/doctor";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${DOCTOR.brand.siteUrl}/sitemap.xml`,
    host: DOCTOR.brand.siteUrl,
  };
}
