"use client";

import React, { useState } from "react";
import Image from "next/image";
import TalkSubmissionModal from "@/components/TalkSubmissionModal";

interface Speaker {
  name: string;
  role: string;
  image: string;
  imageClass: string;
  imageWidth?: number;
  imageHeight?: number;
}

const baseSpeakers: Speaker[] = [
  {
    name: "Emilian Popa",
    role: "health-tech entrepreneur and the founder of Expand Health and Expand Health AI",
    image: "/Emilian-Popa.jpg",
    imageClass: "",
  },
  {
    name: "Mercy Fordwoo",
    role: " co-founder and Partnerships Lead at Wada Global",
    image: "/Mercy.jpg",
    imageClass: "rounded-[5px] object-cover",
  },
];

const speakers: Speaker[] = Array.from({ length: 8 }, (_, i) => baseSpeakers[i % 2]);

speakers[2] = {
  name: "Darlington Wleh",
  role: "Co-Dreamer @ 2Lovelaces and Lido Nation, President of Blockchain Centre NBO",
  image: "/darlington-02.jpg",
  imageClass: "",
};

speakers[3] = {
  name: "Preston Odep",
  role: "Brand Director @ Lido Nation, 2 Lovelaces, and Blockchain Centre NBO",
  image: "/Preston-Odep.jpg",
  imageClass: "",
};

speakers[4] = {
  name: "Peter Onyango",
  role: "Chairman of the Virtual Assets Association of Kenya (VAAK).",
  image: "/Peter Photo.jpeg",
  imageClass: "",
  imageWidth: 300,
  imageHeight: 700,
};

speakers[5] = {
  name: "Frédéric Samvura B",
  role: "Founding member of Ekival, a decentralized exchange on Cardano",
  image: "/WhatsApp Image 2025-12-14 at 10.36.32 PM (1).jpeg",
  imageClass: "",
};

speakers[6] = {
  name: "George Buliba",
  role: "George Buliba is an art director working at the crossroads of design, storytelling, and technology.",
  image: "/George-Buliba.jpg",
  imageClass: "",
};

