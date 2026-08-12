import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "Winchester Therapy Services LLC - Michael Ellis, LCSW",
  description: "Renew Your Mind, Heal Your Soul. Professional therapy services in Winchester, VA with Michael Ellis, LCSW. Specializing in anxiety, depression, trauma, and relationship issues.",
  metadataBase: new URL('https://www.winchestertherapyservices.org'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Winchester Therapy Services LLC - Michael Ellis, LCSW",
    description: "Renew Your Mind, Heal Your Soul. Professional therapy services in Winchester, VA with Michael Ellis, LCSW.",
    url: '/',
    siteName: 'Winchester Therapy Services',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Winchester Therapy Services LLC - Michael Ellis, LCSW",
    description: "Renew Your Mind, Heal Your Soul. Professional therapy services in Winchester, VA with Michael Ellis, LCSW.",
  },
};

export const viewport: Viewport = {
  themeColor: '#6b5b73',
};

// Rendered facts only (name, address, phone, email all appear in the contact
// section) — no invented ratings or reviews.
const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  name: 'Winchester Therapy Services LLC',
  url: 'https://www.winchestertherapyservices.org',
  telephone: '+15404317376',
  email: 'Michaelfellislcsw@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1220 Amherst Street, Floor 2',
    addressLocality: 'Winchester',
    addressRegion: 'VA',
    postalCode: '22601',
    addressCountry: 'US',
  },
  founder: {
    '@type': 'Person',
    name: 'Michael Ellis',
    honorificSuffix: 'LCSW',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
      </head>
      <body className={`${inter.variable} font-sans`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
