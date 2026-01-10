"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function BurgerMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname() || "/";
  const [hash, setHash] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setHash(window.location.hash || '');
    const onHash = () => setHash(window.location.hash || '');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href.startsWith('/#')) {
      const s = `#${href.split('#')[1]}`;
      return pathname === '/' && hash === s;
    }
    return pathname.startsWith(href);
  };

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
              <Link href="/" onClick={() => setMenuOpen(false)} className="font-poppins text-white text-xl" style={{ color: isActive('/') ? '#f05a28' : undefined }}>Home</Link>
              <Link href="/#about" onClick={() => setMenuOpen(false)} className="font-poppins text-white text-xl" style={{ color: isActive('/#about') ? '#f05a28' : undefined }}>About</Link>
              <Link href="/#venue" onClick={() => setMenuOpen(false)} className="font-poppins text-white text-xl" style={{ color: isActive('/#venue') ? '#f05a28' : undefined }}>Venue</Link>
              <Link href="/#speakers" onClick={() => setMenuOpen(false)} className="font-poppins text-white text-xl" style={{ color: isActive('/#speakers') ? '#f05a28' : undefined }}>Speakers</Link>
              <Link href="/#partners" onClick={() => setMenuOpen(false)} className="font-poppins text-white text-xl" style={{ color: isActive('/#partners') ? '#f05a28' : undefined }}>Our Partners</Link>
              <Link href="/#schedule" onClick={() => setMenuOpen(false)} className="font-poppins text-white text-xl" style={{ color: isActive('/#schedule') ? '#f05a28' : undefined }}>Program</Link>
              <Link href="/hackathon" onClick={() => setMenuOpen(false)} className="font-poppins text-white text-xl" style={{ color: isActive('/hackathon') ? '#f05a28' : undefined }}>Hackathon</Link>
              <Link href="/trip-planner" onClick={() => setMenuOpen(false)} className="font-poppins text-white text-xl" style={{ color: isActive('/trip-planner') ? '#f05a28' : undefined }}>Plan Trip</Link>
              <h1 className="font-telegraf font-bold text-2xl pt-6">Resources</h1>
              <div className="h-[0.25px] bg-neutral-600 w-5/6 mb-4"></div>
              <a href="https://docs.wada.org/resources/faqs" className="text-white text-xl">FAQs</a>
              <a href="https://docs.wada.org/Resources/selectionCriteria?_gl=1*8w95ku*_ga*MzMxNjcwNjM2LjE3NjU4OTQzMTU.*_ga_JG98LW4D2T*czE3Njc5NTcwNDEkbzE1JGcwJHQxNzY3OTU3MDQxJGo2MCRsMCRoMA" className="text-white text-xl">Hub Selection Criteria</a>
              <a href="https://docs.wada.org/Resources/hackathonDifference?_gl=1*meexn5*_ga*MzMxNjcwNjM2LjE3NjU4OTQzMTU.*_ga_JG98LW4D2T*czE3Njc5NTcwNDEkbzE1JGcwJHQxNzY3OTU3MDQxJGo2MCRsMCRoMA" className="text-white text-xl text-center">What makes this hackathon different?</a>
              <h1 className="font-custom font-bold text-2xl pt-6">Connect</h1>
              <div className="h-[0.25px] bg-neutral-600 w-5/6 mb-4"></div>
              <a href="https://t.me/+RnO5qajd0AVjY2U8" className="font-poppins text-white text-xl">Telegram</a>
              <a href="https://x.com/wada_org" className="font-poppins text-white text-xl">Twitter</a>
              <a href="https://lu.ma/wada" className="font-poppins text-white text-xl">Calendar</a>
            </div>
          </div>
          <button
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full flex items-center justify-center bg-black/60 text-white backdrop-blur-sm focus:outline-none"
            style={{
              boxShadow: '0 0 10px rgba(255,140,80,0.95), 0 0 22px rgba(255,140,80,0.6)',
              transition: 'box-shadow 200ms ease, transform 150ms ease',
            }}
            onMouseEnter={(e) =>
            (e.currentTarget.style.boxShadow =
              '0 0 18px rgba(255,140,80,1), 0 0 36px rgba(255,140,80,0.7)')
            }
            onMouseLeave={(e) =>
            (e.currentTarget.style.boxShadow =
              '0 0 10px rgba(255,140,80,0.95), 0 0 22px rgba(255,140,80,0.6)')
            }
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
