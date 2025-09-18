'use client';

import Image from 'next/image';
import '@/styles/globals.css';
import RegisterButton from '@/components/RegisterButton';
import EventsPopup from '@/components/EventsPopup';
import { Countdown } from '@/components/Countdown';
import { PhaseInfo } from '@/components/PhaseInfo';

const LandingPage: React.FC = () => {
    return (
        <div className="min-h-screen">
            <div className="relative pb-40 px-2 md:px-0">
                <EventsPopup />

                <div className="py-18 md:py-25">
                    <div className="flex flex-col items-center md:w-1/3 mx-auto z-10 space-y-3 md:space-y-4 backdrop-blur-3xl rounded-4xl border border-neutral-600 py-4 md:py-10 px-1 bg-black/40 md:bg-transparent">
                        <Countdown />
                        <Image
                            src="/Cardano-RGB_Logo-Icon-White.svg"
                            alt="Event card"
                            className="px-10 md:px-0 md:w-3/5 p-6"
                            width={350}
                            height={350}
                        />
                        <h1 className='font-custom font-bold text-lg md:text-3xl text-center'>CARDANO AFRICA TECH SUMMIT</h1>
                        <p className='font-custom md:text-xl text-center'>Nairobi, February 11 — 13, 2026</p>
                        <PhaseInfo />
                        <RegisterButton />
                    </div>
                </div>
                

                <main className="max-w-4xl mx-auto md:mt-20 space-y-12 z-10 mb-8">
                    <Card title="Africa Unchained">
                        <p>
                            Not any summit.
                            A first of its kind; a summit that is also a journey.
                            From village firesides to digital ledgers, Africa steps forward not as a backdrop, but as an Architect.
                        </p>
                    </Card>

                    <Card title="The Journey">
                        <p>The path begins in September 2025</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><span className='font-bold text-wada-b'>Amuse Bouche:</span> a small taste of what is to come</li>
                            <li><span className='font-bold text-wada-b'>Enrollment:</span> participants gather, hub leaders trained, roles defined</li>
                            <li><span className='font-bold text-wada-b'>Problem Statements:</span> communities name what calls for change before any code is written</li>
                            <li><span className='font-bold text-wada-b'>Hackathons:</span> across the continent, 40 projects emerge from place-based inquiry and Cardano tools</li>
                            <li><span className='font-bold text-wada-b'>Summit:</span> the top 5 projects are brought to Nairobi to be shared with the world</li>
                            <li><span className='font-bold text-wada-b'>Beyond:</span> those 5 receive 3–6 months of incubation, moving from prototype to scaling</li>
                        </ul>
                    </Card>

                    <Card title="Why It Matters">
                        <p className='italic'>We are uncovering the principles of regeneration in place for the place to remember itself</p>
                        <p>CATS26 is the first summit in Africa to be shaped this way; not a single event, but a living process</p>
                        <p>It is technology guided by culture</p>
                        <p>It is Africa remembering itself in code, art, and community</p>
                    </Card>

                    <Card title="Enter the Village">
                        <p className="mt-4">The journey begins <span className='font-bold text-wada-b'>here</span>, with the Hackathon Portal.</p>
                        <p>We invite communities of <span className='font-bold text-wada-b'>developers, artists, storytellers, mentors, and builders</span> to join.</p>
                        <p>Here, problems are named by communities, and solutions are shaped into code, art, and practice.</p>
                        <p>The hackathon is your first step into CATS26 - your entry into the Village.</p>
                    </Card>
                </main>

                <div className='flex flex-col items-center'>
                    <RegisterButton className='backdrop-blur-sm'/>
                </div>
            </div>
        </div>
    );
};

const Card: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="backdrop-blur-3xl border-1 border-neutral-600 shadow-2xl rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="space-y-3">{children}</div>
    </div>
);

export default LandingPage;
