import Image from 'next/image';

export default function LocationSection() {
    const venues = [
        {
            type: "Hackathon",
            status: "Concluded",
            name: "Sarit Expo Centre",
            date: "February 11 – 12, 2026",
            duration: "2 Days In-Person",
            description: "14 teams spent 48 hours building real blockchain solutions. Projects ranged from on-chain identity systems to decentralised agricultural finance platforms. Winners walked away with prize money and mentorship deals.",
            image: "/hackathon.png",
            tagColor: "border-[#ff4b26] text-[#ff4b26]"
        },
        {
            type: "Main Summit",
            status: "Concluded",
            name: "Tamarind Tree Hotel",
            date: "February 13, 2026",
            duration: "1 Day In-Person",
            description: "45 speakers took the stage across keynotes, panels, and workshops. Mary Kerema (Kenya's ICT Secretary) delivered the policy keynote, while Frederik Gregard closed with a vision for Cardano's next chapter in Africa.",
            image: "/summit.png",
            tagColor: "border-[#ff4b26] text-[#ff4b26]"
        }
    ];

    return (
        <section id="venue" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#F6B118]">
            {/* Background Image */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <Image
                    src="/yelloww.png"
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full flex flex-col items-start">
                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-[#ff4b26] font-bold text-lg md:text-xl">— Where It Happened</span>
                    </div>

                    <h2 className="text-black text-[56px] md:text-[84px] font-telegraf font-black leading-[0.95] tracking-tight mb-6">
                        Three Days, Three Experiences
                    </h2>

                    <p className="text-black text-xl md:text-2xl font-normal max-w-4xl leading-snug">
                        CATS 2026 unfolded across iconic Nairobi venues, each one chosen to match the energy of what was built, shared, and celebrated inside.
                    </p>
                </div>

                {/* Venue Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-[1190px]">
                    {venues.map((venue, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-[32px] overflow-hidden shadow-xl flex flex-col md:w-[575px] md:min-h-[493px] opacity-100 rotate-0 transform transition-all hover:bg-black hover:scale-[1.01] duration-300 group cursor-pointer"
                        >
                            {/* Image Container */}
                            <div className="relative aspect-[16/9] w-full">
                                <Image
                                    src={venue.image}
                                    alt={venue.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-6 md:p-8 flex flex-col flex-1">
                                <div className={`inline-flex items-center px-4 py-1.5 rounded-full border ${venue.tagColor} text-sm font-bold mb-4 w-fit`}>
                                    {venue.type} · {venue.status}
                                </div>

                                <h3 className="text-black text-3xl font-telegraf font-black mb-1 group-hover:text-white transition-colors duration-300">{venue.name}</h3>
                                <p className="text-gray-500 text-sm font-medium mb-4 group-hover:text-gray-400 transition-colors duration-300">
                                    {venue.date} · {venue.duration}
                                </p>

                                <p className="text-gray-700 text-base md:text-lg leading-relaxed font-normal group-hover:text-gray-300 transition-colors duration-300">
                                    {venue.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
