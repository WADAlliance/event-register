import AboutSection from "@/components/landing/AboutSection";
import SummitSchedule from "@/components/landing/SummitSchedule";
import SpeakerSection from "@/components/landing/SpeakerSection";
import PartnersSection from "@/components/landing/PartnersSection";
import VideoSection from "@/components/landing/VideoSection";

export default function SummitPage() {
    return (
        <main className="relative flex flex-col items-center justify-center text-white">
          <section id="video" className="relative w-full">
            <VideoSection />
          </section>

          <section id="about">
            <AboutSection />
          </section>

          <section id="speakers" className='relative w-full'>
            <SpeakerSection />
          </section>

          <section id="partners" className='relative w-full'>
            <PartnersSection/>
          </section>

          <section id="schedule" className='relative w-full'>
            <SummitSchedule />
          </section>

        </main>
    );
}
