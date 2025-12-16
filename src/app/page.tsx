'use client';

import '@/styles/globals.css';
import Script from 'next/script';
import EventsPopup from '@/components/EventsPopup';
import HeroSection from '@/components/landing/HeroSection';
import LocationSection from '@/components/landing/LocationSection';

import { useEffect, useRef } from "react";
import "plyr/dist/plyr.css";
import AboutSection from "@/components/landing/AboutSection";
import SpeakerSection from "@/components/landing/SpeakerSection";
import SponsorsSection from "@/components/landing/SponsorsSection";
import PartnersSection from "@/components/landing/PartnersSection";
import SummitProgram from '@/components/landing/SummitProgram';
import FAQSection from '@/components/landing/FAQ-section';

function VideoEmbed() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = useRef<any>(null);
  const videoId = "NTm_P3TEAqc";

  useEffect(() => {
    let mounted = true;

    async function init() {
      if (!containerRef.current) return;

      try {
        const PlyrModule = await import("plyr");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const Plyr = (PlyrModule as any).default ?? PlyrModule;

        if (playerRef.current) {
          try {
            playerRef.current.destroy();
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (e) {}
          playerRef.current = null;
        }

        // Build iframe with autoplay + mute (required for autoplay in most browsers)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

        // Initialize Plyr on the wrapper
        playerRef.current = new Plyr(wrapper, {
          controls: ["play", "progress", "mute", "volume", "fullscreen"],
          clickToPlay: false,
          autoplay: true,
          youtube: {
            rel: 0,
            modestbranding: 1,
            playsinline: 1,
            enablejsapi: 1,
            origin: origin,
          },
        });

        // Ensure the player is muted and force playback to remove thumbnail/poster
        try {
          if (playerRef.current?.on) {
            playerRef.current.on("ready", () => {
              try {
                // force mute (redundant with mute=1 but defensive)
                if (typeof playerRef.current.muted === "boolean") {
                  playerRef.current.muted = true;
                }
                if (typeof playerRef.current.volume === "function") {
                  playerRef.current.volume(0);
                } else if (typeof playerRef.current.volume === "number") {
                  playerRef.current.volume = 0;
                }

                // remove Plyr poster node if present so thumbnail doesn't flash
                try {
                  const poster = wrapper.querySelector(".plyr__poster");
                  if (poster && poster.parentNode) poster.parentNode.removeChild(poster);
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                } catch (e) {}

                // attempt to play (some browsers require user gesture unless muted)
                try {
                  const playResult = playerRef.current.play && playerRef.current.play();
                  // if play returns a promise, catch/recover
                  if (playResult && typeof playResult.then === "function") {
                    playResult.catch(() => {
                      /* ignore autoplay rejection */
                    });
                  }
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                } catch (e) {
                  // as fallback, try a slight delay then play
                  setTimeout(() => {
                    try {
                      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                      playerRef.current.play && playerRef.current.play();
                      // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    } catch (e) {}
                  }, 200);
                }
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
              } catch (e) {}
            });

            // Loop behavior (optional) — restarts when ended
            playerRef.current.on("ended", () => {
              try {
                if (typeof playerRef.current.restart === "function") {
                  playerRef.current.restart();
                  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                  playerRef.current.play && playerRef.current.play();
                } else {
                  if (typeof playerRef.current.currentTime === "number") {
                    playerRef.current.currentTime = 0;
                  } else if (typeof playerRef.current.currentTime === "function") {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    try { playerRef.current.currentTime(0); } catch (e) {}
                  }
                  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                  playerRef.current.play && playerRef.current.play();
                }
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
              } catch (e) {}
            });
          }
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {}

        if (!mounted) {
          try {
            playerRef.current.destroy();
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (e) {}
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
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {}
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
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-5R2RDB4X');`}
      </Script>
      <noscript>
        <iframe 
          src="https://www.googletagmanager.com/ns.html?id=GTM-5R2RDB4X"
          height="0" 
          width="0" 
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
      <div className="relative px-2 md:px-0">
        <section id="video" className="relative w-full">
          <VideoEmbed />
        </section>

        <EventsPopup/>

        <HeroSection/>

        <section id="about">
          <AboutSection />
        </section>

        <section id="venue">
          <LocationSection/>
        </section>

        <section id="speakers" className="relative w-full">
          <SpeakerSection />
        </section>

        <SponsorsSection />

        <PartnersSection/>

        <SummitProgram />

        <FAQSection />

        <section id="schedule" className="relative w-full">
         
        </section>
      </div>
    </>
  );
};


export default LandingPage;
