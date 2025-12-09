'use client';

import '@/styles/globals.css';
import Script from 'next/script';
import EventsPopup from '@/components/EventsPopup';
import HeroSection from '@/components/landing/HeroSection';
import LocationSection from '@/components/landing/LocationSection';
import PartnersSection from '@/components/landing/PartnersSection';

const LandingPage: React.FC = () => {
  return (
    <>
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-5R2RDB4X');`}
      </Script>
      <noscript>
        <iframe 
          src="https://www.googletagmanager.com/ns.html?id=GTM-5R2RDB4X"
          height="0" 
          width="0" 
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
      <div className="relative px-2 md:px-0">
        <EventsPopup/>
        <HeroSection/>
        <LocationSection/>
        <PartnersSection/>

      </div>
    </>
  );
};


export default LandingPage;
