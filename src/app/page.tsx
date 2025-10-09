'use client';

import Image from 'next/image';
import '@/styles/globals.css';
import RegisterButton from '@/components/RegisterButton';
import EventsPopup from '@/components/EventsPopup';
import { Countdown } from '@/components/Countdown';
import { PhaseInfo } from '@/components/PhaseInfo';
import Link from "next/link";

const LandingPage: React.FC = () => {
    return (
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
            

            <main className="max-w-4xl mx-auto md:mt-10 space-y-12 z-10">
                <Card title="Africa Unchained">
                    <p>
                        Not any summit.
                        A first of its kind; a summit that is also a journey.
                        From village firesides to digital ledgers, Africa steps forward not as a backdrop, but as an Architect.
                    </p>
                </Card>

                <Card title="Enter the Village">
                    <p className="mt-4">The journey begins{" "}
                    <Link href="/hackathon" className="font-bold !text-wada-b hover:!text-wada-c !underline">
		        here
		    </Link>
		    , with the Hackathon Portal.</p>
                    <p>We invite communities of <span className='font-bold text-wada-a'>developers, artists, storytellers, mentors, and builders</span> to join.</p>
                    <p>Here, problems are named by communities, and solutions are shaped into code, art, and practice.</p>
                    <p>The hackathon is your first step into CATS26 - your entry into the Village.</p>
                </Card>

		<Card title="Save the Dates">
		    <ul className="list-disc pl-5 space-y-3">
	                <li>
		            <span className="font-bold text-wada-a">October 2 – December 15, 2025: </span> 
	                    Community-driven hackathons across Africa, guided by regenerative principles. 
	                    Five winning teams are selected to advance.
			</li>
	                <li>
            	            <span className="font-bold text-wada-a">January 2026: </span> 
			        Travel preparation and coordination for the winning teams and hub leads to Nairobi.
		        </li>
		        <li>
	            	    <span className="font-bold text-wada-a">February 1 – 10, 2026: </span> 
           		    In-person hackathon intensive in Nairobi for Kenya teams.
			</li>
		        <li>
	                    <span className="font-bold text-wada-a">February 11 – 13, 2026: </span> 
		            Cardano Africa Tech Summit (CATS26) — hackathon winning project showcases, governance and ecosystem dialogues, cultural experiences, and global connections.
	                </li>
	                <li>
            		    <span className="font-bold text-wada-a">March 2026 – August 2026: </span> 
		            In-person incubation style intensives for winning teams, moving from prototype to scaling.
	                </li>
		    </ul>
	        </Card>


            </main>

            <div className='flex flex-col items-center mt-8'>
                <RegisterButton />
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
