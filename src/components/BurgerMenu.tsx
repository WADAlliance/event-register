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
        <div className="lg:hidden fixed inset-0 z-40 w-full h-full" onClick={toggleMenu}>
          <div className="backdrop-blur-md bg-black/60 p-4 absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <div className="flex flex-col gap-8 items-center">
              <Link href="/" className="text-white text-xl">Home</Link>
              <a href="/hackathon" className="text-white text-xl">Hackathon</a>
              <a href="/summit" className="text-white text-xl">Summit</a>
              <a href="https://t.me/+RnO5qajd0AVjY2U8" className="text-white text-xl">Telegram</a>
              <a href="https://x.com/wada_org" className="text-white text-xl">Twitter</a>
              <a href="https://lu.ma/wada" className="text-white text-xl">Calendar</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
