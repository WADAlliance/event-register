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
    name: "Preston Odep",
    role: "Designer @ Lido Nation",
    image: "/preston_img.png",
    imageClass: "",
  },
  {
    name: "Richmond Opong",
    role: "Designer @ Wada",
    image: "/richmond_img.png",
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
                  <p className="flex-1 font-poppins font-normal text-black text-sm sm:text-base text-center leading-6 sm:leading-7">
                    Discover visionary leaders, developers, and ecosystem pioneers driving Cardano adoption across Africa.
                  </p>
                </div>
              </div>
            </header>

            {/* Speakers Grid - Desktop: 2 rows of 4, Mobile: Single column */}
            <div className="w-full relative">
              {/* First Row */}
              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-[39px] mb-6 lg:mb-[39px]">
                {speakers.slice(0, 4).map((speaker, index) => (
                  <div
                    key={`speaker-row1-${index}`}
                    className="flex flex-col items-start gap-2.5"
                  >
                    <div className="w-full">
                      <Image
                        className={`w-full aspect-square object-cover ${speaker.imageClass}`}
                        alt={speaker.name}
                        src={speaker.image}
                        width={400}
                        height={400}
                      />
                    </div>

                    <div className="flex flex-col items-start gap-[5px] w-full">
                      <h2 className="font-telegraf font-bold text-black text-lg sm:text-xl lg:text-2xl leading-tight">
                        {speaker.name}
                      </h2>
                      <p className="font-poppins font-normal text-black text-sm sm:text-base leading-6 sm:leading-7">
                        {speaker.role}
                      </p>
                    </div>
                  </div>
                ))}
              </section>

              {/* Second Row */}
              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-[39px]">
                {speakers.slice(4, 8).map((speaker, index) => (
                  <div
                    key={`speaker-row2-${index}`}
                    className="flex flex-col items-start gap-2.5"
                  >
                    <div className="w-full">
                      <Image
                        className={`w-full aspect-square object-cover ${speaker.imageClass}`}
                        alt={speaker.name}
                        src={speaker.image}
                        width={400}
                        height={400}
                      />
                    </div>

                    <div className="flex flex-col items-start gap-[5px] w-full">
                      <h2 className="font-telegraf font-bold text-black text-lg sm:text-xl lg:text-2xl leading-tight">
                        {speaker.name}
                      </h2>
                      <p className="font-poppins font-normal text-black text-sm sm:text-base leading-6 sm:leading-7">
                        {speaker.role}
                      </p>
                    </div>
                  </div>
                ))}
              </section>
              
              <div className="absolute -inset-2 sm:inset-4 lg:-inset-8 backdrop-blur-xl bg-white/40 flex items-center justify-center z-10 rounded-lg">
                <h2 className="font-telegraf font-extrabold text-wada-c text-4xl sm:text-5xl lg:text-6xl">
                  Coming Soon
                </h2>
              </div>
            </div>

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
