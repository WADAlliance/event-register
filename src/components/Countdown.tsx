import { useEffect, useState } from "react";
import { RiRadioButtonLine } from "react-icons/ri";

type PhaseInfo = {
    start: string;
    end: string;
    purpose: string;
};

type EnrolmentData = {
    phases: Record<string, PhaseInfo>;
};

export const Countdown = () => {
    const eventDate = new Date("2026-02-11T05:00:00Z"); // 08:00 Kenya = 05:00 UTC
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [phaseInfo, setPhaseInfo] = useState<{
        name: string;
        purpose: string;
        start: Date;
        end: Date;
        status: "active" | "upcoming";
    } | null>(null);    

    useEffect(() => {
        fetch("/data/schedule.json")
            .then((res) => res.json())
            .then((data: EnrolmentData) => {
                const today = new Date();
                const phases = Object.entries(data.phases).map(([name, details]) => ({
                    name,
                    purpose: details.purpose,
                    start: new Date(details.start),
                    end: new Date(details.end),
                }));

                // Find active phase
                const active = phases.find(p => today >= p.start && today <= p.end);
                if (active) {
                    setPhaseInfo({
                        name: active.name,
                        purpose: active.purpose,
                        start: active.start,
                        end: active.end,
                        status: "active",
                    });                    
                    return;
                }

                // If none active, find next
                const upcoming = phases
                    .filter(p => p.start > today)
                    .sort((a, b) => a.start.getTime() - b.start.getTime())[0];

                if (upcoming) {
                    setPhaseInfo({ name: upcoming.name, purpose: upcoming.purpose, start: upcoming.start, end: upcoming.end, status: "upcoming" });
                }
            })
            .catch((err) => console.error("Failed to load enrolment.json:", err));
    }, []);

    useEffect(() => {
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
    }, []);

    return (
        <div className="flex flex-row items-center space-x-4 p-4">
            <RiRadioButtonLine className="w-4 h-4 text-wada-d mr-2 animate-pulse" />

            <div className="font-mono text-gray-100 tracking-wide">
                {`${timeLeft.days.toString().padStart(2, "0")}:${timeLeft.hours
                    .toString()
                    .padStart(2, "0")}:${timeLeft.minutes
                    .toString()
                    .padStart(2, "0")}:${timeLeft.seconds
                    .toString()
                    .padStart(2, "0")}`}
            </div>

            {phaseInfo ? (
                <div className="text-sm text-gray-400 flex flex-col">
                    <div className="flex items-center">
                        <span className="text-gray-100 font-semibold">{phaseInfo.name}</span>
                        <span className="mx-2">|</span>
                        <span className="text-gray-400">
                            {phaseInfo.start.toLocaleDateString(undefined, {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            })}{" "}
                            –{" "}
                            {phaseInfo.end.toLocaleDateString(undefined, {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            })}
                        </span>
                    </div>
                    <p className="text-xs text-wada-a mt-1">{phaseInfo.purpose}</p>
                </div>
            ) : (
                <div className="text-sm text-gray-500 italic">No phases available.</div>
            )}
        </div>
    );
};
