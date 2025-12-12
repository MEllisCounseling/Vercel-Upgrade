import type { Metadata } from "next";
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
  metadataBase: new URL('https://winchestertherapy.com'),
  openGraph: {
    title: "Winchester Therapy Services LLC - Michael Ellis, LCSW",
    description: "Renew Your Mind, Heal Your Soul. Professional therapy services in Winchester, VA with Michael Ellis, LCSW.",
    url: 'https://winchestertherapy.com',
    siteName: 'Winchester Therapy Services',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Winchester Therapy Services LLC - Michael Ellis, LCSW",
    description: "Renew Your Mind, Heal Your Soul. Professional therapy services in Winchester, VA with Michael Ellis, LCSW.",
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
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
