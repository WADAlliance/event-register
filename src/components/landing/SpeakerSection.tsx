"use client";

import React, { useState } from "react";
import Image from "next/image";
import TalkSubmissionModal from "@/components/TalkSubmissionModal";

interface Speaker {
  name: string;
  role: string;
  image: string;
  imageClass: string;
}

const baseSpeakers: Speaker[] = [
  {
    name: "Emilian Popa",
    role: "Health-tech entrepreneur",
    image: "/Emilian-Popa.jpg",
    imageClass: "",
  },
  {
    name: "MERCY",
    role: " co-founder and Partnerships Lead at Wada Global",
    image: "/Mercy.jpg",
    imageClass: "rounded-[5px] object-cover",
  },
];

const speakers: Speaker[] = Array.from({ length: 8 }, (_, i) => baseSpeakers[i % 2]);

export default function SpeakerSection () {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full bg-white relative">
      {/* Main Container */}
      <div className="flex flex-col lg:flex-row w-full">
        
        {/* Left Column - Summit Speakers Section */}
        <div className="flex-1 flex flex-col items-center px-4 sm:px-6 lg:px-10 py-8 lg:py-[50px] border-r-0 lg:border-r-2 border-dashed border-gray-300">
          <div className="flex flex-col items-center gap-6 lg:gap-[39px] w-full max-w-6xl">
            
            {/* Header */}
            <header className="flex flex-col items-center gap-2.5 w-full">
              <div className="inline-flex items-start flex-wrap justify-center">
                <div className="inline-flex items-center justify-center gap-2.5 px-2.5 py-[5px]">
                  <h1 className="w-fit font-telegraf font-bold text-black text-2xl sm:text-3xl lg:text-4xl text-center leading-tight whitespace-nowrap">
                    Summit
                  </h1>
                </div>

                <div className="inline-flex items-center justify-center bg-cardano-c gap-2.5 px-2.5 py-[5px] bg-cardano-c">
                  <h1 className="w-fit font-telegraf font-bold  text-white text-2xl sm:text-3xl lg:text-4xl text-center leading-tight whitespace-nowrap">
                    Speakers
                  </h1>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2.5 w-full">
                <div className="flex w-full max-w-[566px] items-center justify-center gap-2.5 px-2.5 py-0">
                  <p className="flex-1 font-poppins font-[400] text-[16px] text-black text-center leading-[28px] tracking-[0em]">
                    Discover visionary leaders, developers, and ecosystem pioneers driving Cardano adoption across Africa.
                  </p>
                </div>
              </div>
            </header>

            {/* Speakers Grid - Desktop: 2 rows of 4, Mobile: Single column */}
            <div className="w-full relative">
              {/* First Row */}
              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[30px] mb-6 lg:mb-[39px] w-full lg:w-[1101px] mx-auto">
                {speakers.slice(3, 5).map((speaker, index) => (
                  <div
                    key={`speaker-row2-${index}`}
                    className="flex flex-col items-start gap-2.5 relative"
                  >
                    <div className="w-full pt-[11px] pb-[11px]">
                      <div className="w-full h-[462px] overflow-hidden rounded-md relative">
                        <Image
                          className={`w-full h-full object-cover rounded-md ${speaker.imageClass}`}
                          alt={speaker.name}
                          src={speaker.image}
                          fill
                          sizes="(max-width: 1024px) 100vw, 347px"
                          quality={80}
                        />
                        <div className="absolute left-4 right-4 bottom-1 flex justify-center pointer-events-none">
                          <div className="relative w-[260px] sm:w-[300px] md:w-[320px] px-2 pointer-events-auto">
                            <div className="absolute left-0 top-0 bottom-0 w-[24px] bg-[url('/CATS-Pattern.jpg')] bg-cover bg-center opacity-100" />
                            <div className="absolute right-0 top-0 bottom-0 w-[24px] bg-[url('/CATS-Pattern.jpg')] bg-cover bg-center opacity-100" />
                            <div className="w-full bg-white shadow-md rounded-sm flex flex-col items-center justify-center z-20 py-3 px-4 overflow-hidden">
                              <h3 className="font-telegraf font-bold text-black text-sm sm:text-base text-center break-words w-full">{speaker.name}</h3>
                              <p className="font-poppins text-black text-sm sm:text-base text-center mt-1 break-words w-full">{speaker.role}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </section>

              
              
            </div>

            {/* Sponsors removed from here — moved to a standalone component */}

            {/* Submit Button */}
            <div className="flex items-center justify-center w-full mt-4 relative z-20">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="inline-flex bg-cardano-c items-center gap-2.5 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 bg-cardano-c rounded-md transition-colors hover:bg-cardano-c/90 cursor-pointer"
              >
                <span className="font-telegraf font-bold text-white text-base sm:text-lg lg:text-xl tracking-[-0.20px] leading-tight whitespace-nowrap">
                  Submit a Talk
                </span>
              </button>
            </div>
          </div>
        </div>

      </div>

      <TalkSubmissionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};
