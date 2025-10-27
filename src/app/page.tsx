'use client';

import '@/styles/globals.css';
import EventsPopup from '@/components/EventsPopup';
import HeroSection from '@/components/landing/HeroSection';
import AboutSection from '@/components/landing/AboutSection';

const LandingPage: React.FC = () => {
    return (
        <div className="relative px-2 md:px-0">
            <EventsPopup />
            <HeroSection />
            <AboutSection />
        </div>
    );
};

export default LandingPage;
