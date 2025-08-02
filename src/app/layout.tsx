import type { Metadata, Viewport } from "next";
import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  title: "Wada Registration",
  description: "Register for Wada",
  openGraph: {
    type: "website",
    title: "Wada Registration",
    description: "Join the Wada movement - register now for access to the upcoming MeTTa Hackathon, hosted in Nairobi",
    images: [
      {
        url: "https://register.wada.org/sm_banner.png",
        width: 1504,
        height: 787,
        alt: "Wada Registration Preview",
      },
    ],
    url: "https://register.wada.org",
    siteName: "Wada", // Added for better branding
  },
  twitter: {
    card: "summary_large_image",
    title: "Wada Registration",
    description: "Register for Wada",
    images: ["https://register.wada.org/sm_banner.png"],
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
  children,
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
      <Navbar />
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
