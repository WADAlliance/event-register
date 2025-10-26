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

            <div className="relative flex min-h-screen flex-col self-stretch items-center justify-center px-6 pt-20 text-center">
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
                    <h1 className="font-custom mb-2 text-[46px] font-bold leading-tight text-white md:text-6xl lg:text-8xl">
                        Cardano Africa<br />Tech Summit 2026
                    </h1>
                    <p className="mx-auto mb-2 text-base font-normal font-poppins  max-w-2xl  leading-7 text-gray-200 md:mt-14 ">
                        Join developers, entrepreneurs, and community leaders shaping   <br className="hidden lg:block" /> the future of decentralized technology across Africa.
                    </p>
                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <RegisterButton />
                        <Link
                            href="/hackathon"
                            className="rounded-md border-[var(--color-wada-c)] border px-8 py-3 font-medium transition hover:bg-[var(--color-wada-c)] hover:text-white"
                        >
                          <p className='text-[var(--color-wada-c)] '> Join in on the Hackathon</p> 
                        </Link>
                    </div>
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
