import type { Metadata, Viewport } from "next";
import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import BackgroundBlobScene from '@/components/Blobs';

export const metadata: Metadata = {
  title: "CATS Registration",
  description: "Cardano Africa Tech Summit Registration",
  openGraph: {
    type: "website",
    title: "CATS Registration",
    description: "Join the Wada movement - register now for access to the upcoming Cardano Africa Tech Summit!",
    images: [
      {
        url: "https://cats.wada.org/sm_banner.png",
        width: 1504,
        height: 787,
        alt: "CATS Registration Preview",
      },
    ],
    url: "https://cats.wada.org",
    siteName: "CATS Wada", // Added for better branding
  },
  twitter: {
    card: "summary_large_image",
    title: "CATS Registration",
    description: "Cardano Africa Tech Summit Registration",
    images: ["https://cats.wada.org/sm_banner.png"],
    creator: "@wada_org", // Optional: add if you have one
  },
  // Additional metadata for better SEO
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
        <link rel="icon" href="/favicon.ico" sizes="64x64" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="relative">
        <Navbar />
        <div className="absolute inset-0 w-full overflow-hidden">
           <BackgroundBlobScene />
        </div>
        {children}
        <SpeedInsights/>
        <Analytics />
      </body>
    </html>
  );
}
