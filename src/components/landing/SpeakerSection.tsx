"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { speakers, Speaker } from "@/constants/speakers";

export default function SpeakerSection() {

  return (
    <div className="w-full bg-white relative">
      <div className="flex flex-col lg:flex-row w-full">

        <div className="flex-1 flex flex-col items-center px-4 sm:px-6 lg:px-10 py-8 lg:py-[50px] border-r-0 lg:border-r-2 border-dashed border-gray-300">
          <div className="flex flex-col items-center gap-6 lg:gap-[39px] w-full max-w-6xl">

            <header className="flex flex-col items-center gap-2.5 w-full">
              <div className="inline-flex items-start flex-wrap justify-center">
                <div className="inline-flex items-center justify-center gap-2.5 px-2.5 py-[5px]">
                  <h1 className="w-fit text-black text-center whitespace-nowrap tracking-normal" style={{
                    fontFamily: 'PP Telegraf',
                    fontWeight: 800,
                    fontSize: '70px',
                    lineHeight: '53px',
                    letterSpacing: '0%'
                  }}>
                    Summit
                  </h1>
                </div>

                <div className="inline-flex items-center justify-center bg-cardano-c gap-2.5 px-[15px] py-[5px]">
                  <h1 className="w-fit text-white text-center whitespace-nowrap tracking-normal" style={{
                    fontFamily: 'PP Telegraf',
                    fontWeight: 800,
                    fontSize: '70px',
                    lineHeight: '53px',
                    letterSpacing: '0%'
                  }}>
                    Speakers
                  </h1>
                </div>
              </div>
            </header>

            <div className="w-full relative">
              <section aria-label="Speakers first row" className="flex flex-wrap justify-start gap-2.5 mb-6 lg:mb-5 w-full lg:w-[1101px] mx-auto">
                {speakers.map((speaker, index) => (
                  <div
                    key={`speaker-row1-${index}`}
                    className="flex flex-col items-start gap-4 relative w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.625rem)]"
                  >
                    <div className="w-full">
                      <div className="h-[462px] overflow-hidden rounded-md relative mx-auto">
                        <Image
                          className={`object-cover rounded-md ${speaker.imageClass}`}
                          alt={speaker.name}
                          src={speaker.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(speaker.name)}&background=random`}
                          fill
                          unoptimized
                          sizes="(min-width:1024px) 260px, (min-width:640px) 50vw, 100vw"
                          quality={90}
                          style={{ transform: 'rotate(0deg)', opacity: 1 }}
                        />
                        <div className="absolute inset-x-4 bottom-4 flex justify-center z-30 pointer-events-none">
                          <div className="relative w-[260px] sm:w-[300px] md:w-[320px] px-2 pointer-events-auto">
                            <div className="absolute left-0 top-0 bottom-0 w-6 bg-[url('/CATS-Pattern.jpg')] bg-cover bg-center opacity-100" />
                            <div className="absolute right-0 top-0 bottom-0 w-6 bg-[url('/CATS-Pattern.jpg')] bg-cover bg-center opacity-100" />
                            <div className="w-full bg-white shadow-md rounded-sm flex flex-col items-center justify-center py-3 px-4 overflow-hidden">
                              <h3 className="text-black text-sm sm:text-base text-center wrap-break-word w-full">{speaker.name}</h3>
                              <p className="text-black text-sm sm:text-base text-center mt-1 wrap-break-word w-full">{speaker.role}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </section>
            </div>



            <div className="flex items-center justify-center w-full mt-4 relative z-20">
              <Link
                href="/#speakers"
                className="inline-flex bg-cardano-c items-center gap-2.5 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-md transition-colors hover:bg-cardano-c/90 cursor-pointer"
              >
                <span className="text-white text-base sm:text-lg lg:text-xl tracking-[-0.20px] leading-tight whitespace-nowrap">
                  Back
                </span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
