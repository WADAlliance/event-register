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

const speakers: Speaker[] = [
  {
    name: "Frederik Gregard",
    role: "CEO of the Cardano Foundation",
    image: "/imgs/frederik-gregard-headshot.jpg",
    imageClass: "",
  },
  {
    name: "Kennedy Schaal",
    role: "Kennedy Matsagas Schaal, Founder & CEO Rejuve Biotech",
    image: "/imgs/kennedy-matsagas-schaal-headshot.jpg",
    imageClass: "",
  },
  {
    name: "Shogo Ishida ",
    role: "CEO of EMURGO Middle East & Africa",
    image: "/imgs/shogo-ishida-headshot.png",
    imageClass: "",
  },
  {
    name: "Emilian Popa",
    role: "Health-tech entrepreneur and the founder of Expand Health and Expand Health AI",
    image: "/imgs/emilian-popa.jpg",
    imageClass: "",
  },
  {
    name: "Andreas Pletscher",
    role: "Chief Operating Officer at the Cardano Foundation",
    image: "/imgs/andreas-pletscher-headshot.png",
    imageClass: "rounded-[5px] object-cover",
  },
  {
    name: "Shantnoo Saxena",
    role: "Founder of Encryptus and CEO of Anzens",
    image: "/imgs/shantnoo-anzens-headshot.jpg",
    imageClass: "",
  },
  {
    name: "Naomi Kilungu ",
    role: "Thought Leader & Founder of AI for Peace Africa,",
    image: "/imgs/naomi-headshot.jpg",
    imageClass: "rounded-[5px] object-cover",
  },
  {
    name: "Jack Briggs",
    role: "Executive Director at IntersctMBO",
    image: "/imgs/jack-briggs-headshot.jpg",
    imageClass: "rounded-[5px] object-cover",
  },
  {
    name: "Mercy Fordwoo",
    role: "Co-founder and Partnerships Lead at Wada Global",
    image: "/imgs/mercy.jpg",
    imageClass: "rounded-[5px] object-cover",
  },
  {
    name: "Darlington Wleh",
    role: "Co-Dreamer @ 2Lovelaces and Lido Nation, President of Blockchain Centre NBO",
    image: "/imgs/darlington-02.jpg",
    imageClass: "",
  },
  {
    name: "Alexandre Maaza",
    role: "Sustainability & Innovation at the Cardano Foundation",
    image: "/imgs/alexandre-maaza-headshot.jpeg",
    imageClass: "",
  },
  {
    name: "Kyle Solomon ",
    role: "VP of Sales and Marketing for Hydra events",
    image: "/imgs/kyle-headshot.jpeg",
    imageClass: "",
  },
  {
    name: "Diana Kemunto",
    role: "Legal & Programs Manager at Blockchain Centre NBO",
    image: "/imgs/diana-kemunto-headshot.jpeg",
    imageClass: "",
  },
  {
    name: "Preston Odep",
    role: "Brand Director @ Lido Nation, 2 Lovelaces, & Blockchain Centre NBO",
    image: "/imgs/Preston-Odep.jpg",
    imageClass: "",
  },
  {
    name: "Kavinda Kariyapperuma",
    role: "Founder & CEO - Coinceylon & Board Director - Intersect MBO",
    image: "/imgs/kavinda-headshot.jpeg",
    imageClass: "",
  },
  {
    name: "Peter Onyango",
    role: "Chairman of the Virtual Assets Association of Kenya (VAAK).",
    image: "/imgs/peter-photo.jpeg",
    imageClass: "",
    imageWidth: 300,
    imageHeight: 700,
  },
  {
    name: "Adam Dean",
    role: "Co-Founder of DripDropz",
    image: "/imgs/adam-dean-headshot.jpg",
    imageClass: "",
    imageWidth: 300,
    imageHeight: 700,
  },
  {
    name: "Nefertiti A Strong",
    role: "Chief Visionary Officer to Dr. Ben Goertzel, Founder of XRAgency.co & Founder/director/producer of BeyondTheCode.ai",
    image: "/imgs/nefertiti-strong-headshot.jpeg",
    imageClass: "",
  },
  {
    name: "Frédéric Samvura B",
    role: "Founding member of Ekival, a decentralized exchange on Cardano",
    image: "/imgs/frederic-samvura-headshot.jpeg",
    imageClass: "",
  },
  {
    name: "George Buliba",
    role: "Creative Strategist and Art Director",
    image: "/imgs/george-buliba.jpg",
    imageClass: "",
  },
  {
    name: "Mike Hornan",
    role: "Stake pool operator & Cardano Governance Educator",
    image: "/imgs/mike-hornen-headshot.jpg",
    imageClass: "",
  },
  {
    name: "Samuel Leathers",
    role: "Chairperson at Cardano Product Committee\n",
    image: "/imgs/sam-leathers-headshot.jpg",
    imageClass: "",
  },
  {
    name: "Dan Baruka",
    role: "Co-founder and CEO of Uptodate Developers",
    image: "/imgs/dan-baruka-headshot.png",
    imageClass: "",
  },
  {
    name: "Richard E. Pelzer II",
    role: "HarlemCLX | Producing Culture at the Intersection of Art, Design & Community",
    image: "/imgs/richard_pelzer.jpg",
    imageClass: "",
  },
  {
    name: "Nana Safo",
    role: "Governance Lead at Wada Global",
    image: "/imgs/nana-safo-headshot.JPG",
    imageClass: "",
  },
  {
    name: "Nick Cook",
    role: "Intersect Interim Operations Director",
    image: "/imgs/nick-cook-headshot.jpg",
    imageClass: "",
  },
  {
    name: "Samuel Kobi",
    role: "Hubs Coordination Lead at Wada Global",
    image: "/imgs/samuel-headshot.jpg",
    imageClass: "",
  },
  {
    name: "Jessica Groopman",
    role: "Founder, the Regenerative Technology Project & Regen Bridge, Senior Innovation Advisor, Intentional Futures",
    image: "/imgs/jessica.png",
    imageClass: "",
  },
  {
    name: "Dr Bright Gameli",
    role: "Pioneering cybersecurity and blockchain intelligence",
    image: "/imgs/IMG_9978.JPG",
    imageClass: "",
  },
  {
    name: "Megan Hess",
    role: "Operations Lead, Wada Global | Treasurer, Photrek Inc",
    image: "/imgs/Hess headshot.jpeg",
    imageClass: "",
  },
  {
    name: "Ms. Ebby Gatamu",
    role: "CEO of Cladfy Inc.",
    image: "/imgs/DSC04214 (2).jpg",
    imageClass: "",
  },
  {
    name: "Philip Kisaka",
    role: "MC for Legal & Technology Events",
    image: "/imgs/Kisaka.jpg",
    imageClass: "",
  },
  {
    name: "Alice Kanjejo",
    role: "Communications and brand strategist",
    image: "/imgs/WhatsApp Image 2026-02-02 at 08.32.06.jpeg",
    imageClass: "",
  },
  {
    name: "Vincent (Leteipa) Sipoi",
    role: "Founder and Technical Lead at Adamur",
    image: "/imgs/PHOTO-2026-01-31-07-50-23.jpg",
    imageClass: "",
  },
  {
    name: "Temitope (Tope) Emiola",
    role: "Head of Business at AgoraVisa",
    image: "/imgs/Headshot.jpeg",
    imageClass: "",
  },
  {
    name: "Victor Joseph",
    role: "Founder and CEO of TemboPlus (Tembo)",
    image: "/imgs/VOCTOR PICTURE.jpg",
    imageClass: "",
  },
  // {
  //   name: "Jane Wangari",
  //   role: "Co Founder at Adamur",
  //   image: "/imgs/PHOTO-2026-01-31-07-38-33.jpg",
  //   imageClass: "",
  // },
  {
    name: "Ben Thompson Coon",
    role: "UNDP AltFinLab",
    image: "/imgs/ben_01.jpg",
    imageClass: "",
  },
  {
    name: "Joanne Wendoh",
    role: "Founder of Build African DAOs, blockchain & AI educator.",
    image: "/imgs/WhatsApp Image 2026-02-05 at 10.57.35 AM.jpeg",
    imageClass: "",
  },
  {
    name: "Oscar Otieno",
    role: "Deputy Data Commissioner",
    image: "/imgs/Oscar Pic.jpeg",
    imageClass: "",
  },
  {
    name: "Mary Kerema",
    role: "Secretary ICT, E-Government and Digital Economy in the Ministry of IC&DE",
    image: "/imgs/mary kere.jpg",
    imageClass: "",
  },
  // {
  //   name: "Chizaram Ucheaga",
  //   role: "",
  //   image: "",
  //   imageClass: "",
  // },
  // {
  //   name: "Lavender Ester",
  //   role: "",
  //   image: "/imgs/lavender.jpg",
  //   imageClass: "",
  // },
  // {
  //   name: "Cornelius Maroa",
  //   role: "",
  //   image: "",
  //   imageClass: "",
  // },
  {
    name: "Charity Ogada",
    role: "Director and Partnerships Lead,Blockchain Centre NBO",
    image: "/imgs/Charity 2.jpg",
    imageClass: "",
  },
  // {
  //   name: "Isaac Wabuge",
  //   role: "",
  //   image: "",
  //   imageClass: "",
  // },
  // {
  //   name: "Stephen Kimoi",
  //   role: "",
  //   image: "",
  //   imageClass: "",
  // },
  {
    name: "Brenton Naicker",
    role: "CV VC Labs",
    image: "/imgs/Brenton-Naicker.jpg",
    imageClass: "",
  },
];



