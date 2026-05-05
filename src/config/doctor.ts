/**
 * Single source of truth for doctor brand, contact, and stunning-dentistry link.
 * Read by every page, every section, every metadata generator. If you change
 * the phone number or open new social channels, change them here.
 */

export type DoctorConfig = {
  name: string;
  shortName: string;
  postNominals: string;
  tagline: string;
  philosophy: string;

  contact: {
    phone: string;
    phoneDisplay: string;
    whatsapp: string;
    whatsappLink: string;
    email: string;
    hours: string;
  };

  clinics: ReadonlyArray<{
    slug: string;
    name: string;
    region: string;
    address: string;
    postalCode: string;
    mapsEmbed?: string;
  }>;

  social: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    linkedin?: string;
    twitter?: string;
  };

  brand: {
    siteUrl: string;
    siteName: string;
    legalName: string;
    parentBrand: { name: string; url: string };
    ogImage: string;
    favicon: string;
    foundedYear: number;
  };

  analytics: {
    /** GA4 measurement ID (G-XXXXXXXXXX). Old site used a deprecated UA-… tag. */
    gaMeasurementId?: string;
  };

  recaptcha: {
    /** v3 site key (provision a new one - do not reuse the legacy v2 key). */
    siteKey?: string;
  };
};

export const DOCTOR: DoctorConfig = {
  name: "Dr. Priyank Sethi",
  shortName: "Dr. Sethi",
  postNominals: "BDS · MDS · Ph.D. (Faculty of Dental Sciences)",
  tagline: "Implant and cosmetic dentist · Founder, Stunning Dentistry",
  philosophy: "No-Compromise Dentistry",

  contact: {
    phone: "+917676602626",
    phoneDisplay: "+91 76766 02626",
    whatsapp: "917676602626",
    whatsappLink: "https://api.whatsapp.com/send?phone=917676602626",
    email: "enquiry@stunningdentistry.com",
    hours: "Mon–Sat, 9:00 AM – 9:00 PM",
  },

  clinics: [
    {
      slug: "kailash-colony",
      name: "Kailash Colony - South Delhi",
      region: "South Delhi",
      address: "A-3, 1st Floor, Kailash Colony, Greater Kailash, New Delhi",
      postalCode: "110048",
    },
    {
      slug: "netaji-subhash-place",
      name: "Netaji Subhash Place - North Delhi",
      region: "North Delhi",
      address: "5th Floor, HB Twin Tower 1, Netaji Subhash Place, New Delhi",
      postalCode: "110034",
    },
  ],

  social: {
    facebook: "https://www.facebook.com/StunningDentistry/",
    instagram: "https://www.instagram.com/stunningdentistryofficial/",
    youtube: "https://www.youtube.com/channel/UCdsSmKINeBQfZh81E-arJew",
    linkedin: "https://www.linkedin.com/company/stunning-dentistry/",
    twitter: "https://twitter.com/stunningdentist/",
  },

  brand: {
    siteUrl: "https://priyanksethi.com",
    siteName: "Dr. Priyank Sethi",
    legalName: "Dr. Priyank Sethi",
    parentBrand: {
      name: "Stunning Dentistry",
      url: "https://stunningdentistry.com",
    },
    ogImage: "/og.png",
    favicon: "/favicon.ico",
    foundedYear: 2024, // year of this rebuild; doctor practice founding year may differ
  },

  analytics: {
    gaMeasurementId: process.env.NEXT_PUBLIC_GA_ID,
  },

  recaptcha: {
    siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
  },
};
