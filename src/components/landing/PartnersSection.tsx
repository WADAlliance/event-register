"use client"

import React, {useState} from 'react';
import Image from 'next/image';
import BecomePartnerModal from './Becomeaparner';

interface PartnerLogo {
  name: string;
  logo: string;
  alt?: string;
}

const implementationPartners: PartnerLogo[] = [
  {name: 'PRISMA', logo: '/brand_assets/Prisma.png', alt: 'PRISMA Logo'},
  // {name: 'WADA', logo: '/brand_assets/Wada-RGB_Logo-Full-Color.svg', alt: 'WADA Logo'},
  {name: 'Blockchain Centre NBO', logo: '/brand_assets/Blockchain Centre Logo.svg', alt: 'Blockchain Centre NBO Logo'},
  {name: 'Lido Nation', logo: '/brand_assets/Lido Nation.svg', alt: 'Lido Nation Logo'},
];

const mediaPartners: PartnerLogo[] = [
  {name: 'XR Regency', logo: '/XR Agency.webp', alt: 'XR Regency Logo'},
  {name: 'Beyond The Code', logo: '/brand_assets/beyond_the_code.svg', alt: 'Beyond The Code Logo'},
  {name: 'Tech Arena', logo: '/brand_assets/tech-arena-logo.png', alt: 'Tech Arena'},
  {name: 'Harlem CLX', logo: '/brand_assets/harlem-clx-logo.png', alt: 'Harlem CLX Logo'},
];

const communityProjects: PartnerLogo[] = [
  {name: 'ZENGATE', logo: '/brand_assets/zengate-logo-transparent.png', alt: 'Zengate'},
  {name: 'Clear C', logo: '/brand_assets/clear-contracts-logo.png', alt: 'Zengate'},
  {name: 'Able Pool', logo: '/brand_assets/able-pool.jpg', alt: 'Able Pool'}
];

const getDimensions = (name: string, isMainRow: boolean) => {
  if (isMainRow) {
    switch (name) {
      case 'PRISMA':
        return {width: 166, height: 38};
      case 'WADA':
        return {width: 198, height: 57};
      case 'Blockchain Centre NBO':
        return {width: 198, height: 57};
      case 'Lido Nation':
        return {width: 198, height: 48};
      case 'XRA Agency':
        return {width: 150, height: 68};
      case 'XR Regency':
        return {width: 300, height: 97};
      case 'Beyond The Code':
        return {width: 290, height: 70};
      case 'Harlem CLX':
        return {width: 210, height: 58};
      default:
        return {width: 250, height: 68};
    }
  } else {
    switch (name) {
      case 'PRISMA':
        return {width: 140, height: 32};
      case 'WADA':
        return {width: 160, height: 40};
      case 'Blockchain Centre NBO':
        return {width: 148, height: 45};
      case 'Lido Nation':
        return {width: 150, height: 43};
      case 'XRA Agency':
        return {width: 150, height: 43};
      case 'Beyond The Code':
        return {width: 150, height: 43};
      case 'Harlem CLX':
        return {width: 150, height: 43};
      default:
        return {width: 150, height: 43};
    }
  }
};

const getMobileDimensions = (name: string) => {
  switch (name) {
    case 'PRISMA':
      return {width: 200, height: 45};
    case 'WADA':
      return {width: 220, height: 55};
    case 'Blockchain Centre NBO':
      return {width: 208, height: 60};
    case 'Lido Nation':
      return {width: 210, height: 58};
    case 'XRA Agency':
      return {width: 210, height: 58};
    case 'XR Regency':
      return {width: 286, height: 72};
    case 'Beyond The Code':
      return {width: 273, height: 75};
    case 'Harlem CLX':
      return {width: 210, height: 58};
    default:
      return {width: 210, height: 58};
  }
};

