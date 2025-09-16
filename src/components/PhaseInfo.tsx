"use client";

import { useEffect, useState } from "react";

type PhaseInfo = {
    start: string;
    end: string;
    purpose: string;
};

type EnrolmentData = {
    phases: Record<string, PhaseInfo>;
};

export const PhaseInfo = () => {
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

    return (
        <div>
            {phaseInfo ? (
                <div className="text-sm text-gray-400 flex flex-col items-center">
                    <div className="flex items-center">
                        <span className="text-gray-100 font-semibold">{phaseInfo.name}</span>
                        <span className="mx-2">|</span>
                        <span className="text-gray-400">
                            {phaseInfo.start.toLocaleDateString("en-GB", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            })}{" "}
                            –{" "}
                            {phaseInfo.end.toLocaleDateString("en-GB", {
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
