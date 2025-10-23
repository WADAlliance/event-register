// components/BurgerMenu.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function BurgerMenu() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      <button
        onClick={toggleMenu}
        className="lg:hidden flex flex-col gap-1.5 items-center justify-center p-2"
        aria-label="Open menu"
      >
        <div className={`w-6 h-0.5 bg-white transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
        <div className={`w-6 h-0.5 bg-white transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
        <div className={`w-6 h-0.5 bg-white transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      {menuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 w-full h-full overflow-y-auto" onClick={toggleMenu}>
          <div className="backdrop-blur-md bg-black/60 min-h-full p-4 flex items-center justify-center">
            <div className="flex flex-col gap-6 items-center py-20">
              <h1 className="font-telegraf font-bold text-2xl pt-6">CATS</h1>
              <div className="h-[0.25px] bg-neutral-600 w-5/6 mb-4"></div>
              <Link href="/" className="font-poppins text-white text-xl">Home</Link>
              <a href="/enrolment" className="font-poppins text-white text-xl">Enrolment</a>
              <a href="/hackathon" className="font-poppins text-white text-xl">Hackathon</a>
              <a href="/summit" className="font-poppins text-white text-xl">Summit</a>
              <h1 className="font-telegraf font-bold text-2xl pt-6">Resources</h1>
              <div className="h-[0.25px] bg-neutral-600 w-5/6 mb-4"></div>
              <a href="https://docs.wada.org/faqs" className="font-poppins text-white text-xl">FAQs</a>
              <a href="https://docs.wada.org/hub-selection-criteria" className="font-poppins text-white text-xl">Hub Selection Criteria</a>
              <a href="https://docs.wada.org/hackathon-difference" className="font-poppins text-white text-xl text-center">What makes this hackathon different?</a>
              <h1 className="font-telegraf font-bold text-2xl pt-6">Connect</h1>
              <div className="h-[0.25px] bg-neutral-600 w-5/6 mb-4"></div>
              <a href="https://t.me/+RnO5qajd0AVjY2U8" className="font-poppins text-white text-xl">Telegram</a>
              <a href="https://x.com/wada_org" className="font-poppins text-white text-xl">Twitter</a>
              <a href="https://lu.ma/wada" className="font-poppins text-white text-xl">Calendar</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
