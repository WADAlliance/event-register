"use client";

import React from "react";
import SpeakerSection from "@/components/landing/SpeakerSection";
import Link from "next/link";

export default function SpeakersPage() {
  return (
    <div className="w-full bg-white relative pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8 flex items-center">
        <Link href="/" className="text-[#ff4b26] font-bold hover:underline">
          &larr; Back to Home
        </Link>
      </div>
      <SpeakerSection />
    </div>
  );
}
