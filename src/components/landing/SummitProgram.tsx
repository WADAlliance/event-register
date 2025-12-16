export default function SummitProgram() {
  return (
    <section
      id="schedule"
      aria-labelledby="summit-program"
      className="relative w-full"
      style={{
        width: "100%",
        height: "1642px",
        padding: "50px 20px",
        transform: "rotate(0deg)",
        opacity: 1,
      }}
    >
      
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/program -bg.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover",
        }}
        aria-hidden
      />
    
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />

      <div className="relative z-20 w-full mx-auto max-w-[1440px] pt-12 px-5 pb-20">
      {/* Hero frame with background image */}
        <div className="text-center px-6">
          <div className="flex flex-col items-center gap-3">
            <div className="inline-block rounded-xl p-4 bg-black/60">
              <div className="flex items-baseline gap-2">
                <span className="text-white font-extrabold text-3xl md:text-4xl">Summit</span>
                <span
                  style={{
                    backgroundColor: '#80b741',
                    color: '#ffffff',
                    fontFamily: "'PP Telegraf', sans-serif",
                    fontWeight: 800,
                    fontStyle: 'normal',
                    fontSize: '36px',
                    lineHeight: '39px',
                    letterSpacing: '0%',
                    textAlign: 'center',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingLeft: '12px',
                    paddingRight: '12px',
                    paddingTop: '6px',
                    paddingBottom: '6px',
                  }}
                >
                  Program
                </span>
              </div>
            </div>

            <div className="max-w-2xl w-full">
              <div className="rounded-xl p-3 bg-black/60 mx-auto text-white text-sm md:text-base leading-relaxed">
                <p className="m-0" style={{color: '#ffff', fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontStyle: 'normal', fontSize: '16px', lineHeight: '28px', letterSpacing: '0%', textAlign: 'center'}}>A three-day journey from innovation to collaboration, bridging</p>
                <p className="m-0" style={{color: '#ffff', fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontStyle: 'normal', fontSize: '16px', lineHeight: '28px', letterSpacing: '0%', textAlign: 'center'}}>ecosystems and activating real-world solutions.</p>
              </div>
            </div>
          </div>
        </div>
      
      {/* Program section */}
      <div className="text-white py-8 mt-2 bg-transparent relative z-10">
        
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 px-4 md:px-6">
            <div className="rounded-xl p-6 border border-gray-700 bg-black hover:shadow-2xl transition-shadow duration-200 w-full md:h-[183px]" style={{transform: 'rotate(0deg)', opacity: 1}}>
              <div className="flex flex-col gap-2.5 h-full">
                <h3 className="font-extrabold" style={{color: '#eb5626', fontFamily: "'PP Telegraf', sans-serif", fontWeight: 800, fontStyle: 'Ultrabold', fontSize: '24px', lineHeight: '39px', letterSpacing: '0%'}}>
                  Showcase + Utility
                </h3>
                <p className="mt-0 text-white/80" style={{fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontStyle: 'normal', fontSize: '16px', lineHeight: '28px', letterSpacing: '0%'}}>
                  Every featured project gets exposure through either a keynote,
                  panel, or hands-on session tied to real hackathon, tooling, or
                  onboarding moments.
                </p>
              </div>
            </div>

            <div className="rounded-xl p-6 border border-gray-700 bg-black hover:shadow-2xl transition-shadow duration-200 w-full md:h-[183px]" style={{transform: 'rotate(0deg)', opacity: 1}}>
              <div className="flex flex-col gap-2.5 h-full">
                <h3 className="text-yellow-400 font-extrabold" style={{fontFamily: "'PP Telegraf', sans-serif", fontWeight: 800, fontStyle: 'Ultrabold', fontSize: '24px', lineHeight: '39px', letterSpacing: '0%'}}>
                  Hackathon Integration
                </h3>
                <p className="mt-0 text-white/80" style={{fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontStyle: 'normal', fontSize: '16px', lineHeight: '28px', letterSpacing: '0%'}}>
                  Mentors and protocol leads co-design challenge tracks, support
                  developer sprints, and provide infrastructure.
                </p>
              </div>
            </div>

            <div className="rounded-xl p-6 border border-gray-700 bg-black hover:shadow-2xl transition-shadow duration-200 w-full md:h-[155px]" style={{transform: 'rotate(0deg)', opacity: 1}}>
              <div className="flex flex-col gap-2.5 h-full">
                <h3 className="text-blue-400 font-extrabold" style={{fontFamily: "'PP Telegraf', sans-serif", fontWeight: 800, fontStyle: 'Ultrabold', fontSize: '24px', lineHeight: '39px', letterSpacing: '0%'}}>
                  Sponsor Value
                </h3>
                <p className="mt-0 text-white/80" style={{fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontStyle: 'normal', fontSize: '16px', lineHeight: '28px', letterSpacing: '0%'}}>
                  Sponsors gain curated visibility through panel moderation,
                  track ownership, awards, or exclusive roundtables.
                </p>
              </div>
            </div>

            <div className="rounded-xl p-6 border border-gray-700 bg-black hover:shadow-2xl transition-shadow duration-200 w-full md:h-[155px]" style={{transform: 'rotate(0deg)', opacity: 1}}>
              <div className="flex flex-col gap-2.5 h-full">
                <h3 className="text-green-400 font-extrabold" style={{fontFamily: "'PP Telegraf', sans-serif", fontWeight: 800, fontStyle: 'Ultrabold', fontSize: '24px', lineHeight: '39px', letterSpacing: '0%'}}>
                  Cross-Ecosystem Bridge
                </h3>
                <p className="mt-0 text-white/80" style={{fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontStyle: 'normal', fontSize: '16px', lineHeight: '28px', letterSpacing: '0%'}}>
                  Nairobi-based projects ensure the summit isn’t insular, but
                  speaks to broader regional relevance and onboarding potential.
                </p>
              </div>
            </div>
          </div>

        {/* Schedule cards styled with left accent (constrained) */}
        <div className="w-full px-4 md:px-6">
          <div className="flex flex-col gap-8 max-w-full">

            {/* Day 0 */}
            <article className="relative pl-6 md:pl-10 py-6">
              <div className="absolute left-0 top-6 bottom-6 w-1 rounded" style={{backgroundColor: '#eb5626'}} aria-hidden />
              <div className="flex items-center gap-3">
                <div className="text-yellow-400" style={{fontFamily: "'PP Telegraf', sans-serif", fontWeight: 800, fontStyle: 'Ultrabold', fontSize: '20px', lineHeight: '25px', letterSpacing: '0%', textAlign: 'center'}}>Day 0</div>
                <div className="text-white/60 text-xs">Feb 10</div>
              </div>
              <h4 className="text-white font-extrabold text-2xl md:text-3xl mt-3">Hackathon incubation intensive</h4>
              <div className="mt-2" style={{color: '#ffffff', fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontStyle: 'normal', fontSize: '18px', lineHeight: '28px', letterSpacing: '0%'}}>Sarit Expo Centre</div>
              <p className="mt-4" style={{color: '#FFFFFF80', fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontStyle: 'normal', fontSize: '18px', lineHeight: '28px', letterSpacing: '0%'}}>
                Every featured project gets exposure through either a keynote, panel, or hands-on session tied to real hackathon, tooling, or onboarding moments.
              </p>
            </article>

            {/* Day 1 & 2 */}
            <article className="relative pl-6 md:pl-10 py-6">
              <div className="absolute left-0 top-6 bottom-6 w-1 rounded" style={{backgroundColor: '#eb5626'}} aria-hidden />
              <div className="flex items-center gap-3">
                <div className="text-orange-400" style={{fontFamily: "'PP Telegraf', sans-serif", fontWeight: 800, fontStyle: 'Ultrabold', fontSize: '20px', lineHeight: '25px', letterSpacing: '0%', textAlign: 'center'}}>Day 1 & 2</div>
                <div className="text-white/60 text-xs">Feb 11–12</div>
              </div>
              <h4 className="text-white font-extrabold text-2xl md:text-3xl mt-3">Inside Africa Tech Summit</h4>
              <div className="mt-2" style={{color: '#ffffff', fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontStyle: 'normal', fontSize: '18px', lineHeight: '28px', letterSpacing: '0%'}}>Sarit Expo Centre</div>
              <p className="mt-4" style={{color: '#FFFFFF80', fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontStyle: 'normal', fontSize: '18px', lineHeight: '28px', letterSpacing: '0%'}}>
                Every featured project gets exposure through either a keynote, panel, or hands-on session tied to real hackathon, tooling, or onboarding moments.
              </p>
            </article>

            {/* Day 3 */}
            <article className="relative pl-6 md:pl-10 py-6">
              <div className="absolute left-0 top-6 bottom-6 w-1 rounded" style={{backgroundColor: '#eb5626'}} aria-hidden />
              <div className="flex items-center gap-3">
                <div className="text-green-400" style={{fontFamily: "'PP Telegraf', sans-serif", fontWeight: 800, fontStyle: 'Ultrabold', fontSize: '20px', lineHeight: '25px', letterSpacing: '0%', textAlign: 'center'}}>Day 3</div>
                <div className="text-white/60 text-xs">Feb 13</div>
              </div>
              <h4 className="text-white font-extrabold text-2xl md:text-3xl mt-3">Tamarind Tree Hotel</h4>
              <div className="mt-2" style={{color: '#ffffff', fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontStyle: 'normal', fontSize: '18px', lineHeight: '28px', letterSpacing: '0%'}}>Standalone Summit Day</div>
              <p className="mt-4" style={{color: '#FFFFFF80', fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontStyle: 'normal', fontSize: '18px', lineHeight: '28px', letterSpacing: '0%'}}>
                A standalone summit day showcases working projects, launches pilots, and hosts policy, investment, and governance conversations.
              </p>
            </article>

            {/* Day 4 */}
            <article className="relative pl-6 md:pl-10 py-6">
              <div className="absolute left-0 top-6 bottom-6 w-1 rounded" style={{backgroundColor: '#eb5626'}} aria-hidden />
              <div className="flex items-center gap-3">
                <div className="text-blue-400" style={{fontFamily: "'PP Telegraf', sans-serif", fontWeight: 800, fontStyle: 'Ultrabold', fontSize: '20px', lineHeight: '25px', letterSpacing: '0%', textAlign: 'center'}}>Day 4</div>
                <div className="text-white/60 text-xs">Feb 14</div>
              </div>
              <h4 className="text-white font-extrabold text-2xl md:text-3xl mt-3">Safaris</h4>
              <div className="mt-2" style={{color: '#ffffff', fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontStyle: 'normal', fontSize: '18px', lineHeight: '28px', letterSpacing: '0%'}}>Standalone Summit Day</div>
              <p className="mt-4" style={{color: '#FFFFFF80', fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontStyle: 'normal', fontSize: '18px', lineHeight: '28px', letterSpacing: '0%'}}>
                A standalone summit day showcases working projects, launches pilots, and hosts policy, investment, and governance conversations.
              </p>
            </article>

          </div>
        </div>
        </div>
      </div>
      </div>
    </section>
  );
}
