import Image from 'next/image';

export default function AboutSection() {
    return (
        <section id="about" className="relative z-10 bg-white py-24 md:py-[100px] px-5 md:px-[133px]">
            <div className="w-full max-w-[1200px] mx-auto flex flex-col md:flex-row gap-8 md:gap-[110px] relative z-20">
                
                <div className="shrink-0 w-full md:w-[560.5px] flex items-center justify-center md:justify-start">
                    <div className="w-full flex items-center justify-center md:justify-start">
                        <div id="logo" className="w-[320px] h-40 md:w-[560.5px] md:h-[290px] flex items-center justify-center">
                            <Image
                                src="/brand_assets/cardano-logo-black.svg"
                                width={560.5}
                                height={290}
                                alt="Cardano Logo"
                                priority
                                className="w-[320px] h-40 md:w-[560.5px] md:h-[290px] object-contain"
                            />
                        </div>
                    </div>
                </div>

                
                <div className="flex-1 flex items-center">
                        <div className="max-w-[720px] w-full text-left md:text-left md:-ml-5 wrap-break-word overflow-x-hidden">
                            <h2 className="flex items-center gap-3 justify-center md:justify-start">
                                <span className="relative z-30 inline-flex items-center justify-center bg-[#f6b118] text-black min-w-[140px] h-[49px] px-4 rounded-sm text-2xl sm:text-3xl lg:text-4xl font-extrabold font-telegraf">About</span>
                                <span className="text-black text-2xl sm:text-3xl lg:text-4xl font-extrabold font-telegraf">the Summit</span>
                            </h2>

                            <p
                    className="mt-6 text-gray-700 text-left md:text-left wrap-break-word"style={{fontFamily: "'Poppins', sans-serif",fontWeight: 400,fontStyle: 'Regular',fontSize: '18px',lineHeight: '30px',letterSpacing: '0%',}}
                    >
                        The Cardano Africa Tech Summit (CATS) is designed as a
                        full-circle innovation journey, which not only showcases
                        Cardano and related projects, but also activates them in
                        real time through mentorship, onboarding, and practical       
                        collaboration.
                            </p>

                    </div>
                </div>
            </div>
        </section>
    );
}
