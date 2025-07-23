import type { Metadata } from "next";
import { Space_Grotesk } from 'next/font/google';
import "../styles/globals.css";
import Navbar from "@/components/Navbar";

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Wada Registration",
  description: "Register for Wada",
  openGraph: {
    type: "website",
    title: "Wada Registration",
    description: "Register for Wada",
    images: [
      {
        url: "https://www.wada.org/sm_banner.png",
        width: 1504,
        height: 787,
        alt: "Wada Registration Preview",
      },
    ],
    url: "https://www.wada.org",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wada Registration",
    description: "Register for Wada",
    images: ["https://www.wada.org/sm_banner.png"],
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
        <link rel="icon" href="/favicon.ico" sizes="64x64" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <Navbar />
      <body className={`${spaceGrotesk.className}`}>
        {children}
      </body>
    </html>
  );
}
