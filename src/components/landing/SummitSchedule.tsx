"use client";

import React, { useState } from "react";

type DateCard = {
  id: string;
  dayLabel: string;
  dateLabel: string;
  iso: string;
};

const DATES: DateCard[] = [
  { id: "d1", dayLabel: "Day 01", dateLabel: "February 11, 2026", iso: "2026-02-11" },
  { id: "d2", dayLabel: "Day 02", dateLabel: "February 12, 2026", iso: "2026-02-12" },
  { id: "d3", dayLabel: "Day 03", dateLabel: "February 13, 2026", iso: "2026-02-13" },
];

type ScheduleRow = {
  time: string;
  session: string;
  speaker: string;
};

const SAMPLE_SCHEDULE: Record<string, ScheduleRow[]> = {
  "2026-02-11": [
    { time: "9:00 AM – 9:30 AM", session: "Opening Ceremony", speaker: "—" },
    { time: "9:30 AM – 10:15 AM", session: "Keynote: The Future of Blockchain in Africa", speaker: "Dr. Pres Tone" },
    { time: "10:30 AM – 12:00 PM", session: "Panel Discussion: Building Scalable Solutions", speaker: "Tech Founders Panel" },
    { time: "12:00 PM – 1:00 PM", session: "Lunch & Networking", speaker: "—" },
    { time: "1:00 PM – 3:00 PM", session: "Workshop: Decentralized Apps Made Simple", speaker: "Blockchain Centre Team" },
    { time: "3:15 PM – 4:30 PM", session: "Community Highlights", speaker: "Local Ambassadors" },
    { time: "4:30 PM – 5:00 PM", session: "Closing Remarks", speaker: "Host" },
  ],
  "2026-02-12": [
    { time: "9:00 AM", session: "Recap & Welcome", speaker: "Host Team" },
    { time: "9:30 AM", session: "Keynote: Building for Africa", speaker: "Guest Speaker" },
    { time: "11:00 AM", session: "Panel: Funding & Growth", speaker: "VCs & Founders" },
    { time: "12:30 PM", session: "Lunch Break", speaker: "—" },
    { time: "1:30 PM", session: "Breakout Sessions", speaker: "Multiple" },
    { time: "3:00 PM", session: "Workshop: Identity", speaker: "Blockchain Centre Team" },
    { time: "4:30 PM", session: "Close Day 2", speaker: "Summit Team" },
  ],
  "2026-02-13": [
    { time: "9:00 AM", session: "Opening Day 3", speaker: "Host Team" },
    { time: "10:00 AM", session: "Keynote: Interoperability", speaker: "Industry Lead" },
    { time: "11:30 AM", session: "Roundtables", speaker: "Community Leaders" },
    { time: "12:30 PM", session: "Lunch Break", speaker: "—" },
    { time: "1:30 PM", session: "Hackathon Demos", speaker: "Participants" },
    { time: "3:30 PM", session: "Awards & Closing", speaker: "Summit Committee" },
  ],
};

export default function SummitSchedule() {
  const [active, setActive] = useState<string>(DATES[0].iso);
  const rows = SAMPLE_SCHEDULE[active] || [];

  return (
    <section className="w-full bg-white">
      {/* Main container */}
      <div className="w-full h-auto px-[15px] py-[30px] md:px-[20px] md:py-[50px] overflow-x-visible">
        {/* Header */}
        <div className="flex items-center justify-center mb-6">
          <div
            className="flex items-center justify-center gap-[10px]"
            aria-hidden
          >
            <span className="text-4xl leading-none font-extrabold font-telegraf text-black">Summit</span>
            <span
              className="text-4xl leading-none font-extrabold font-telegraf text-white"
              style={{
                backgroundColor: "#80B741",
                padding: "5px 10px",
                height: 50,
                display: "inline-flex",
                alignItems: "center",
                boxSizing: "border-box",
                opacity: 1,
              }}
            >
              Schedule
            </span>
          </div>
        </div>

        {/* Light green background container */}
        <div className="mx-auto w-full bg-cardano-c-light rounded-lg pb-4 relative">

          {/* Date cards section - FIXED MOBILE OVERFLOW - BLURRED */}
          <div className="w-full mb-8 blur-md">
            <div className="flex justify-start md:justify-center gap-0 overflow-x-auto no-scrollbar px-2">
              {DATES.map((d) => {
                const isActive = d.iso === active;
                return (
                  <button
                    key={d.id}
                    onClick={() => setActive(d.iso)}
                    aria-pressed={isActive}
                    className={`relative flex flex-col items-start select-none cursor-pointer min-w-[140px] md:min-w-[200px] p-3 md:p-4 mb-4 transition-all duration-200 ease-in-out text-black border border-gray-200
                            ${isActive
                        ? "bg-cardano-c text-white after:content-[''] after:absolute after:left-1/2 after:-bottom-[10px] " +
                        "after:-translate-x-1/2 after:border-x-[10px] after:border-x-transparent " +
                        "after:border-t-[10px] after:border-t-[#80B741] after:z-10"
                        : "bg-white"}`}
                  >
                    <div className={`font-normal font-poppins`}>
                      {d.dayLabel}
                    </div>
                    <div className={`text-xs md:text-sm mt-1 font-telegraf ${isActive ? "text-white" : "text-black"}`}>
                      {d.dateLabel}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Table section */}
          <div className="max-w-[1200px] mx-auto bg-white rounded-sm border border-gray-200 relative">
            {/* Blurred table wrapper (only this part is blurred) */}
            <div className="w-full overflow-x-auto no-scrollbar z-10 blur-md" style={{ WebkitOverflowScrolling: "touch" }}>
              <table className="min-w-[800px] w-full border-collapse bg-white border border-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-xl font-extrabold text-black font-telegraf border border-gray-200 bg-white sticky top-0 z-20 text-left">
                      Time
                    </th>
                    <th className="px-4 py-3 text-xl font-extrabold text-black font-telegraf border border-gray-200 bg-white sticky top-0 z-20 text-left">
                      Session
                    </th>
                    <th className="px-4 py-3 text-xl font-extrabold text-black font-telegraf border border-gray-200 bg-white sticky top-0 z-20 text-left">
                      Speaker
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-4 py-6 font-poppins font-medium text-black border border-gray-200 whitespace-nowrap">
                        {r.time}
                      </td>
                      <td className="px-4 py-6 font-poppins font-medium text-black border border-gray-200">
                        {r.session}
                      </td>
                      <td className="px-4 py-6 font-poppins font-medium text-black border border-gray-200 whitespace-nowrap">
                        {r.speaker}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}