export default function SpeakerSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full bg-white relative">
      <div className="flex flex-col lg:flex-row w-full">

        <div className="flex-1 flex flex-col items-center px-4 sm:px-6 lg:px-10 py-8 lg:py-[50px] border-r-0 lg:border-r-2 border-dashed border-gray-300">
          <div className="flex flex-col items-center gap-6 lg:gap-[39px] w-full max-w-6xl">

            <header className="flex flex-col items-center gap-2.5 w-full">
              <div className="inline-flex items-start flex-wrap justify-center">
                <div className="inline-flex items-center justify-center gap-2.5 px-2.5 py-[5px]">
                  <h1 className="w-fit text-black text-2xl sm:text-3xl lg:text-4xl text-center leading-tight whitespace-nowrap">
                    Summit
                  </h1>
                </div>

                <div className="inline-flex items-center justify-center bg-cardano-c gap-2.5 px-2.5 py-[5px]">
                  <h1 className="w-fit text-white text-2xl sm:text-3xl lg:text-4xl text-center leading-tight whitespace-nowrap">
                    Speakers
                  </h1>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2.5 w-full">
                <div className="flex w-full max-w-[566px] items-center justify-center gap-2.5 px-2.5 py-0">
                  <p className="flex-1 text-[16px] text-black text-center leading-7 tracking-[0em]">
                    Discover visionary leaders, developers, and ecosystem pioneers driving Cardano adoption across Africa.
                  </p>
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
                          sizes="(min-width:1024px) 260px, (min-width:640px) 50vw, 100vw"
                          quality={80}
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
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex bg-cardano-c items-center gap-2.5 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-md transition-colors hover:bg-cardano-c/90 cursor-pointer"
              >
                <span className="text-white text-base sm:text-lg lg:text-xl tracking-[-0.20px] leading-tight whitespace-nowrap">
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
