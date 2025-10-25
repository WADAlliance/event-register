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
            

                {/* Full-bleed About section */}
                <section className="relative left-1/2 right-1/2 -translate-x-1/2 w-screen bg-black text-white">
                    <div className="w-full max-w-[1440px] mx-auto flex flex-col md:flex-row items-center md:items-center md:justify-start h-auto md:h-[290px] rounded-2xl shadow-lg px-6 md:px-0 md:pl-[202px] md:pr-[28px] py-8 md:py-[30px]">
                        {/* Left Side — Logo */}
                        <div className="flex flex-col justify-center items-center gap-[15px] flex-none md:w-[302px] mb-6 md:mb-0 md:mr-[100px] md:h-[252px] md:pr-[2.915px] md:pb-[1.861px]">
                            <Image
                                src="/Cardano-RGB_Logo-Icon-White.svg"
                                alt="Cardano Logo"
                                width={302}
                                height={252}
                                className="w-full h-auto object-contain"
                                sizes="(max-width: 768px) 120px, 302px"
                                style={{ aspectRatio: '302 / 252' }}
                            />
                        </div>

                        {/* Right Side — Text Content */}
                        <div className="md:w-[922px] pl-0 md:pl-6 md:mr-[60px] font-poppins">
                            <h2 className="text-[25px] font-normal leading-[25px] flex items-center gap-2">
                                <span className="bg-[#F6B118] text-black px-[15px] py-[8px] rounded-md font-normal">About</span>
                                the Summit
                            </h2>

                            <div className="mt-4 max-w-[640px]">
                                <p className="text-[15px] leading-[28px] text-[--white]">
                                    The Cardano Africa Tech Summit (CATS) is a flagship annual event uniting innovation, builders,
                                    and community leaders across Africa and beyond.
                                </p>

                                <p className="mt-4 text-[15px] leading-[28px] text-[--white]">
                                    CATS2026 centers on innovation, collaboration, and real-world impact through blockchain technology.
                                    The summit showcases how Cardano's ecosystem empowers local solutions with global reach.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
        </div>
    );
};

export default LandingPage;
