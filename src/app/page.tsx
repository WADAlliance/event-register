'use client';

import '@/styles/globals.css';

import LocationSection from '@/components/landing/LocationSection';
import { useEffect, useRef } from "react";
import "plyr/dist/plyr.css";
import HeroSection from "@/components/landing/HeroSection";
import AboutSection from "@/components/landing/AboutSection";
import VoicesSection from "@/components/landing/VoicesSection";
import SponsorsSection from "@/components/landing/SponsorsSection";
import FAQSection from "@/components/landing/FAQ-section";
import JoinWaitlistSection from "@/components/landing/JoinWaitlistSection";
import LiveNotificationPopup from "@/components/LiveNotificationPopup";

const LandingPage: React.FC = () => {
  return (
    <>
      <div className="relative px-2 md:px-0 pt-16">
        <LiveNotificationPopup />
        <HeroSection />

        <section id="about">
          <AboutSection />
        </section>

        <section id="venue">
          <LocationSection />
        </section>

        <section id="speakers" className="relative w-full">
          <VoicesSection />
        </section>

        <SponsorsSection />

        <section id="faqs">
          <FAQSection />
        </section>

        <JoinWaitlistSection />
      </div>
    </>
  );
};

export default LandingPage;
