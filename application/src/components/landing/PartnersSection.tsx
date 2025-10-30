import React from 'react';
import Image from 'next/image';

interface PartnerLogo {
  name: string;
  logo: string;
  alt?: string;
}

const partners: PartnerLogo[] = [
  { name: 'PRISMA', logo: '/brand_assets/Prisma.svg', alt: 'PRISMA Logo' },
  { name: 'WADA', logo: '/brand_assets/Wada-RGB_Logo-Full-Alternative-Color.svg', alt: 'WADA Logo' },
  { name: 'Blockchain Centre NBO', logo: '/brand_assets/Cardano Africa Summit Logo-17.png', alt: 'Blockchain Centre NBO Logo' },
  { name: 'Lido Nation', logo: '/brand_assets/lido-nation.svg', alt: 'Lido Nation Logo' },
  { name: 'Catalyst Africa Town Hall', logo: '/brand_assets/Cardano Africa Summit Logo-12.png', alt: 'Catalyst Africa Town Hall Logo' },
  { name: 'Remo Start', logo: '/brand_assets/Cardano Africa Summit Logo-15.png', alt: 'Remo Start Logo' },
];

const getDimensions = (name: string, isMainRow: boolean) => {
  if (isMainRow) {
    switch(name) {
      case 'PRISMA': return { width: 240, height: 54 };
      case 'WADA': return { width: 260, height: 65 };
      case 'Blockchain Centre NBO': return { width: 248, height: 70 };
      case 'Lido Nation': return { width: 250, height: 68 };
      case 'Catalyst Africa Town Hall': return { width: 260, height: 78 };
      case 'Remo Start': return { width: 250, height: 68 };
      default: return { width: 250, height: 68 };
    }
  } else {
    switch(name) {
      case 'PRISMA': return { width: 140, height: 32 };
      case 'WADA': return { width: 160, height: 40 };
      case 'Blockchain Centre NBO': return { width: 148, height: 45 };
      case 'Lido Nation': return { width: 150, height: 43 };
      case 'Catalyst Africa Town Hall': return { width: 160, height: 52 };
      case 'Remo Start': return { width: 150, height: 43 };
      default: return { width: 150, height: 43 };
    }
  }
};

const getMobileDimensions = (name: string) => {
  switch(name) {
    case 'PRISMA': return { width: 200, height: 45 };
    case 'WADA': return { width: 220, height: 55 };
    case 'Blockchain Centre NBO': return { width: 208, height: 60 };
    case 'Lido Nation': return { width: 210, height: 58 };
    case 'Catalyst Africa Town Hall': return { width: 220, height: 68 };
    case 'Remo Start': return { width: 210, height: 58 };
    default: return { width: 210, height: 58 };
  }
};

export default function PartnersSection(): React.ReactElement {
  return (
    <section className="w-full bg-[#0E0E0E]">
      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* Title and Description */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">Our Partners</h2>
          <p className="text-gray-400 max-w-[800px] mx-auto px-4">
            We&apos;re proud to collaborate with organizations driving blockchain
            <br className="hidden md:block" /> 
            adoption and innovation across Africa and beyond.
          </p>
        </div>

        {/* Desktop Partners Grid */}
        <div className="hidden md:block">
          {/* First Row */}
          <div className="flex items-center justify-between px-[200px] mb-8">
            <div className="flex items-center justify-center">
              <Image
                src="/brand_assets/Prisma.svg"
                alt="PRISMA Logo"
                width={240}
                height={54}
                className="object-contain"
                quality={100}
                priority
              />
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/brand_assets/Wada-RGB_Logo-Full-Alternative-Color.svg"
                alt="WADA Logo"
                width={260}
                height={65}
                className="object-contain"
                quality={100}
                priority
              />
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/brand_assets/Cardano Africa Summit Logo-17.png"
                alt="Blockchain Centre Logo"
                width={248}
                height={70}
                className="object-contain"
                quality={100}
                priority
              />
            </div>
          </div>

          {/* Second Row */}
          <div className="flex items-center justify-between px-[200px]">
            <div className="flex items-center justify-center">
              <Image
                src="/brand_assets/lido-nation.svg"
                alt="Lido Nation Logo"
                width={250}
                height={68}
                className="object-contain"
                quality={100}
                priority
              />
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/brand_assets/Cardano Africa Summit Logo-12.png"
                alt="Catalyst Africa Town Hall Logo"
                width={260}
                height={78}
                className="object-contain"
                quality={100}
                priority
              />
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/brand_assets/Cardano Africa Summit Logo-15.png"
                alt="Remo Start Logo"
                width={250}
                height={68}
                className="object-contain"
                quality={100}
                priority
              />
            </div>
          </div>
        </div>

        {/* Mobile Partners Stack */}
        <div className="md:hidden flex flex-col items-center space-y-10 mb-12">
          {partners.map((p) => {
            const dims = getMobileDimensions(p.name);
            return (
              <div 
                key={`mobile-${p.name}`} 
                className="flex items-center justify-center w-full"
              >
                <Image
                  src={p.logo}
                  alt={p.alt ?? p.name}
                  width={dims.width}
                  height={dims.height}
                  className="object-contain"
                  quality={100}
                  priority
                />
              </div>
            );
          })}
        </div>

        {/* Sponsors Bar */}
        <div className="w-full mt-10">
          <div className="w-full text-center py-3 text-sm text-gray-400">
            CATS 2026 Summit sponsors
          </div>
          {/* Mobile Sponsors */}
          <div className="w-full md:hidden overflow-x-auto whitespace-nowrap">
            <div className="inline-flex items-center gap-8 px-4 py-4">
              {partners.map((p) => {
                const dims = getDimensions(p.name, false);
                return (
                  <div key={`mobile-sponsor-${p.name}`} className="flex-shrink-0">
                    <Image
                      src={p.logo}
                      alt={p.alt ?? p.name}
                      width={dims.width}
                      height={dims.height}
                      className="object-contain"
                      quality={100}
                      priority
                    />
                  </div>
                );
              })}
            </div>
          </div>
          {/* Desktop Sponsors */}
          <div className="hidden md:flex w-full justify-center items-center">
            <div
              className="flex items-center justify-between"
              style={{
                width: '1400px',
                padding: '0 200px',
              }}
            >
              {partners.map((p) => {
                const dims = getDimensions(p.name, false);
                return (
                  <div key={`sponsor-${p.name}`} className="flex items-center justify-center">
                    <Image
                      src={p.logo}
                      alt={p.alt ?? p.name}
                      width={dims.width}
                      height={dims.height}
                      className="object-contain"
                      quality={100}
                      priority
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
