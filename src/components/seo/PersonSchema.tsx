import { DOCTOR } from "@/config/doctor";

/**
 * JSON-LD `Person` + `Dentist` schema for Dr. Priyank Sethi.
 * Renders a script tag — drop on the homepage and /about.
 */
export function PersonSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": ["Person", "Dentist"],
    name: DOCTOR.name,
    url: DOCTOR.brand.siteUrl,
    image: DOCTOR.brand.siteUrl + DOCTOR.brand.ogImage,
    jobTitle: "Implant & Cosmetic Dentist",
    description: DOCTOR.tagline,
    telephone: DOCTOR.contact.phone,
    email: DOCTOR.contact.email,
    sameAs: Object.values(DOCTOR.social).filter(Boolean) as string[],
    hasCredential: [
      "Bachelor of Dental Surgery (BDS)",
      "Master of Dental Surgery (MDS) — Conservative Dentistry & Micro-Endodontics",
      "Ph.D. (Faculty of Dental Sciences)",
      "Internationally Certified Digital Smile Designer",
    ],
    memberOf: [
      "American Academy of Implant Dentistry",
      "American Academy of Cosmetic Dentistry",
    ],
    worksFor: {
      "@type": "Organization",
      name: DOCTOR.brand.parentBrand.name,
      url: DOCTOR.brand.parentBrand.url,
    },
    workLocation: DOCTOR.clinics.map((c) => ({
      "@type": "DentalClinic",
      name: c.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: c.address,
        addressLocality: "New Delhi",
        addressRegion: "DL",
        postalCode: c.postalCode,
        addressCountry: "IN",
      },
      telephone: DOCTOR.contact.phone,
      openingHours: "Mo-Sa 09:00-21:00",
    })),
  };
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
