"use client"

import React, { useState } from "react";
import RegisterForSummitButton from "@/components/RegisterForSummitButton";
import Image from "next/image";
import BecomePartnerModal from "./Becomeaparner";

export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div
      className="
                relative flex flex-col self-stretch items-center justify-center
                px-6
                pt-[120px] sm:pt-[110px] md:pt-[100px]
                pb-[140px] sm:pb-[120px] md:pb-[200px]
                text-center w-full
                min-h-[610px] md:h-[610px]
                opacity-100 overflow-hidden
            "
    >
      <Image
        src="/Website-Banner.jpg"
        alt="Cardano Africa Tech Summit 2026"
        priority
        quality={100}
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
        sizes="100vw"
        fill
      />

      <div className="relative z-10 max-w-4xl">
        <p className="mb-3 text-sm font-medium tracking-widest text-gray-300 md:text-base text-center">
          February 11–13 • Nairobi, Kenya
        </p>

        <h1 className="mb-0 text-white text-[40px] leading-[44px] md:text-[80px] md:leading-[66px] text-center">
          <span>Cardano Africa</span>
          <span className="block">Tech Summit 2026</span>
        </h1>

        <p className="mx-auto mt-2 mb-1 text-base font-normal max-w-2xl leading-7 text-gray-200">
          Join developers, entrepreneurs, and community leaders shaping
          <br className="hidden lg:block" />
          the future of decentralized technology across Africa.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4 mt-2">
          <RegisterForSummitButton text="Register for the Summit" className="bg-[#ff4b26] hover:bg-[#ff4b26]/90" />

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            aria-haspopup="dialog"
            className="group flex w-[214px] h-[44px] items-center justify-center rounded-md border-2 border-[#7FB843] bg-transparent px-[20px] py-[11px] gap-[10px] cursor-pointer transition-colors duration-150 ease-in-out hover:bg-[#7FB843]"
          >
            <span className="font-extrabold text-[16px] leading-[20px] tracking-[-0.01em] text-[#7FB843] group-hover:text-white transition-colors duration-150">
              Become a Partner
            </span>
          </button>

          <BecomePartnerModal open={isModalOpen} onOpenChange={(open) => setIsModalOpen(open)} />
        </div>
      </div>
    </div>
  );
}
