"use client";

import React, { useState } from "react";

type StakeholderType = {
  id: string;
  name: string;
  description: string;
  video: string;
};

type StakeholderCardGridProps = {
  stakeholderTypes: StakeholderType[];
  onCardClick: (id: string) => void;
};

export default function StakeholderCardGrid({
    stakeholderTypes,
    onCardClick,
}: StakeholderCardGridProps) {
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    
    return (
        <div className="relative">
            {/* Dim background overlay */}
            {hoveredId && (
                <div
                    className={`fixed inset-0 bg-black/70 transition-opacity duration-300 z-20 pointer-events-none ${
                    hoveredId ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                />
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 z-20">
                {stakeholderTypes.map((type) => (
                    <div
                        key={type.id}
                        onClick={() => onCardClick(type.id)}
                        className={`relative border-wada-e overflow-hidden flex flex-col h-screen cursor-pointer justify-end transition-transform duration-300
                            ${hoveredId === type.id ? "scale-105 z-30 shadow-2xl" : "z-10"}
                        `}
                        onMouseEnter={(e) => {
                            setHoveredId(type.id);
                            const video = e.currentTarget.querySelector("video");
                            video?.play();
                        }}
                        onMouseLeave={(e) => {
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

                        <div className="p-6 relative z-10 bg-wada-e/90">
                            <h2 className="md:text-2xl font-custom font-bold text-white mb-2 truncate">
                                {type.name}
                            </h2>
                            <p className="font-custom text-gray-300 mb-4 truncate">
                                {type.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

