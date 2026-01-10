import Image from 'next/image';
import RegisterForHackathonButton from '../RegisterForHackathonButton';
import Link from 'next/link';
import VenueMap from '../maps/VenueMap';

export default function LocationSection() {
    return (
        <section id="venue" className="relative w-full px-5 py-14 flex flex-col justify-center items-center min-h-screen">
            <Image
                src="/brand_assets/Venue-Location-Banner.jpg"
                alt="Cardano Africa Tech Summit 2026"
                priority
                quality={100}
                className="object-cover object-center"
                sizes="100vw"
                fill
            />
            <div className="relative z-10 w-full max-w-[1800px] flex flex-col justify-start items-center gap-7">
                <div className="flex flex-col justify-start items-center gap-3.5">
                    <div className="inline-flex flex-wrap justify-center items-center">
                        <div className="px-2.5 py-[5px] flex justify-center items-center gap-2.5">
                            <div className="text-center justify-start text-black text-2xl sm:text-3xl lg:text-4xl font-extrabold font-telegraf">Summit</div>
                        </div>
                        <div className="px-2.5 py-[5px] bg-wada-c flex justify-center items-center gap-2.5">
                            <div className="text-center justify-start text-white text-2xl sm:text-3xl lg:text-4xl font-extrabold font-telegraf">Venues</div>
                        </div>
                    </div>
                    <div className="w-full max-w-[566px] px-2.5 inline-flex justify-center items-center gap-2.5">
                        <div className="flex-1 text-center justify-start text-black text-sm sm:text-base font-poppins leading-6 sm:leading-7">A three-day journey from innovation to collaboration.</div>
                    </div>
                </div>
                <div className="w-full inline-flex flex-col lg:flex-row justify-center items-stretch gap-4 lg:gap-2.5">
                    <div data-property-1="hover" className="group w-full lg:w-1/2 p-4 sm:p-6 lg:p-7 bg-white hover:bg-black rounded-[10px] outline outline-1 outline-offset-[-1px] outline-white/20 inline-flex flex-col justify-start items-start gap-2.5 transition-colors duration-300">
                        <div className="self-stretch flex flex-col sm:flex-row justify-center sm:justify-start items-center sm:items-start gap-3">
                            <div className="px-4 sm:px-5 py-2.5 sm:py-3.5 bg-wada-c rounded-[32px] flex justify-center items-center gap-2.5">
                                <div className="text-center text-white text-sm sm:text-base font-extrabold font-telegraf">
                                    Hackathon
                                </div>
                            </div>
                            <div className="flex-1 inline-flex flex-col justify-start items-center sm:items-end">
                                <div className="px-2.5 inline-flex justify-center items-center gap-2.5">
                                    <div className="text-center justify-start text-black group-hover:text-white text-lg sm:text-xl font-extrabold font-telegraf leading-6 sm:leading-7 transition-colors duration-300">11th - 12th Feb 2026</div>
                                </div>
                                <div className="self-stretch px-2.5 inline-flex justify-center sm:justify-end items-center gap-2.5">
                                    <div className="flex-1 text-center sm:text-right justify-start text-black group-hover:text-white text-sm sm:text-base font-poppins leading-6 sm:leading-7 transition-colors duration-300">2 days In-person</div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full text-center text-black group-hover:text-white font-telegraf font-extrabold transition-colors duration-300 text-[clamp(1.5rem,4vw,2.5rem)] sm:text-3xl lg:text-[27px] lg:leading-[39px] lg:tracking-[0px] lg:text-left whitespace-nowrap">
                            Build. Ship. Complete
                        </div>
                        <div className="self-stretch text-center sm:text-left justify-start text-black group-hover:text-white text-sm sm:text-base font-poppins leading-6 sm:leading-7 transition-colors duration-300">
                            A two-day intensive where developers and blockchain enthusiasts Collaborate to Build real solutions. Teams showcase to win grants and mentorship.
                        </div>
                        <div className="self-stretch flex flex-col justify-start items-start gap-5">
                            <VenueMap className="self-stretch h-52 sm:h-64 lg:h-90 rounded-[10px]" mapSrc='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8521203860246!2d36.79944617534973!3d-1.2609658987270305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f176b6e9bd5e5%3A0xcd8fcd4811d8fc0f!2sThe%20Sarit%20Expo%20Centre!5e0!3m2!1sen!2sus!4v1762879826139!5m2!1sen!2sus' />
                            <div className="self-stretch inline-flex justify-center items-center gap-3.5">
                                <div className="px-5 py-2.5 bg-wada-c rounded-md flex justify-center items-center gap-2.5 whitespace-nowrap h-10">
                                    <RegisterForHackathonButton className="font-telegraf font-extrabold text-white duration-300 whitespace-nowrap" text="Register for the Hackathon" />
                                </div>
                            </div>
                            <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-black/10"></div>
                            <div className="self-stretch flex flex-col sm:flex-row justify-center items-center gap-3">
                                <div className="flex-1 inline-flex flex-col justify-center items-center text-center max-w-[640px]">
                                    <div className="px-2.5 inline-flex justify-center items-center gap-2.5">
                                        <div className="text-center text-black group-hover:text-white text-base sm:text-lg font-extrabold font-telegraf leading-5 sm:leading-6 transition-colors duration-300">Open to developers and professionals</div>
                                    </div>
                                    <div className="self-stretch px-2.5 inline-flex justify-center items-center gap-2.5">
                                        <div className="text-center text-black group-hover:text-white text-xs sm:text-sm font-poppins leading-6 sm:leading-7 transition-colors duration-300">Prizes, mentorship & incubation opportunities</div>
                                    </div>
                                </div>
                                <div className="w-full sm:w-auto flex justify-center">
                                    <div className="px-4 sm:px-5 py-2.5 sm:py-3.5 bg-wada-c rounded-[32px] flex justify-center items-center gap-2.5 whitespace-nowrap">
                                        <div className="w-2.5 h-2.5 bg-cardano-c rounded-full"></div>
                                        <div className="text-center text-white text-xs sm:text-sm font-extrabold font-telegraf">Registration Ongoing</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div data-property-1="Default" className="group w-full lg:w-1/2 p-4 sm:p-6 lg:p-7 bg-white hover:bg-black rounded-[10px] outline outline-1 outline-offset-[-1px] outline-white/20 inline-flex flex-col justify-start items-start gap-2.5 transition-colors duration-300">
                        <div className="self-stretch flex flex-col sm:flex-row justify-center sm:justify-start items-center sm:items-start gap-3">
                            <div className="px-4 sm:px-5 py-2.5 sm:py-3.5 bg-cardano-c rounded-[32px] flex justify-center items-center gap-2.5">
                                <div className="text-center text-white text-sm sm:text-base font-extrabold font-telegraf">Main Summit</div>
                            </div>
                            <div className="flex-1 inline-flex flex-col justify-start items-center sm:items-end">
                                <div className="px-2.5 inline-flex justify-center items-center gap-2.5">
                                    <div className="text-center justify-start text-black group-hover:text-white text-lg sm:text-xl font-extrabold font-telegraf leading-6 sm:leading-7 transition-colors duration-300">13 Feb 2026</div>
                                </div>
                                <div className="self-stretch px-2.5 inline-flex justify-center sm:justify-end items-center gap-2.5">
                                    <div className="flex-1 text-center sm:text-right justify-start text-black group-hover:text-white text-sm sm:text-base font-poppins leading-6 sm:leading-7 transition-colors duration-300">1 days,  In-Person</div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full text-black group-hover:text-white font-telegraf font-extrabold transition-colors duration-300 text-[clamp(1.5rem,4vw,2.5rem)] sm:text-3xl lg:text-[27px] lg:leading-[39px] lg:tracking-[0px]">
                            <div className="block lg:hidden text-center">
                                Connect. Learn. <br />Collaborate
                            </div>
                            <div className="hidden lg:block lg:text-left lg:whitespace-nowrap">
                                Connect. Learn. Collaborate
                            </div>
                        </div>
                        <div className="self-stretch text-center sm:text-left justify-start text-black group-hover:text-white text-sm sm:text-base font-poppins leading-6 sm:leading-7 transition-colors duration-300">A day of keynotes, panels and networking focusing on blockchain adoption, developer tooling and ecosystem growth across Africa.</div>
                        <div className="self-stretch flex flex-col justify-start items-start gap-5">
                            <VenueMap className="self-stretch h-52 sm:h-64 lg:h-90 rounded-[10px]" />
                            <div className="self-stretch inline-flex justify-center items-center gap-3.5">
                                <div className="px-5 py-3.5 bg-cardano-c rounded-md flex justify-start items-center gap-2.5">
                                    <Link
                                        href="/summit"
                                        className="font-telegraf font-extrabold text-white duration-300"
                                    >
                                        Get Summit Pass
                                    </Link>
                                </div>
                            </div>
                            <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-black/10"></div>
                            <div className="self-stretch flex flex-col sm:flex-row justify-start items-start sm:items-center gap-3">
                                <div className="flex-1 inline-flex flex-col justify-center items-start">
                                    <div className="px-2.5 inline-flex justify-start items-center gap-2.5">
                                        <div className="text-left justify-start text-black group-hover:text-white text-base sm:text-lg font-extrabold font-telegraf leading-5 sm:leading-6 transition-colors duration-300">Speakers • Panels • Networking</div>
                                    </div>
                                    <div className="self-stretch px-2.5 inline-flex justify-center items-center gap-2.5">
                                        <div className="flex-1 text-center text-black group-hover:text-white text-xs sm:text-sm font-poppins leading-6 sm:leading-7 transition-colors duration-300">Industry leaders & ecosystem<br />founders</div>
                                    </div>
                                </div>
                                <div className="w-full sm:w-auto flex justify-center">
                                    <div className="px-4 sm:px-5 py-2.5 sm:py-3.5 bg-black group-hover:bg-gray-600 rounded-[32px] flex justify-center items-center gap-2.5 whitespace-nowrap transition-colors duration-300">
                                        <div className="w-2.5 h-2.5 bg-cardano-c rounded-full"></div>
                                        <div className="text-center text-white text-xs sm:text-sm font-extrabold font-telegraf">Registration Ongoing</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
