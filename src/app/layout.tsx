import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";

import { DOCTOR } from "@/config/doctor";
import { AnnouncementTicker } from "@/components/layout/AnnouncementTicker";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomBar } from "@/components/layout/MobileBottomBar";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(DOCTOR.brand.siteUrl),
  title: {
    default: `${DOCTOR.name} - Implant & Cosmetic Dentist`,
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
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-white font-body text-brand-ink antialiased pb-[calc(2.75rem+2.5rem+env(safe-area-inset-bottom,0px))] md:pb-0">
        <AnnouncementTicker />
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileBottomBar />

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
