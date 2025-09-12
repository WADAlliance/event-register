"use client";

import React, { useState } from "react";
import { Overlay } from "./Overlay";
import '@/styles/globals.css'
import { CardContent } from "./CardContent";

type StakeholderType = {
  id: string;
  name: string;
  description: string;
  video: string;
  extraInfo: string; // markdown string
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

    const colors = ["wada-a", "wada-b", "wada-c", "wada-d"];
    
    return (
        <div className="relative h-full ">
            {/* Dim background overlay */}
            <Overlay hoveredId={hoveredId || ""} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 z-20 gap-6 h-full items-end">
                {stakeholderTypes.map((type, index) => {
                    const color = colors[index % colors.length];
                    return (
                        <div
                            key={type.id}
                            onClick={() => onCardClick(type.id)}
                            className={`relative border-${color} overflow-hidden flex flex-col h-full cursor-pointer justify-end transition-transform duration-300 rounded-4xl border-1
                                ${hoveredId === type.id ? `scale-105 z-30 shadow-2xl ${colorClasses[color]}` : "z-10"}
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

                            <CardContent 
                                name={type.name} 
                                description={type.description} 
                                extraInfo={type.extraInfo} 
                                isHovered={hoveredId===type.id}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

