import AboutSection from "@/components/landing/AboutSection";
import SummitSchedule from "@/components/landing/SummitSchedule";
import SpeakerSection from "@/components/landing/SpeakerSection";
import PartnersSection from "@/components/landing/PartnersSection";

export default function SummitPage() {
    return (
        <main className="relative flex flex-col items-center justify-center text-white">
          <section>
            <AboutSection />
          </section>

          <section className='relative w-full'>
            <SpeakerSection />
          </section>

          <section className='relative w-full'>
            <PartnersSection/>
          </section>

          <section className='relative w-full'>
            <SummitSchedule />
          </section>

        </main>
    );
}
