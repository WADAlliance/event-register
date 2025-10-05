"use client";

import React, { useEffect, useState } from "react";
import { Overlay } from "./Overlay";
import '@/styles/globals.css';
import { CardContent } from "./CardContent";

type StakeholderType = {
    id: string;
    name: string;
    description: string;
    video: string;
    extraInfo: string; // markdown string
    disabled: boolean;
};

type StakeholderCardGridProps = {
    stakeholderTypes: StakeholderType[];
    onCardClick: (id: string) => void;
};

const colorClasses: Record<string, string> = {
    "wada-a": "border-wada-a shadow-wada-a",
    "wada-b": "border-wada-b shadow-wada-b",
    "wada-c": "border-wada-c shadow-wada-c",
    "wada-d": "border-wada-d shadow-wada-d",
};

export default function StakeholderCardGrid({
    stakeholderTypes,
    onCardClick,
}: StakeholderCardGridProps) {
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [expandedCards, setExpandedCards] = useState<string[]>([]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768); // md breakpoint
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleCard = (id: string) => {
        setExpandedCards((prev) =>
            prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
        );
    };

    const colors = ["wada-a", "wada-b", "wada-c", "wada-d"];

    return (
        <div className="relative h-full">
            {/* Dim background overlay */}
            <Overlay hoveredId={!isMobile && hoveredId || ""} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 z-20 gap-6 h-full items-end">
                {stakeholderTypes.map((type, index) => {
                    const color = colors[index % colors.length];
                    const isExpanded = expandedCards.includes(type.id);

                    return (
                        <div
                            key={type.id}
                            onClick={() => type.disabled ? null :onCardClick(type.id)}
                            className={`
                                relative h-[450px] md:h-full border-${color} overflow-hidden flex flex-col ${disabled ? '' : 'cursor-pointer'} justify-end transition-all duration-300 rounded-4xl border-1
                                ${!isMobile && hoveredId === type.id ? `scale-105 z-30 shadow-2xl ${colorClasses[color]}` : "z-10"}
                            `}
                            onMouseEnter={(e) => {
                                if (type.disabled) return;
                                setHoveredId(type.id);
                                const video = e.currentTarget.querySelector("video");
                                video?.play();
                            }}
                            onMouseLeave={(e) => {
                                if (type.disabled) return;
                                setHoveredId(null);
                                const video = e.currentTarget.querySelector("video");
                                video?.pause();
                            }}
                        >
                            <video
                                muted
                                loop
                                playsInline
                                className="absolute top-0 left-0 w-full h-full object-cover"
                            >
                                <source src={type.video} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>

                            { type.disabled ? 
                                <div className={`absolute top-0 left-0 w-full h-full bg-black/50 z-10 flex justify-center items-center`}>
                                    <p className="text-white text-center justify-center items-center text-2xl font-bold">Coming soon</p>
                                </div>
                                : null
                            }

                            <CardContent
                                name={type.name}
                                description={type.description}
                                extraInfo={type.extraInfo}
                                isHovered={isMobile ? isExpanded : hoveredId === type.id}
                                disabled={type.disabled}
                            />

                            {/* Mobile-only expand button */}
                            <button
                                className="md:hidden absolute bottom-4 right-0 transform -translate-x-1/2 px-3 py-2 bg-white text-black rounded-xl z-20"
                                onClick={(e) => {
                                    if (type.disabled) return;
                                    e.stopPropagation(); // prevent triggering onCardClick
                                    toggleCard(type.id);
                                }}
                            >
                                {isExpanded ? "Collapse" : "Expand"}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
