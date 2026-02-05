"use client";

import { useEffect, useState } from "react";
import { RiRadioButtonLine } from "react-icons/ri"

export const Countdown = () => {
    const [mounted, setMounted] = useState(false);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        const eventDate = new Date("2026-02-11T05:00:00Z");
        const updateCountdown = () => {
            const now = new Date().getTime();
            const diff = eventDate.getTime() - now;

            setTimeLeft({
                days: Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24))),
                hours: Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24)),
                minutes: Math.max(0, Math.floor((diff / (1000 * 60)) % 60)),
                seconds: Math.max(0, Math.floor((diff / 1000) % 60)),
            });
        };

        updateCountdown();
        const timer = setInterval(updateCountdown, 1000);
        return () => clearInterval(timer);
    }, [mounted]);

    return (
        <div className="flex flex-row items-center">
            <RiRadioButtonLine className="w-4 h-4 text-wada-b mr-2 animate-pulse" />

            <div className="font-mono text-gray-100 tracking-wide">
                {`${timeLeft.days.toString().padStart(2, "0")}:${timeLeft.hours
                    .toString()
                    .padStart(2, "0")}:${timeLeft.minutes
                        .toString()
                        .padStart(2, "0")}:${timeLeft.seconds
                            .toString()
                            .padStart(2, "0")}`}
            </div>
        </div>
    );
};
