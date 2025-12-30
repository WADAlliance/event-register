"use client";

import React from "react";
import Image from "next/image";

export default function TripPlanner() {
  return (
    <div className="w-full">
      <section
        className="relative w-full text-white overflow-hidden"
        style={{
          width: "100%",
          minHeight: "440px",
          padding: "120px 20px 40px",
          transform: "rotate(0deg)",
          opacity: 1,
        }}
      >
        {/* Full-bleed background image */}
        <div
          className="absolute inset-0 -z-10 bg-center bg-cover"
          style={{
            backgroundImage: "url('/addon.jpg')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundSize: "cover",
          }}
          aria-hidden
        />
        
        <div className="relative z-10 w-[1440px] max-w-full mx-auto px-6 text-center flex flex-col h-full">
          <div>
            <div className="uppercase text-sm tracking-widest text-gray-300 mb-6">EXCLUSIVE EXPERIENCES</div>
            <h1 className="hero-title mb-4">CATS Trip Planner</h1>
            <p className="max-w-3xl mx-auto text-lg text-gray-300 mb-8">
              Elevate your journey with curated experiences that take you deeper into <br /> the heart of Africa&apos;s wilderness. Two extraordinary
              opportunities to <br />witness the raw beauty of Kenya&apos;s most iconic landscapes, thoughtfully <br />designed to complement your four-day
              adventure.
            </p>
          </div>

          <div className="mt-auto mb-4">
            <div
              role="button"
              tabIndex={0}
              aria-label="Scroll to Choose Your Adventure"
              className="scroll-bounce cursor-pointer"
              onClick={() => {
                const el = document.getElementById('choose-adventure');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  const el = document.getElementById('choose-adventure');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              style={{
                fontFamily: "'Poppins'",
                fontWeight: 400,
                fontStyle: "normal",
                fontSize: "13px",
                lineHeight: "28px",
                letterSpacing: "0.32em",
                textAlign: "center",
                color: "rgba(209, 213, 219, 1)",
              }}
            >
              DISCOVER MORE
            </div>
            <div className="mt-2 text-2xl text-gray-300 arrow-bounce">⌄</div>
          </div>
        </div>
      </section>

      <section id="choose-adventure" className="w-full bg-white text-black py-16">
        <div className="max-w-[1440px] mx-auto px-4">
          <h2 className="choose-title">Choose Your Adventure</h2>
          <div className="h-4" aria-hidden />
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">Each add-on is all‑inclusive and seamlessly integrated into your itinerary.</p>

          {/* Row 1 — Image Left / Content Right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[70px] items-start mb-16">
            <div className="w-full">
              <Image
                src="/Frame%202147207770.png"
                alt="Dawn in the Wild"
                width={575.5}
                height={462}
                style={{ transform: "rotate(0deg)", opacity: 1 }}
                className="object-cover rounded-2xl"
                priority={false}
              />
            </div>

            <div className="flex flex-col justify-center">
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "139px",
                  height: "44px",
                  gap: "10px",
                  paddingTop: "15px",
                  paddingRight: "20px",
                  paddingBottom: "15px",
                  paddingLeft: "20px",
                  borderRadius: "32px",
                    border: "1px solid #EB5626",
                    color: "#EB5626",
                    background: "#fff0ec",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: "12px",
                  textTransform: "uppercase",
                  opacity: 1,
                  boxSizing: "border-box",
                }}
                className="mb-3"
              >
                ADD-ON ONE
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold mb-3">Dawn in the Wild</h3>
              <div className="flex items-center gap-3 mb-4 text-sm">
                <svg
                  className="w-5 h-5 text-wada-a shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>

                <span className="date-telegraf text-wada-a">February 13th</span>

                <span className="inline-block h-4 w-px bg-gray-300/60" aria-hidden />

                <span className="text-gray-400">Early Morning</span>
              </div>
              <p className="text-gray-700 mb-4">
                Begin your day with a breathtaking early morning game drive <br />through Nairobi National Park, where the city skyline forms a <br />stunning backdrop to lions, rhinos, and giraffes in their natural <br />habitat. As the African sun rises, enjoy a gourmet breakfast in <br /> the heart of the park, surrounded by the sights and sounds of <br />the wilderness.
              </p>
              <ul className="grid grid-cols-2 gap-y-2 gap-x-6 list-disc pl-5 text-gray-700 mb-4">
                <li>Guided game drive</li>
                <li>Bush breakfast</li>
                <li>Park entry fees</li>
                <li>Transport included</li>
              </ul>
              <div className="mt-2">
                <div
                  style={{
                    background: "#e6f6e8",
                    width: "505.5px",
                    height: "89px",
                    padding: "20px",
                    borderRadius: "12px",
                    transform: "rotate(0deg)",
                    opacity: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    boxSizing: "border-box",
                  }}
                >
                  <div className="panel-header-telegraf text-green-700">All‑Inclusive Experience</div>
                  <div className="text-gray-700 text-sm">Every detail taken care of, from sunrise to your return</div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2 — Content Left / Image Right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[70px] items-start">
            <div className="flex flex-col justify-center order-2 md:order-1">
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "139px",
                  height: "44px",
                  gap: "10px",
                  paddingTop: "15px",
                  paddingRight: "20px",
                  paddingBottom: "15px",
                  paddingLeft: "20px",
                  borderRadius: "32px",
                  border: "1px solid #EB5626",
                  color: "#EB5626",
                  background: "#fff0ec",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: "12px",
                  textTransform: "uppercase",
                  opacity: 1,
                  boxSizing: "border-box",
                }}
                className="mb-3"
              >
                ADD-ON TWO
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold mb-3">Maasai Mara Overnight</h3>
              <div className="flex items-center text-sm text-amber-500 mb-4">
                <svg className="w-4 h-4 mr-2 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                <span className="date-telegraf text-wada-a">February 14–15</span>
                <span className="ml-2 text-gray-500"> | Overnight Stay</span>
              </div>
              <p className="text-gray-700 mb-4">
              Experience the magic of the Maasai Mara with an exclusive <br />one-night safari adventure. Departing on February 14th,<br /> immerse yourself in one of Africa&apos;s most spectacular wildlife <br /> reserves. From sweeping savannas to abundant wildlife, this <br /> overnight journey offers an intimate encounter with nature&apos;s  <br />grandeur, returning refreshed on the 15th.
              </p>
              <ul className="grid grid-cols-2 gap-y-2 gap-x-6 list-disc pl-5 text-gray-700 mb-4">
                <li>Luxury accommodation</li>
                <li>Multiple game drives</li>
                <li>All meals included</li>
                <li>Expert guides</li>
                <li>Round-trip transport</li>
                <li>Park fees covered</li>
              </ul>
              <div className="mt-2">
                <div
                  style={{
                    background: "#e6f6e8",
                    width: "505.5px",
                    height: "89px",
                    padding: "20px",
                    borderRadius: "12px",
                    transform: "rotate(0deg)",
                    opacity: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    boxSizing: "border-box",
                  }}
                >
                  <div className="panel-header-telegraf text-green-700">Complete All‑Inclusive Package</div>
                  <div className="text-gray-700 text-sm">Seamlessly integrated into Day 4 of the Summit</div>
                </div>
              </div>
            </div>

            <div className="w-full order-1 md:order-2">
              <Image
                src="/Frame%2018.png"
                alt="Maasai Mara Overnight"
                width={575.5}
                height={462}
                style={{ transform: "rotate(0deg)", opacity: 1 }}
                className="object-cover rounded-2xl"
                priority={false}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
