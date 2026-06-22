"use client"

import React, { useState } from "react";
import Image from "next/image";
import EventCard from "./EventCard";

export default function HeroSection() {
  return (
    <div
      className="
                relative flex flex-col items-center justify-center
                px-6
                pt-6 md:pt-10
                pb-[100px] md:pb-[140px]
                text-center w-full
                bg-black
                overflow-hidden
            "
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/banner.jpg"
          alt="Background"
          fill
          priority
          className="object-fill opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
      </div>

      <div className="relative z-10 max-w-5xl flex flex-col items-center">
        {/* Concluded Badge */}
        <div className="mb-8 px-5 py-2 rounded-full border border-orange-500/50 bg-orange-500/5 flex items-center gap-2">
          <span className="text-orange-500 text-sm font-medium tracking-tight">
            February 11–13, 2026 · Nairobi, Kenya · <span className="inline-flex items-center">✓</span> Concluded
          </span>
        </div>

        {/* Heading */}
        <h1 className="mb-6 text-white text-[56px] leading-[1.1] md:text-[100px] md:leading-[0.9] font-telegraf tracking-tighter">
          Thank You, <br />
          <span className="text-[#7FB843]">Nairobi.</span>
        </h1>

        {/* Event Card */}
        <div className="mb-6 md:mb-12 w-full flex justify-center">
          <EventCard />
        </div>

        {/* Sub-description */}
        <p className="mx-auto mt-0 md:mt-2 mb-8 text-base md:text-xl font-normal max-w-2xl leading-relaxed text-gray-300">
          The Cardano Africa Tech Summit 2026 made history. 800+ minds, 45 speakers, 12 countries, three extraordinary days that proved Africa&apos;s blockchain future is already here.
        </p>

        {/* Action Button */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row mt-2">
          <a
            href="https://www.youtube.com/watch?v=gDpQvSGeEZg&t=135s"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-[12px] px-10 py-4 bg-[#ff4b26] hover:bg-[#ff4b26]/90 text-white font-telegraf font-extrabold text-lg transition shadow-[0_5px_15px_rgba(255,75,38,0.4)]"
          >
            View Summit Recap
          </a>
        </div>
      </div>
    </div>
  );
}
