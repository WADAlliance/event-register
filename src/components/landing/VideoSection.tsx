"use client";

import { useEffect, useRef } from "react";

export default function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let playTimeout: NodeJS.Timeout;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            playTimeout = setTimeout(() => {
              if (video) video.play().catch(() => { });
            }, 3000);
          } else {
            clearTimeout(playTimeout);
            if (video) video.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="relative w-full h-auto md:h-[80vh] flex items-start justify-center overflow-hidden bg-black">
      <div className="relative w-full md:h-full">
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          poster="/CATS26-Banner.png"
          className="w-full h-full object-contain md:object-cover object-top"
        >
          <source src="/videos/cat_2026.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
}
