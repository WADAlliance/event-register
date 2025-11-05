import Image from 'next/image';
import RegisterButton from '@/components/RegisterButton';
import Link from "next/link";

export default function HeroSection() {
    return (
        <div className="relative flex min-h-screen flex-col self-stretch items-center justify-center px-6 pt-20 text-center">
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
                <h1 className="font-telegraf mb-2 font-bold leading-tight text-white text-7xl">
                    Cardano Africa<br />Tech Summit 2026
                </h1>
                <p className="mx-auto mb-2 text-base font-normal font-poppins  max-w-2xl  leading-7 text-gray-200 md:mt-14 ">
                    Join developers, entrepreneurs, and community leaders shaping   <br className="hidden lg:block" /> the future of decentralized technology across Africa.
                </p>
                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                    <RegisterButton />
                    <Link
                        href="/hackathon"
                        className="rounded-md border-wada-c border px-8 py-3 font-medium font-poppins transition"
                    >
                        <p className='text-wada-c hover:text-white'> Join in on the Hackathon</p> 
                    </Link>
                </div>
            </div>
        </div>
    );
}
