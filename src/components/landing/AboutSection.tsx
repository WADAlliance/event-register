import Image from 'next/image';

export default function AboutSection() {
    return (
        <section id="about" className="relative z-10 bg-white py-24 md:py-[120px] px-5 md:px-[133px]">
            <div className="w-full max-w-[1200px] mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-[100px] relative z-20">

                {/* Text Content */}
                <div className="flex-1 text-left">
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-[2px] bg-[#ff4b26]" />
                            <span className="text-[#ff4b26] font-bold uppercase tracking-wider text-sm">Summit Recap</span>
                        </div>

                        <h2 className="text-black text-[44px] md:text-[72px] font-telegraf leading-[1.1] tracking-tighter font-black max-w-[600px]">
                            Africa&apos;s Blockchain Moment Has Arrived
                        </h2>

                        <div className="space-y-8 max-w-[580px]">
                            <p className="text-gray-700 text-lg md:text-xl leading-relaxed font-normal">
                                CATS 2026 delivered on every promise, and then some. Three days of raw energy, visionary talks, and collaborative building brought Africa&apos;s most vibrant blockchain community together under one roof in Nairobi.
                            </p>

                            <p className="text-gray-700 text-lg md:text-xl leading-relaxed font-normal">
                                From a packed hackathon floor at Sarit Expo Centre to the closing ceremony at Tamarind Tree Hotel, CATS 2026 proved that the continent&apos;s decentralized future isn&apos;t coming, it&apos;s already being built. Recordings, resources, and highlights are now available in the member portal.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Logo/Visual Content */}
                <div className="shrink-0 w-full md:w-[500px] flex items-center justify-center">
                    <div className="relative w-full aspect-square">
                        <Image
                            src="/brand_assets/cardano-logo-black.svg"
                            alt="Cardano Logo"
                            fill
                            priority
                            className="object-contain opacity-100"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}
