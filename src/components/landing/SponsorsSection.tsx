import React from 'react';
import Image from 'next/image';

export default function SponsorsSection() {
  return (
    <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 bg-[#0b0b0b] mt-8">
      <div className="max-w-6xl mx-auto py-12 lg:py-20 px-4 text-center">
        <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-extrabold font-telegraf mb-2 text-center">Our Sponsors</h2>

        <p className="mt-4 mx-auto text-white max-w-[900px] text-center font-poppins text-base leading-relaxed">
          We are proud to be supported by our sponsors, whose commitment and <br />partnership make the Cardano Africa Tech Summit possible.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-20 lg:gap-28">
          <div className="w-[220px] h-auto flex items-center justify-center">
            <Image
              src="/sponsor1.png"
              alt="Sponsor 1"
              width={220}
              height={70}
              className="object-contain"
            />
          </div>

          <div className="w-[220px] h-auto flex items-center justify-center">
            <Image
              src="/Mara-Expeditions.png"
              alt="Sponsor 2"
              width={220}
              height={70}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
