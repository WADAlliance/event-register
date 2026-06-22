"use client";

import { useState, useEffect } from "react";
import { Bell, X } from "lucide-react";
import Link from "next/link";

export default function LiveNotificationPopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        // Target time: Feb 13, 2026 at 10:00 AM EAT (UTC+3)
        // EAT is UTC+3. So 10:00 AM EAT is 07:00 AM UTC.
        // 2026-02-13T07:00:00Z
        const targetDate = new Date("2026-02-13T10:00:00+03:00");

        const updateVisibility = () => {
            const now = new Date();
            const diff = targetDate.getTime() - now.getTime();

            if (diff <= 0) {
                // Event has started or passed
                setIsVisible(false);
                return;
            }

            // Event is in the future
            setIsVisible(true);

            // Calculate time left string (e.g., "in 2 hours", "in 45 minutes")
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

            if (hours > 0) {
                setTimeLeft(`in ${hours} ${hours === 1 ? "hour" : "hours"}`);
            } else {
                setTimeLeft(`in ${minutes} ${minutes === 1 ? "minute" : "minutes"}`);
            }
        };

        // Initial check
        updateVisibility();

        // Check every minute
        const interval = setInterval(updateVisibility, 60000);

        return () => clearInterval(interval);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
            <div className="bg-[#0f0f0f] text-white p-4 rounded-xl shadow-2xl border border-gray-800 flex items-center gap-6 min-w-[320px] max-w-sm relative">
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute -top-2 -right-2 bg-gray-800 rounded-full p-1 text-gray-400 hover:text-white"
                >
                    <X size={14} />
                </button>

                <div className="flex-1">
                    <h3 className="text-base font-medium text-blue-400 mb-0.5">Live {timeLeft}</h3>
                    <p className="text-sm text-gray-400">13 February at 10:00</p>
                </div>

                <Link
                    href="https://youtube.com/live/gDpQvSGeEZg?feature=share"
                    target="_blank"
                    className="bg-white text-black hover:bg-gray-200 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors"
                >
                    <Bell className="w-4 h-4" />
                    Notify me
                </Link>
            </div>
        </div>
    );
}
