export default function AboutSection() {
    return (
        <section className="py-16 md:py-24 relative left-1/2 right-1/2 -translate-x-1/2 w-screen bg-black text-white z-10">
            <div className="w-full max-w-[1440px] mx-auto flex flex-col items-center justify-center px-6 md:px-12">
                {/* Text Content */}
                <div className="max-w-3xl text-center font-poppins">
                    <h2
                        className="flex flex-row items-center justify-center gap-[6px] md:gap-[10px] mb-8 font-extrabold"
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

                    <div className="space-y-6">
                        <p className="text-base md:text-lg leading-relaxed text-white">
                            The Cardano Africa Tech Summit (CATS) is a flagship annual event uniting innovation, builders,
                            and community leaders across Africa and beyond.
                        </p>

                        <p className="text-base md:text-lg leading-relaxed text-white">
                            CATS2026 centers on innovation, collaboration, and real-world impact through blockchain technology.
                            The summit showcases how Cardano&apos;s ecosystem empowers local solutions with global reach.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
