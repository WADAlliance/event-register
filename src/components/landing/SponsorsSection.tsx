import React from 'react';
import Image from 'next/image';

export default function SponsorsSection() {
  return (
    <div id="partners" className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 bg-[#0b0b0b] mt-8">
      <div className="max-w-6xl mx-auto py-16 px-4 text-center">
        {/* Powered by row */}
        <div className="flex flex-col items-center gap-4">
          <div className="text-white text-[20px] leading-[27px] font-extrabold font-telegraf tracking-[0%] text-center">
            Powered by:
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-[10px] mt-2">
            <div className="relative w-[224.1015625px] h-[60.6104850769043px] top-[0.69px] left-[0.47px] opacity-100 flex items-center justify-center">
              <Image
                src="/brand_assets/Group (1).png"
                alt="WADA"
                width={224.1015625}
                height={60.6104850769043}
                className="object-contain"
                priority
              />
            </div>

            <div className="flex items-center justify-center w-[35px] h-[47px] p-[10px]">
              <span className="text-white text-xl font-semibold leading-none">&amp;</span>
            </div>

            <div className="w-[270px] h-[80px] flex items-center justify-center">
              <Image
                src="/brand_assets/Cardano-Foundation 1.png"
                alt="Cardano Foundation"
                width={270}
                height={80}
                className="object-contain w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>

        {/* Section heading */}
        <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-extrabold font-telegraf mt-12">
          Our Sponsors
        </h2>

        {/* Description */}
        <p className="mt-6 mx-auto text-white max-w-[900px] text-center font-poppins text-base leading-relaxed">
          We are proud to be supported by our sponsors, whose commitment and
          <br />
          partnership make the Cardano Africa Tech Summit possible.
        </p>

        {/* Sponsor logos */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <div className="w-[220px] h-20 flex items-center justify-center opacity-95 hover:opacity-100 transition-opacity">
            <Image
              src="/brand_assets/cardano-logo-full-blue.png"
              alt="Cardano Blockchain"
              width={123}
              height={80}
              className="object-contain"
            />
          </div>

          <div className="w-[220px] h-20 flex items-center justify-center opacity-95 hover:opacity-100 transition-opacity">
            <Image
              src="/brand_assets/cf-logo-full-white.png"
              alt="Cardano Foundation Blockchain"
              width={123}
              height={80}
              className="object-contain"
            />
          </div>

          <div className="w-[220px] h-20 flex items-center justify-center opacity-95 hover:opacity-100 transition-opacity">
            <Image
              src="/brand_assets/intersect-logo-genie-rgb.png"
              alt="Intersect MBO"
              width={123}
              height={80}
              className="object-contain"
            />
          </div>

          <div className="w-[220px] h-20 flex items-center justify-center opacity-95 hover:opacity-100 transition-opacity">
            <Image
              src="/brand_assets/mara.png"
              alt="Mara Expeditions"
              width={116}
              height={64}
              className="object-contain"
            />
          </div>

          <div className="w-[220px] h-[80px] flex items-center justify-center opacity-95 hover:opacity-100 transition-opacity">
            <Image
              src="/brand_assets/rejuve.png"
              alt="Rejuve.Bio"
              width={110}
              height={73}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
