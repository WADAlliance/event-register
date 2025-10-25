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

            <div className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-20 text-center">
                <Image
                    src="/CATS-Website-Banner .jpg"
                    alt="Cardano Africa Tech Summit 2026"
                    priority
                    quality={100}
                    className=" "
                    sizes="100vw"
                    fill

                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />

                <div className="relative z-10 max-w-4xl">
                    <p className="mb-3 text-sm font-medium tracking-widest text-gray-300 md:text-base">
                        February 11–13 • Nairobi, Kenya
                    </p>
                    <h1 className="font-custom mb-6 text-4xl font-bold leading-tight text-white md:text-6xl lg:text-8xl">
                        Cardano Africa<br />Tech Summit 2026
                    </h1>
                    <p className="mx-auto mb-10 max-w-2xl text-sm leading-relaxed text-gray-200 md:text-lg">
                        Join developers, entrepreneurs, and community leaders shaping the future of decentralized technology across Africa.
                    </p>
                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <Link
                            href="/register"
                            className="rounded-md bg-[var(--color-wada-c)] px-8 py-3 font-medium text-white transition hover:bg-[var(--color-wada-c)]/90"
                        >
                            Register for the Summit
                        </Link>
                        <Link
                            href="/hackathon"
                            className="rounded-md border border-gray-500 px-8 py-3 font-medium text-white transition hover:bg-[var(--color-wada-c)] hover:text-black"
                        >
                            Join in on the Hackathon
                        </Link>
                    </div>
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
