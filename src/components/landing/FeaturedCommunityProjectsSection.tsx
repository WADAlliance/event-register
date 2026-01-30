"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import BecomePartnerModal from './Becomeaparner';

interface PartnerLogo {
  name: string;
  logo: string;
  alt?: string;
}

const implementationPartners: PartnerLogo[] = [
  { name: 'PRISMA', logo: '/brand_assets/Prisma.png', alt: 'PRISMA Logo' },

  { name: 'Blockchain Centre NBO', logo: '/brand_assets/Blockchain Centre Logo.svg', alt: 'Blockchain Centre NBO Logo' },
  { name: 'Lido Nation', logo: '/brand_assets/Lido Nation.svg', alt: 'Lido Nation Logo' },
];

const mediaPartners: PartnerLogo[] = [
  { name: 'XR Regency', logo: '/XR Agency.webp', alt: 'XR Regency Logo' },
  { name: 'Beyond The Code', logo: '/Beyond the Code.png', alt: 'Beyond The Code Logo' },
  { name: 'Tech Arena', logo: '/brand_assets/tech-arena-logo.png', alt: 'Tech Arena' },
  { name: 'Harlem CLX', logo: '/brand_assets/harlem-clx-logo.png', alt: 'Harlem CLX Logo' },
];

const communityProjects: PartnerLogo[] = [
  { name: 'Anzens', logo: '/brand_assets/anzens-logo.png', alt: 'Anzens Logo' },
  { name: 'ZENGATE', logo: '/brand_assets/zengate-logo-transparent.png', alt: 'Zengate' },
  { name: 'Axcel Africa', logo: '/brand_assets/axcel-africa-logo.jpeg', alt: 'Axcel Africa' },
  { name: 'Timon', logo: '/brand_assets/timon-logo.png', alt: 'Timon Logo' },
  { name: 'ABI', logo: '/brand_assets/ABI-logo.png', alt: 'Africa Blockchain Institution' },
  { name: 'PLP', logo: '/brand_assets/PLP-Logo.jpeg', alt: 'Power Learn Project' },
  { name: 'Clear Contracts', logo: '/brand_assets/clear-contracts-logo.png', alt: 'Clear Contracts Logo' },
  { name: 'Able Pool', logo: '/brand_assets/able-pool.jpg', alt: 'Able Pool' },
  { name: 'DirectEd Development', logo: '/brand_assets/directEd-development-logo.png', alt: 'DirectEd Development' },
  { name: 'TAMED SPO', logo: '/brand_assets/tamed-spo-jeremy-otieno-logo.png', alt: 'TAMED SPO' },
  { name: 'ADAEx App', logo: '/brand_assets/adaex-app-logo.png', alt: 'AdaEx App' },
  { name: 'Cardano Hub NBO', logo: '/brand_assets/cardano-hub-logo.png', alt: 'Cardano Hub NBO' },
  { name: 'Palmyra', logo: '/brand_assets/palmyra.png', alt: 'Palmyra Logo' },
  { name: 'UNDP AltFinLab', logo: '/brand_assets/UNDP AltFinLab logo blue - Ben Martin.png', alt: 'UNDP AltFinLab Logo' },
  { name: 'Reloop', logo: '/brand_assets/logo-reloop - Fabian Owuor.png', alt: 'Reloop Logo' },
  { name: 'Vespr', logo: '/brand_assets/vespr_logo_horizontal_black - Vladut Angel Stan.png', alt: 'Vespr Logo' },
  { name: 'Cladify', logo: '/brand_assets/cladify.png', alt: 'Cladify Logo' },
  { name: 'Texperience', logo: '/brand_assets/default - Tk Princewill.png', alt: 'Tk Princewill Logo' },
  { name: 'Clarity', logo: '/brand_assets/ClarityLogoNEW - Justin Schreiner.png', alt: 'Clarity Logo' },
  { name: 'Prisma Full Black', logo: '/brand_assets/Prisma_Full_Black_Transparent - Prisma.png', alt: 'Prisma Full Black Logo' },
  { name: 'Hydra Events', logo: '/brand_assets/hydra-events-logo - Kyle Solomon.png', alt: 'Hydra Events Logo' },
  { name: 'Intersect Genie', logo: '/brand_assets/intersect-logo-genie-rgb-trademark - Lara Bonasorte.png', alt: 'Intersect Genie Logo' },
];

