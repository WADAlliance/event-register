import Image from 'next/image';
import Link from 'next/link';
import RegisterForSummitButton from "@/components/RegisterForSummitButton";

export default function HeroSection() {
    return (
        <div className="relative flex flex-col self-stretch items-center justify-center px-6 pt-[100px] pb-[200px] text-center w-full h-[610px] opacity-100 overflow-hidden">
            <Image
                src="/Website-Banner.jpg"
                alt="Cardano Africa Tech Summit 2026"
                priority
                quality={100}
                className="absolute inset-0 w-full h-full object-cover object-center z-0"
                sizes="100vw"
                fill
            />

            <div className="relative z-10 max-w-4xl">
                <p className="mb-3 text-sm font-medium font-poppins tracking-widest text-gray-300 md:text-base">
                    February 11–13 • Nairobi, Kenya
                </p>
                <h1 className="font-telegraf font-[800] mb-0 text-white text-[80px] leading-[66px] tracking-[0em] text-center">
                    <span>Cardano Africa</span>
                    <span className="block">Tech Summit 2026</span>
                </h1>
                <p className="mx-auto mt-2 mb-1 text-base font-normal font-poppins max-w-2xl leading-7 text-gray-200">
                    Join developers, entrepreneurs, and community leaders shaping <br className="hidden lg:block" /> the future of decentralized technology across Africa.
                </p>
                                <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4 mt-2">
                                    
                                    <RegisterForSummitButton text="Register for the Summit" className="bg-[#ff4b26] hover:bg-[#ff4b26]/90" />

                                            <Link
                                                href="#"
                                                className="inline-flex items-center justify-center gap-[10px] w-[185px] h-[44px] rounded-[6px] border border-[#9cff2f] border-[1px] px-[20px] py-[15px] font-semibold font-poppins transition hover:bg-[#9cff2f]/10 text-[#9cff2f] opacity-100"
                                            >
                                                <p className="text-[#71b157] font-telegraf font-[800] text-[16px] leading-[14px] tracking-[-0.01em]">Become a Partner</p>
                                            </Link>
                                </div>
            </div>
        </div>
    );
}
