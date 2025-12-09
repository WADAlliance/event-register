import Image from 'next/image';
import RegisterForSummitButton from "@/components/RegisterForSummitButton";

export default function HeroSection() {
    return (
        <div className="relative flex min-h-screen flex-col self-stretch items-center justify-center px-6 pt-12 md:pt-20 text-center">
            <Image
                src="/brand_assets/Intro-Banner.png"
                alt="Cardano Africa Tech Summit 2026"
                priority
                quality={100}
                className="object-cover object-center"
                sizes="100vw"
                fill
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />

            <div className="relative z-10 max-w-4xl">
                <p className="mb-3 text-sm font-medium font-poppins tracking-widest text-gray-300 md:text-base">
                    February 11–13 • Nairobi, Kenya
                </p>
                <h1 className="font-telegraf mb-0 font-bold leading-[0.95] text-white text-7xl">
                    <span>Cardano Africa</span>
                    <span className="block">Tech Summit 2026</span>
                </h1>
                <p className="mx-auto mt-2 mb-1 text-base font-normal font-poppins max-w-2xl leading-7 text-gray-200">
                    Join developers, entrepreneurs, and community leaders shaping <br className="hidden lg:block" /> the future of decentralized technology across Africa.
                </p>
                <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4 mt-2">
                  {/*<Link*/}
                  {/*  href="/hackathon"*/}
                  {/*  className="rounded-md border-[#ff4b26] border px-8 py-3 font-medium font-poppins transition hover:bg-[#ff4b26]/10"*/}
                  {/*>*/}
                  {/*  <p className='text-white'> Join in on the Hackathon</p>*/}
                  {/*</Link>*/}
                  <RegisterForSummitButton text="Register for the Summit" className="bg-[#ff4b26] hover:bg-[#ff4b26]/90" />


                    {/*<Link*/}
                    {/*    href="#"*/}
                    {/*    className="rounded-md bg-[#ff4b26] hover:bg-[#ff4b26]/90 px-8 py-3 font-medium font-poppins transition"*/}
                    {/*>*/}
                    {/*    <p className='text-white'>Become a Partner</p> */}
                    {/*</Link>*/}
                </div>
            </div>
        </div>
    );
}
