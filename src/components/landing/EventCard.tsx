"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import "plyr/dist/plyr.css";

export default function EventCard() {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 22, minutes: 53, seconds: 0 });
    const containerRef = useRef<HTMLDivElement | null>(null);
    const playerRef = useRef<any>(null);
    const videoId = "gDpQvSGeEZg";

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
                if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
                return prev;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        let mounted = true;

        async function init() {
            if (!containerRef.current) return;

            try {
                const PlyrModule = await import("plyr");
                const Plyr = (PlyrModule as any).default ?? PlyrModule;

                if (playerRef.current) {
                    try {
                        playerRef.current.destroy();
                    } catch (e) { }
                    playerRef.current = null;
                }

                const origin = window.location?.origin || (window as any).location;
                const params = new URLSearchParams({
                    rel: "0",
                    modestbranding: "1",
                    playsinline: "1",
                    controls: "1",
                    enablejsapi: "1",
                    mute: "0",
                    autoplay: "0",
                    origin: origin,
                });

                containerRef.current.innerHTML = "";
                const wrapper = document.createElement("div");
                wrapper.className = "plyr__video-embed w-full h-full";

                const iframe = document.createElement("iframe");
                iframe.setAttribute("src", `https://www.youtube.com/embed/${videoId}?${params.toString()}`);
                iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen");
                iframe.setAttribute("frameborder", "0");
                iframe.setAttribute("allowfullscreen", "");
                iframe.style.width = "100%";
                iframe.style.height = "100%";

                wrapper.appendChild(iframe);
                containerRef.current.appendChild(wrapper);

                playerRef.current = new Plyr(wrapper, {
                    controls: ["play", "progress", "mute", "volume", "fullscreen"],
                    clickToPlay: true,
                    autoplay: true,
                    muted: true,
                    youtube: {
                        rel: 0,
                        modestbranding: 1,
                        playsinline: 1,
                        enablejsapi: 1,
                        origin: origin,
                        start: 135,
                    },
                });

                if (!mounted) {
                    try {
                        playerRef.current.destroy();
                    } catch (e) { }
                    playerRef.current = null;
                }
            } catch (err) {
                console.error("[EventCard] Plyr init failed:", err);
            }
        }

        init();

        return () => {
            mounted = false;
            if (playerRef.current) {
                try {
                    playerRef.current.destroy();
                } catch (e) { }
                playerRef.current = null;
            }
        };
    }, []);

    return (
        <div
            className="relative w-full max-w-[704px] aspect-video sm:h-[389px] rounded-[23px] overflow-hidden shadow-2xl bg-black"
            style={{ isolation: 'isolate' }}
        >
            {/* Video Container */}
            <div className="absolute inset-0 z-10">
                <div ref={containerRef} className="w-full h-full" />
            </div>

        </div>
    );
}