export default function SpeakerSection () {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // split rows and reorder first row so positions 0 and 1 are swapped
  const firstRow = speakers.slice(0, 3);
  const firstRowOrdered = [firstRow[1], firstRow[0], firstRow[2]];

  return (
    <div className="w-full bg-white relative">
      <div className="flex flex-col lg:flex-row w-full">

        <div className="flex-1 flex flex-col items-center px-4 sm:px-6 lg:px-10 py-8 lg:py-[50px] border-r-0 lg:border-r-2 border-dashed border-gray-300">
          <div className="flex flex-col items-center gap-6 lg:gap-[39px] w-full max-w-6xl">
            
            <header className="flex flex-col items-center gap-2.5 w-full">
              <div className="inline-flex items-start flex-wrap justify-center">
                <div className="inline-flex items-center justify-center gap-2.5 px-2.5 py-[5px]">
                  <h1 className="w-fit font-telegraf font-bold text-black text-2xl sm:text-3xl lg:text-4xl text-center leading-tight whitespace-nowrap">
                    Summit
                  </h1>
                </div>

                <div className="inline-flex items-center justify-center bg-cardano-c gap-2.5 px-2.5 py-[5px]">
                  <h1 className="w-fit font-telegraf font-bold  text-white text-2xl sm:text-3xl lg:text-4xl text-center leading-tight whitespace-nowrap">
                    Speakers
                  </h1>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2.5 w-full">
                <div className="flex w-full max-w-[566px] items-center justify-center gap-2.5 px-2.5 py-0">
                  <p className="flex-1 font-poppins font-normal text-[16px] text-black text-center leading-7 tracking-[0em]">
                    Discover visionary leaders, developers, and ecosystem pioneers driving Cardano adoption across Africa.
                  </p>
                </div>
              </div>
            </header>

            <div className="w-full relative">
                  
                  <section aria-label="Speakers first row" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 mb-6 lg:mb-5 w-full lg:w-[1101px] mx-auto">
                    {firstRowOrdered.map((speaker, index) => (
                      <div key={`speaker-row1-${index}`} className="flex flex-col items-start gap-2.5 relative">
                        <div className="w-full pt-11 pr-[51px] pb-11 pl-[51px]">
                          <div className="w-[347px] h-[462px] overflow-hidden rounded-md relative mx-auto">
                            <Image
                              className={`object-cover rounded-md ${speaker.imageClass}`}
                              alt={speaker.name}
                              src={speaker.image}
                              fill
                              sizes="(min-width:1024px) 260px, (min-width:640px) 50vw, 100vw"
                              quality={80}
                              style={{ transform: 'rotate(0deg)', opacity: 1 }}
                            />
                            <div className="absolute inset-x-4 bottom-4 flex justify-center z-30 pointer-events-none">
                              <div className="relative w-[260px] sm:w-[300px] md:w-[320px] px-2 pointer-events-auto">
                                <div className="absolute left-0 top-0 bottom-0 w-6 bg-[url('/CATS-Pattern.jpg')] bg-cover bg-center opacity-100" />
                                <div className="absolute right-0 top-0 bottom-0 w-6 bg-[url('/CATS-Pattern.jpg')] bg-cover bg-center opacity-100" />
                                <div className="w-full bg-white shadow-md rounded-sm flex flex-col items-center justify-center py-3 px-4 overflow-hidden">
                                  <h3 className="font-telegraf font-bold text-black text-sm sm:text-base text-center wrap-break-word w-full">{speaker.name}</h3>
                                  <p className="font-poppins text-black text-sm sm:text-base text-center mt-1 wrap-break-word w-full">{speaker.role}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </section>

                  <section aria-label="Speakers second row" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 mb-6 lg:mb-[39px] w-full lg:w-[1101px] mx-auto">
                    {speakers.slice(3, 6).map((speaker, index) => (
                      <div key={`speaker-row2-${index}`} className="flex flex-col items-start gap-2.5 relative">
                        <div className="w-full pt-11 pr-[51px] pb-11 pl-[51px]">
                          <div className="w-[347px] h-[462px] overflow-hidden rounded-md relative mx-auto">
                            <Image
                              className={`object-cover rounded-md ${speaker.imageClass}`}
                              alt={speaker.name}
                              src={speaker.image}
                              fill
                              sizes="(min-width:1024px) 260px, (min-width:640px) 50vw, 100vw"
                              quality={80}
                              style={{ transform: 'rotate(0deg)', opacity: 1 }}
                            />
                            <div className="absolute inset-x-4 bottom-4 flex justify-center z-30 pointer-events-none">
                              <div className="relative w-[260px] sm:w-[300px] md:w-[320px] px-2 pointer-events-auto">
                                <div className="absolute left-0 top-0 bottom-0 w-6 bg-[url('/CATS-Pattern.jpg')] bg-cover bg-center opacity-100" />
                                <div className="absolute right-0 top-0 bottom-0 w-6 bg-[url('/CATS-Pattern.jpg')] bg-cover bg-center opacity-100" />
                                <div className="w-full bg-white shadow-md rounded-sm flex flex-col items-center justify-center py-3 px-4 overflow-hidden">
                                  <h3 className="font-telegraf font-bold text-black text-sm sm:text-base text-center wrap-break-word w-full">{speaker.name}</h3>
                                  <p className="font-poppins text-black text-sm sm:text-base text-center mt-1 wrap-break-word w-full">{speaker.role}</p>
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
              <button 
                onClick={() => setIsModalOpen(true)}
                className="inline-flex bg-cardano-c items-center gap-2.5 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-md transition-colors hover:bg-cardano-c/90 cursor-pointer"
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