const getDimensions = (name: string, isMainRow: boolean) => {
  if (isMainRow) {
    switch (name) {
      case 'PRISMA':
        return { width: 166, height: 38 };
      case 'WADA':
        return { width: 198, height: 57 };
      case 'Blockchain Centre NBO':
        return { width: 198, height: 57 };
      case 'Lido Nation':
        return { width: 198, height: 48 };
      case 'XRA Agency':
        return { width: 150, height: 68 };
      case 'XR Regency':
        return { width: 300, height: 97 };
      case 'Beyond The Code':
        return { width: 290, height: 70 };
      case 'Harlem CLX':
        return { width: 210, height: 58 };
      case 'Cladify':
        return { width: 300, height: 200 };
      case 'Texperience':
        return { width: 180, height: 90 };
      case 'Clarity':
        return { width: 220, height: 65 };
      case 'TechRift Africa':
        return { width: 280, height: 150 };
      case 'Intersect Genie':
        return { width: 280, height: 90 };
      case 'UNDP AltFinLab':
        return { width: 160, height: 100 };
      case 'Reloop':
        return { width: 160, height: 100 };
      case 'Vespr':
        return { width: 240, height: 85 };
      case 'Prisma Full Black':
        return { width: 240, height: 60 };
      case 'Palmyra':
        return { width: 250, height: 150 };
      default:
        return { width: 250, height: 68 };
    }
  } else {
    switch (name) {
      case 'PRISMA':
        return { width: 140, height: 32 };
      case 'WADA':
        return { width: 160, height: 40 };
      case 'Blockchain Centre NBO':
        return { width: 148, height: 45 };
      case 'Lido Nation':
        return { width: 150, height: 43 };
      case 'XRA Agency':
        return { width: 150, height: 43 };
      case 'Beyond The Code':
        return { width: 150, height: 43 };
      case 'Harlem CLX':
        return { width: 150, height: 43 };
      default:
        return { width: 150, height: 43 };
    }
  }
};

const getMobileDimensions = (name: string) => {
  switch (name) {
    case 'PRISMA':
      return { width: 200, height: 45 };
    case 'WADA':
      return { width: 220, height: 55 };
    case 'Blockchain Centre NBO':
      return { width: 208, height: 60 };
    case 'Lido Nation':
      return { width: 210, height: 58 };
    case 'XRA Agency':
      return { width: 210, height: 58 };
    case 'XR Regency':
      return { width: 286, height: 72 };
    case 'Beyond The Code':
      return { width: 273, height: 75 };
    case 'Harlem CLX':
      return { width: 210, height: 58 };
    case 'Cladify':
      return { width: 200, height: 60 };
    case 'Texperience':
      return { width: 140, height: 70 };
    case 'Clarity':
      return { width: 180, height: 55 };
    case 'Intersect Genie':
      return { width: 200, height: 60 };
    case 'UNDP AltFinLab':
      return { width: 130, height: 80 };
    case 'Reloop':
      return { width: 130, height: 80 };
    case 'Vespr':
      return { width: 190, height: 70 };
    case 'Prisma Full Black':
      return { width: 190, height: 50 };
    case 'Palmyra':
      return { width: 180, height: 60 };
    default:
      return { width: 210, height: 58 };
  }
};

function PartnerSection({ title, partners, blur = false, pushRight = false }: { title: string; partners: PartnerLogo[]; blur?: boolean; pushRight?: boolean }) {
  return (
    <div className='mb-16 md:mb-20'>
      <div className='flex items-center justify-center gap-6 mb-12 px-4'>
        <div className='flex-1 max-w-[200px] h-px bg-wada-a'></div>
        <h3 className="text-black text-center font-extrabold text-[25px] leading-[39px] tracking-normal">
          {title}
        </h3>
        <div className='flex-1 max-w-[200px] h-px bg-wada-a'></div>
      </div>


      <div className='hidden md:block'>
        <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16 ${pushRight ? 'ml-auto mr-0' : 'mx-auto'} max-w-6xl items-center justify-items-center`}>
          {partners.map((p, idx) => {
            const dims = getDimensions(p.name, true);
            return (
              <div key={`${p.name}-${idx}`}
                className={`flex items-center justify-center w-full h-[120px] ${blur ? 'filter blur-sm opacity-60' : ''}`}>
                <div className="relative" style={{ width: `${dims.width}px`, height: `${dims.height}px` }}>
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


      <div className="md:hidden grid grid-cols-2 gap-x-8 gap-y-12 px-4">
        {partners.map((p, idx) => {
          const dims = getMobileDimensions(p.name);
          return (
            <div
              key={`mobile-${p.name}-${idx}`}
              className={`flex items-center justify-center ${blur ? 'filter blur-sm opacity-60' : ''}`}
            >
              <div className="relative" style={{ width: `${dims.width}px`, height: `${dims.height}px` }}>
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

export default function FeaturedCommunityProjectsSection(): React.ReactElement {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="partners" className="w-full bg-[#FFFFFF]">
      <div className="container mx-auto px-4 py-10 md:py-20">

        <div className="text-center mb-10 md:mb-8">
          <div>
            <h2
              className="text-black text-2xl sm:text-3xl lg:text-4xl mb-4 tracking-normal text-center">Our
              Partners</h2>

          </div>
          <p className="text-black text-base max-w-[800px] mx-auto px-2">
            The Cardano Africa Tech Summit is proudly supported by organizations <br /> and communities that believe in
            Africa’s decentralized future.
          </p>
        </div>

        <PartnerSection title="Implementation Partners" partners={implementationPartners} pushRight={true} />

        <PartnerSection title="Media Partners" partners={mediaPartners} blur={false} />

        <PartnerSection title="Featured Community Projects" partners={communityProjects} blur={false} />

        <div className="flex justify-center mx-auto">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex w-[214px] h-11 rounded-md opacity-100 rotate-0 py-[15px] px-[20px] text-center gap-[10px] bg-[#f05a28] justify-center items-center cursor-pointer"
            aria-haspopup="dialog"
          >
            <h4
              className="text-[20px] leading-[14px] tracking-[-0.01em] whitespace-nowrap">
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
