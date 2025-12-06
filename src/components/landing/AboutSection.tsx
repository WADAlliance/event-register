import { span } from 'motion/react-client';
import Image from 'next/image';

export default function AboutSection() {
    return (
        <section className="p-10 relative left-1/2 right-1/2 -translate-x-1/2 w-screen bg-black text-white z-10">
            <div className="w-full max-w-[1440px] mx-auto flex flex-col md:flex-row items-center md:items-center md:justify-start h-auto md:h-[400px] rounded-2xl shadow-lg px-6 md:px-0 md:pl-[202px] md:pr-[28px]">
                {/* Left Side — Logo */}
                <div className="flex flex-col justify-center items-center gap-[15px] flex-none md:w-[302px] mb-6 md:mb-0 md:mr-[100px] md:h-[252px] md:pr-[2.915px] md:pb-[1.861px]">
                    <Image
                        src="/brand_assets/cardano-logo.svg"
                        width={240}
                        height={240}
                        alt="Cardano Logo"
                        priority
                    />
                </div>

                {/* Right Side — Text Content */}
                <div className="md:w-[922px] font-poppins">
                    <h2
                        className="flex flex-row items-center gap-[6px] md:gap-[10px] w-full md:w-[720px] h-auto md:h-[49px] rotate-0 opacity-100 text-center font-extrabold"
                        style={{
                            fontFamily: '"PP Telegraf", "Telegraf", sans-serif',
                            fontWeight: 900,
                            fontStyle: 'normal',
                            lineHeight: '39px',
                            letterSpacing: '0%',
                            WebkitFontSmoothing: 'antialiased'
                        }}
                    >
                        <span className="inline-flex items-center justify-center bg-cardano-b text-black px-[12px] md:px-[18px] h-[40px] md:h-[50px] rounded-sm leading-none text-3xl">
                            About
                        </span>
                        <span className="text-white leading-none text-3xl md:text-[32px] whitespace-nowrap">
                            the Summit
                        </span>
                    </h2>

                    <div className="mt-4 max-w-full md:max-w-[640px]">
                        <p className="text-[15px] leading-[28px] text-white">
                            The Cardano Africa Tech Summit (CATS) is a flagship event uniting innovation, builders,
                            and community leaders across Africa and beyond.
                        </p>

                        <p className="mt-4 text-[15px] leading-[28px] text-white">
                            CATS2026 centers on innovation, collaboration, and real-world impact through blockchain technology.
                            The summit showcases how Cardano&apos;s ecosystem empowers local solutions with global reach.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
