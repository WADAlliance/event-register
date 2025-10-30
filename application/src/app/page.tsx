'use client';

import '@/styles/globals.css';
import EventsPopup from '@/components/EventsPopup';
import HeroSection from '@/components/landing/HeroSection';
import AboutSection from '@/components/landing/AboutSection';
import SpeakerSection from '@/components/landing/SpeakerSection';
import HackathonSection from '@/components/landing/HackathonSection';
import LocationSection from '@/components/landing/LocationSection';
import PartnersSection from '@/components/landing/PartnersSection';

const LandingPage: React.FC = () => {
    return (
        <div className="relative px-2 md:px-0">
            <EventsPopup/>
            <HeroSection/>
            <AboutSection/>
            <SpeakerSection/>
            <HackathonSection/>
            <LocationSection/>
            <PartnersSection/>
        </div>
    );
};

export default LandingPage;
