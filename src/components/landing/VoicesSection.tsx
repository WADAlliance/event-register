"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { speakers } from "@/constants/speakers";

export default function VoicesSection() {
    // Use the first 8 speakers for the landing page grid
    const featuredSpeakers = speakers.slice(0, 8);

    return (
        <section id="speakers" className="relative w-full bg-white py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header - Matching LocationSection style */}
                <div className="mb-16">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-[#ff4b26] font-bold text-lg md:text-xl uppercase tracking-wider">— Where It Happened</span>
                    </div>

                    <h2 className="text-black text-[56px] md:text-[84px] font-black leading-[0.95] tracking-tight mb-8" style={{ fontFamily: '"PP Telegraf", "Telegraf", sans-serif' }}>
                        The Voices of CATS 2026
                    </h2>

                    <p className="text-black text-xl md:text-2xl font-normal max-w-4xl leading-snug">
                        From Cardano Foundation leadership to Africa&apos;s most dynamic founders and policymakers, these were the voices that defined CATS 2026.
                    </p>
                </div>

                {/* Speakers Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mb-20">
                    {featuredSpeakers.map((speaker, index) => (
                        <div key={index} className="relative group flex flex-col items-center">
                            {/* Image Container */}
                            <div className="h-[462px] w-full overflow-hidden rounded-md relative mx-auto group-hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2">
                                <Image
                                    src={speaker.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(speaker.name)}&background=random`}
                                    alt={speaker.name}
                                    fill
                                    unoptimized
                                    className={`object-cover transition-transform duration-700 group-hover:scale-110 ${speaker.imageClass}`}
                                    sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                                    quality={90}
                                    style={{ transform: 'rotate(0deg)', opacity: 1 }}
                                />

                                {/* Decorative Info Box */}
                                <div className="absolute inset-x-4 bottom-4 flex justify-center z-30 pointer-events-none">
                                    <div className="relative w-full max-w-[320px] px-2 pointer-events-auto">
                                        {/* Decorative Patterns on sides */}
                                        <div className="absolute left-0 top-0 bottom-0 w-6 bg-[url('/CATS-Pattern.jpg')] bg-cover bg-center opacity-100" />
                                        <div className="absolute right-0 top-0 bottom-0 w-6 bg-[url('/CATS-Pattern.jpg')] bg-cover bg-center opacity-100" />

                                        <div className="w-full bg-white shadow-md rounded-sm flex flex-col items-center justify-center py-3 px-4">
                                            <h3 className="text-black font-black text-sm sm:text-base text-center uppercase tracking-tighter leading-tight" style={{ fontFamily: '"PP Telegraf", "Telegraf", sans-serif' }}>
                                                {speaker.name}
                                            </h3>
                                            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-1 text-center w-full px-2">
                                                {speaker.role}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="flex justify-center mt-8">
                    <Link
                        href="/speakers"
                        className="group relative inline-flex items-center justify-center gap-3 md:gap-4 bg-[#ff4b26] text-white px-6 md:px-10 py-4 md:py-5 rounded-full font-black text-sm md:text-lg uppercase tracking-widest hover:bg-black transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 active:scale-95 whitespace-nowrap"
                    >
                        <span>View All Speakers</span>
                        <svg
                            className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-2 shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
