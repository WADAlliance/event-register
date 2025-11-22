import type { Metadata, Viewport } from "next";
import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ConditionalBackground from '@/components/ConditionalBackground';
import Footer from "@/components/Footer";
import FAQSection from "@/components/landing/FAQ-Section";

export const metadata: Metadata = {
  title: "Cardano Africa Tech Summit",
  description: "Cardano Africa Tech Summit 2026: Feb 11 - 13",
  icons: {
    icon: "/brand_assets/CATS-Logo-Fav-White.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    title: "Cardano Africa Tech Summit",
    description: "Join the Wada movement - register now for access to the upcoming Cardano Africa Tech Summit!",
    images: [
      {
        url: "https://cats.wada.org/sm_banner_v2.png",
        width: 1504,
        height: 787,
        alt: "CATS Registration Preview",
      },
    ],
    url: "https://cats.wada.org",
    siteName: "Cardano African Tech Summit with Wada & Blockchain Centre",
  },
  twitter: {
    card: "summary_large_image",
    title: "CATS Registration",
    description: "Cardano Africa Tech Summit Registration",
    images: ["https://cats.wada.org/sm_banner_v2.png"],
    creator: "@wada_org",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="relative">
        <Navbar />
        <ConditionalBackground />
        {children}
        <FAQSection />
        <Footer />
        <SpeedInsights/>
        <Analytics />
      </body>
    </html>
  );
}
