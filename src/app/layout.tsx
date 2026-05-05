import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";

import { DOCTOR } from "@/config/doctor";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(DOCTOR.brand.siteUrl),
  title: {
    default: `${DOCTOR.name} — Implant & Cosmetic Dentist`,
    template: `%s | ${DOCTOR.name}`,
  },
  description: DOCTOR.tagline,
  alternates: { canonical: DOCTOR.brand.siteUrl },
  openGraph: {
    type: "website",
    siteName: DOCTOR.brand.siteName,
  },
  icons: { icon: DOCTOR.brand.favicon },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const ga = DOCTOR.analytics.gaMeasurementId;
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-white font-body text-brand-ink antialiased">
        <Header />
        <main>{children}</main>
        <Footer />

        {ga && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${ga}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga}');`}
            </Script>
          </>
        )}
        <Analytics />
      </body>
    </html>
  );
}
