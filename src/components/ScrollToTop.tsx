"use client";

import React, { useState, useEffect } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [opacity, setOpacity] = useState(0);

  const toggleVisibility = () => {
    const scrollTop = window.scrollY;
    const threshold = 500;
    
    if (scrollTop > threshold) {
      setIsVisible(true);
      const fadeStart = 300;
      if (scrollTop < fadeStart) {
        setOpacity(scrollTop / fadeStart);
      } else {
        setOpacity(1);
      }
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-24 right-8 z-40 rounded-full bg-gradient-to-br from-[#7FB843] to-[#6a9334] hover:from-[#74a83a] hover:to-[#5d8a2a] text-white p-3 shadow-lg hover:shadow-2xl transition-all duration-300 ease-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7FB843] group cursor-pointer"
      aria-label="Scroll back to top"
      title="Back to top"
      style={{
        opacity: opacity,
        pointerEvents: isVisible ? "auto" : "none",
      }}
    >
      <svg
        className="w-6 h-6 transition-transform duration-300 group-hover:-translate-y-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2.5}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  );
}
