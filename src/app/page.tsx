'use client';

import '@/styles/globals.css';

import HeroSection from '@/components/landing/HeroSection';
import LocationSection from '@/components/landing/LocationSection';
import { useEffect, useRef } from "react";
import "plyr/dist/plyr.css";
import AboutSection from "@/components/landing/AboutSection";
import SpeakerSection from "@/components/landing/SpeakerSection";
import SponsorsSection from "@/components/landing/SponsorsSection";
import FeaturedCommunityProjectsSection from "@/components/landing/FeaturedCommunityProjectsSection";
import SummitProgram from '@/components/landing/SummitProgram';
import FAQSection from "@/components/landing/FAQ-section";

function VideoEmbed() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<any>(null);
  const videoId = "50BwDlujbsg";

  useEffect(() => {
    let mounted = true;

    async function init() {
      if (!containerRef.current) return;

      try {
        const PlyrModule = await import("plyr");
        const Plyr = (PlyrModule as any).default ?? PlyrModule;

        if (playerRef.current) {
          try {
            playerRef.current.destroy();
          } catch (e) { }
          playerRef.current = null;
        }

        const origin = window.location?.origin || (window as any).location;
        const params = new URLSearchParams({
          rel: "0",
          modestbranding: "1",
          playsinline: "1",
          controls: "1",
          enablejsapi: "1",
          mute: "1",
          autoplay: "1",
          origin: origin,
        });

        containerRef.current.innerHTML = "";
        const wrapper = document.createElement("div");
        wrapper.className = "plyr__video-embed";

        const iframe = document.createElement("iframe");
        iframe.setAttribute("src", `https://www.youtube.com/embed/${videoId}?${params.toString()}`);
        iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen");
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("allowfullscreen", "");
        iframe.style.width = "100%";
        iframe.style.height = "100%";

        wrapper.appendChild(iframe);
        containerRef.current.appendChild(wrapper);

        playerRef.current = new Plyr(wrapper, {
          controls: ["play", "progress", "mute", "volume", "fullscreen"],
          clickToPlay: false,
          autoplay: true,
          poster: "/LinkedIn-Live-Updated-Banner.jpg",
          youtube: {
            rel: 0,
            modestbranding: 1,
            playsinline: 1,
            enablejsapi: 1,
            origin: origin,
          },
        });

        try {
          if (playerRef.current?.on) {
            playerRef.current.on("ready", () => {
              try {
                if (typeof playerRef.current.muted === "boolean") {
                  playerRef.current.muted = true;
                }
                if (typeof playerRef.current.volume === "function") {
                  playerRef.current.volume(0);
                } else if (typeof playerRef.current.volume === "number") {
                  playerRef.current.volume = 0;
                }

                try {
                  const poster = wrapper.querySelector(".plyr__poster");
                  if (poster && poster.parentNode) poster.parentNode.removeChild(poster);
                } catch (e) { }

                try {
                  const playResult = playerRef.current.play && playerRef.current.play();
                  if (playResult && typeof playResult.then === "function") {
                    playResult.catch(() => {
                    });
                  }
                } catch (e) {
                  setTimeout(() => {
                    try {
                      playerRef.current.play && playerRef.current.play();
                    } catch (e) { }
                  }, 200);
                }
              } catch (e) { }
            });

            playerRef.current.on("playing", () => {
              try {
                setTimeout(() => {
                  if (containerRef.current) {
                    containerRef.current.classList.add("is-playing");
                  }
                }, 500);
              } catch (e) { }
            });

            playerRef.current.on("ended", () => {
              try {
                if (typeof playerRef.current.restart === "function") {
                  playerRef.current.restart();
                  playerRef.current.play && playerRef.current.play();
                } else {
                  if (typeof playerRef.current.currentTime === "number") {
                    playerRef.current.currentTime = 0;
                  } else if (typeof playerRef.current.currentTime === "function") {
                    try { playerRef.current.currentTime(0); } catch (e) { }
                  }
                  playerRef.current.play && playerRef.current.play();
                }
              } catch (e) { }
            });
          }
        } catch (e) { }

        if (!mounted) {
          try {
            playerRef.current.destroy();
          } catch (e) { }
          playerRef.current = null;
        }
      } catch (err) {
        console.error("[VideoEmbed] Plyr init failed:", err);
      }
    }

    init();

    return () => {
      mounted = false;
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (e) { }
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <section className="video-edge">
      <div className="video-embed-wrapper">
        <div ref={containerRef} className="video-plyr-container" />
      </div>
    </section>
  );
}

const LandingPage: React.FC = () => {
  return (
    <>
      <div className="relative px-2 md:px-0 pt-16">
        <section id="video" className="relative w-full">
          <VideoEmbed />
        </section>

        <HeroSection />

        <section id="about">
          <AboutSection />
        </section>

        <section id="venue">
          <LocationSection />
        </section>

        <section id="speakers" className="relative w-full">
          <SpeakerSection />
        </section>

        <SponsorsSection />

        <FeaturedCommunityProjectsSection />

        <section id="schedule" className="relative w-full">
          <SummitProgram />
        </section>

        <FAQSection />
      </div>
    </>
  );
};

export default LandingPage;
