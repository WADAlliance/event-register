import React from 'react';
import Image from 'next/image';

export default function SponsorsSection() {
  return (
    <section id="partners" className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 bg-black py-20 px-4">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">

        {/* Tagline */}
        <div className="flex items-center gap-2 mb-4">
          <span className="w-4 h-[2px] bg-[#f05a28]"></span>
          <span className="text-[#f05a28] text-sm font-bold uppercase tracking-wider">Our Sponsors</span>
        </div>

        {/* Main Heading */}
        <h2 className="text-white text-4xl md:text-6xl font-black mb-6 tracking-tight font-telegraf">
          Made Possible By
        </h2>

        {/* Description */}
        <p className="text-gray-400 text-sm md:text-base max-w-2xl mb-12 leading-relaxed font-telegraf">
          CATS 2026 would not have happened without the generous support of<br className="hidden md:block" />
          these organisations, who share our belief in Africa&apos;s decentralised future.
        </p>

        {/* Primary Partners */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 mb-16">
          <div className="relative opacity-100 flex items-center justify-center">
            <Image
              src="/brand_assets/Group (1).png"
              alt="WADA"
              width={224.1015625}
              height={60.6104850769043}
              className="object-contain"
              priority
            />
          </div>

          <div className="text-gray-500 text-2xl font-light">&amp;</div>

          <div className="relative flex items-center justify-center">
            <Image
              src="/brand_assets/Cardano-Foundation 1.png"
              alt="Cardano Foundation"
              width={270}
              height={80}
              className="object-contain h-auto"
              priority
            />
          </div>
        </div>

        {/* Secondary Divider */}
        <h3 className="text-white text-xl md:text-2xl font-bold mb-12 font-telegraf">
          Our Sponsors
        </h3>

        {/* Sponsors Grid */}
        <div className="flex flex-row items-center justify-center gap-6 md:gap-10 overflow-x-auto no-scrollbar md:overflow-visible w-full pb-4 md:pb-0 opacity-95 hover:opacity-100 transition-opacity">

          {/* Cardano */}
          <div className="flex items-center justify-center">
            <Image
              src="/Cardano-RGB_Logo-Full-White.png"
              alt="Cardano"
              width={160}
              height={80}
              className="object-contain"
            />
          </div>

          {/* Cardano Foundation */}
          <div className="flex items-center justify-center">
            <Image
              src="/brand_assets/cf-logo-full-white.png"
              alt="Cardano Foundation"
              width={180}
              height={80}
              className="object-contain"
            />
          </div>

          {/* Intersect */}
          <div className="flex items-center justify-center">
            <Image
              src="/intersect-logo-white-rgb.png"
              alt="Intersect"
              width={200}
              height={80}
              className="object-contain"
            />
          </div>

          {/* Mara */}
          <div className="flex items-center justify-center">
            <Image
              src="/brand_assets/mara.png"
              alt="Mara"
              width={116}
              height={64}
              className="object-contain"
            />
          </div>

          {/* Rejuve.Bio */}
          <div className="flex items-center justify-center">
            <Image
              src="/rejuve bio.png"
              alt="Rejuve.Bio"
              width={220}
              height={80}
              className="object-contain"
            />
          </div>

          {/* Tembo Plus */}
          <div className="flex items-center justify-center">
            <Image
              src="/brand_assets/Tembo-Plus.png"
              alt="Tembo Plus"
              width={220}
              height={80}
              className="object-contain"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
