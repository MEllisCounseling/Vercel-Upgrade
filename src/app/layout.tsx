import type { Metadata, Viewport } from "next";
import { Crimson_Pro, Albert_Sans } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const crimson = Crimson_Pro({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-crimson",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const albert = Albert_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-albert",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Winchester Therapy Services LLC | Michael Ellis, LCSW",
  description:
    "Renew Your Mind, Heal Your Soul. Individual therapy in Winchester, VA with Michael Ellis, LCSW, in person or by telehealth. Free 15-minute consultation.",
  metadataBase: new URL("https://www.winchestertherapyservices.org"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Winchester Therapy Services LLC | Michael Ellis, LCSW",
    description:
      "Renew Your Mind, Heal Your Soul. Individual therapy in Winchester, VA with Michael Ellis, LCSW. Free 15-minute consultation.",
    url: "/",
    siteName: "Winchester Therapy Services",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Winchester Therapy Services LLC | Michael Ellis, LCSW",
    description:
      "Renew Your Mind, Heal Your Soul. Individual therapy in Winchester, VA with Michael Ellis, LCSW. Free 15-minute consultation.",
  },
};

export const viewport: Viewport = {
  themeColor: "#3e3346",
};

// Rendered facts only (name, address, phone, email all appear in the contact
// section). No invented ratings or reviews.
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "Winchester Therapy Services LLC",
  url: "https://www.winchestertherapyservices.org",
  telephone: "+15404317376",
  email: "Michaelfellislcsw@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1220 Amherst Street, Floor 2",
    addressLocality: "Winchester",
    addressRegion: "VA",
    postalCode: "22601",
    addressCountry: "US",
  },
  founder: {
    "@type": "Person",
    name: "Michael Ellis",
    honorificSuffix: "LCSW",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${crimson.variable} ${albert.variable}`}>
      <head>
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
      </head>
      <body className="font-sans">
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