function PartnerSection({title, partners, blur = false}: { title: string; partners: PartnerLogo[]; blur?: boolean }) {
  const firstRow = partners.slice(0, 3);
  const secondRow = partners.slice(3, 6);

  return (
    <div className='mb-16 md:mb-20'>
      <div className='flex items-center justify-center gap-6 mb-12 px-4'>
        <div className='flex-1 max-w-[200px] h-px bg-wada-a'></div>
        <h3 className="text-black text-center font-extrabold text-[25px] leading-[39px] tracking-normal font-telegraf">
          {title}
        </h3>
        <div className='flex-1 max-w-[200px] h-px bg-wada-a'></div>
      </div>

      {/* Desktop Grid */}
      <div className='hidden md:block'>
        {/* First row: use grid when full (3), otherwise center with flex */}
        {firstRow.length === 3 ? (
          <div className="grid grid-cols-3 gap-x-12 gap-y-12 px-4 max-w-6xl mx-auto items-center">
            {firstRow.map((p, idx) => {
              const dims = getDimensions(p.name, true);
              return (
                <div key={`${p.name}-${idx}`}
                     className={`flex items-center justify-center ${blur ? 'filter blur-sm opacity-60' : ''}`}>
                  <div className="relative" style={{width: `${dims.width}px`, height: `${dims.height}px`}}>
                    <Image
                      src={p.logo}
                      alt={p.alt ?? p.name}
                      fill
                      className="object-contain"
                      quality={100}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div
            className={`flex justify-center gap-x-12 gap-y-12 px-4 max-w-6xl mx-auto items-center ${blur ? 'filter blur-sm opacity-60' : ''}`}>
            {firstRow.map((p, idx) => {
              const dims = getDimensions(p.name, true);
              return (
                <div key={`${p.name}-${idx}`} className="flex items-center justify-center">
                  <div className="relative" style={{width: `${dims.width}px`, height: `${dims.height}px`}}>
                    <Image
                      src={p.logo}
                      alt={p.alt ?? p.name}
                      fill
                      className='object-contain'
                      quality={100}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Second Row - use same centering logic */}
        {secondRow.length > 0 && (
          secondRow.length === 3 ? (
            <div className="grid grid-cols-3 gap-x-12 gap-y-12 px-4 max-w-6xl mx-auto mt-12">
              {secondRow.map((p, idx) => {
                const dims = getDimensions(p.name, true);
                return (
                  <div key={`${p.name}-${idx + 3}`}
                       className={`flex items-center justify-center ${blur ? 'filter blur-sm opacity-60' : ''}`}>
                    <div className="relative" style={{width: `${dims.width}px`, height: `${dims.height}px`}}>
                      <Image
                        src={p.logo}
                        alt={p.alt ?? p.name}
                        fill
                        className='object-contain'
                        quality={100}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div
              className={`flex justify-center gap-x-12 gap-y-12 px-4 max-w-6xl mx-auto mt-12 ${blur ? 'filter blur-sm opacity-60' : ''}`}>
              {secondRow.map((p, idx) => {
                const dims = getDimensions(p.name, true);
                return (
                  <div key={`${p.name}-${idx + 3}`}
                       className={`flex items-center justify-center ${blur ? 'filter blur-sm opacity-60' : ''}`}>
                    <div className="relative" style={{width: `${dims.width}px`, height: `${dims.height}px`}}>
                      <Image
                        src={p.logo}
                        alt={p.alt ?? p.name}
                        fill
                        className='object-contain'
                        quality={100}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )
        )}
      </div>

      {/* Mobile Grid - 2 columns */}
      <div className="md:hidden grid grid-cols-2 gap-8 px-4">
        {partners.map((p, idx) => {
          const dims = getMobileDimensions(p.name);
          return (
            <div
              key={`mobile-${p.name}-${idx}`}
              className={`flex items-center justify-center ${blur ? 'filter blur-sm opacity-60' : ''}`}
            >
              <div className="relative" style={{width: `${dims.width}px`, height: `${dims.height}px`}}>
                <Image
                  src={p.logo}
                  alt={p.alt ?? p.name}
                  fill
                  className="object-contain"
                  quality={100}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default function PartnersSection(): React.ReactElement {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="partners" className="w-full bg-[#FFFFFF]">
      <div className="container mx-auto px-4 py-10 md:py-20">
        {/* Title and Description */}
        <div className="text-center font-poppins mb-10 md:mb-8">
          <div>
            <h2
              className="text-black text-2xl sm:text-3xl lg:text-4xl font-extrabold font-telegraf mb-4 tracking-normal text-center">Our
              Partners</h2>
            {/*<h3 className='font-telegraf text-black font-extrabold text-base mt-4 mb-4'>(<span className='text-wada-a'>Hosted by Wada and Cardano Foundation</span>)</h3>*/}
          </div>
          <p className="text-black font-normal text-base max-w-[800px] mx-auto px-2">
            The Cardano Africa Tech Summit is proudly supported by organizations <br/> and communities that believe in
            Africa’s decentralized future.
          </p>
        </div>

        <PartnerSection title="Implementation Partners" partners={implementationPartners}/>

        <PartnerSection title="Media Partners" partners={mediaPartners} blur={false}/>

        <PartnerSection title="Featured Community Projects" partners={communityProjects} blur={false}/>

        <div className="flex justify-center mx-auto">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex w-[214px] h-11 rounded-md opacity-100 rotate-0 py-[15px] px-[20px] text-center gap-[10px] bg-[#EB5626] justify-center items-center cursor-pointer"
            aria-haspopup="dialog"
          >
            <h4
              className="font-telegraf font-extrabold text-[20px] leading-[14px] tracking-[-0.01em] whitespace-nowrap">
              Become a Partner
            </h4>
          </button>

          <BecomePartnerModal
            open={isModalOpen}
            onOpenChange={(open) => setIsModalOpen(open)}
          />
        </div>
      </div>
    </section>
  );
}
