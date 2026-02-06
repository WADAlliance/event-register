"use client";

import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


interface Speaker {
  name: string;
  title: string;
  avatar?: string;
  organization?: string;
  badge?: string;
}

interface Track {
  name: string;
  description: string;
  speakers?: Speaker[];
  badge?: string;
  avatar?: string;
}

interface Session {
  id: string;
  time: string;
  endTime: string;
  type: 'keynote' | 'panel' | 'breakout' | 'networking' | 'lightning' | 'transition' | 'closing';
  title: string;
  description: string;
  speakers?: Speaker[];
  tracks?: Track[];
  badge?: string;
}

const scheduleData: Session[] = [
  {
    id: '1',
    time: '8:30 AM',
    endTime: '10:00 AM',
    type: 'networking',
    title: 'Coffee & Networking',
    description: 'Arrive, collect your badge, and ease into the morning with complimentary coffee and light refreshments.',
    badge: 'NETWORKING'
  },
  {
    id: '2',
    time: '10:00 AM',
    endTime: '10:25 AM',
    type: 'keynote',
    title: 'Welcome & Opening Address (Address Main Stage)',
    description: "Official summit welcome and introduction to the day's agenda. Opening remarks on Cardano's Role in Africa's Web 3 Real-World Infrastructure, Past, Present & Future.",
    badge: 'OPENING',
    speakers: [
      { name: 'Mercy Fordwoo', title: 'Co-Founder, Wada Global', avatar: '/imgs/mercy.jpg' }
    ]
  },
  {
    id: '3',
    time: '10:30 AM',
    endTime: '10:55 AM',
    type: 'keynote',
    title: 'Dual Keynotes: Data Privacy & Digital Transformation in Kenya',
    description: 'Two powerful keynotes back-to-back, the first on Data Privacy, Tech, IP & Creatives; the second on Digital Transformation and Innovation within Kenyan Youth.',
    badge: 'KEYNOTE 1 & 2',
    speakers: [
      { name: 'Oscar Otieno', title: 'Deputy Data Commissioner', avatar: '/imgs/Oscar Pic.jpeg' },
      { name: 'Mary Kerema', title: 'Secretary ICT, E-Government, State Department of ICT & Digital Economy', avatar: '/imgs/mary-kere.jpg' }
    ]
  },
  {
    id: '4',
    time: '10:55 AM',
    endTime: '11:40 AM',
    type: 'panel',
    title: 'Panel 1: Turning Blocks to Solutions',
    description: 'An in-depth discussion on how blockchain technology transforms challenges into tangible real-world solutions across various sectors.',
    badge: 'PANEL',
    speakers: [
      { name: 'Nick Cook', title: 'Interim Operations Director, Intersect MBO', avatar: '/imgs/nick-cook-headshot.jpg' },
      { name: 'Alex Maaza', title: 'Sustainability & Innovation, Cardano Foundation', avatar: '/imgs/alexandre-maaza-headshot.jpeg' },
      { name: 'Dr Bright Gameli', title: 'Cybersecurity Specialist, AfricaHackon', avatar: '/imgs/bright-gameli.JPG' },
      { name: 'Shantnoo Saxsena', title: 'CEO - Anzens Inc., USDA', avatar: '/imgs/shantnoo-anzens-headshot.jpg' },
      { name: 'Naomi Kilungu', title: 'AI for Peace', avatar: '/imgs/naomi-headshot.jpg' }
    ]
  },
  {
    id: '5',
    time: '11:40 AM',
    endTime: '12:00 PM',
    type: 'breakout',
    title: 'Coffee Break (Open Space)',
    description: '',
    badge: 'BREAK'
  },
  {
    id: '6',
    time: '12:00 PM',
    endTime: '1:00 PM',
    type: 'breakout',
    title: 'Morning Tracks – 4 Parallel Sessions',
    description: 'Choose your path. Three concurrent breakout tracks covering Enterprise solutions, Business & Regulatory landscape, and Product Committee consultation. Plus ongoing Hub Presentations & Technical Track throughout the day.',
    badge: 'BREAKOUT SESSIONS',
    tracks: [
      { name: 'Enterprise Track (Simba)', description: 'Case studies from African and Global implementations, Fintech (Chizaram Ucheaga), Biotech (Kennedy Schaal), USDA, Blockchain integration (Kavinda Kariyapperuma - Lead)' },
      { name: 'Business & Regulatory Track (Tembo)', description: 'Partnership opportunities and Regulatory landscape, Virtual Asset Chambers (Lead), Frederic Samvura (Cardano), Lavender Ester (leads ecosystem and program design), Cornelius Maroa (AI for Peace)' },
      { name: 'Product Committee Consultation – Intersect Product Committee (Kifaru)', description: 'In-depth Cardano product 2030 mission and vision discussion: Kyle Solomon, Sam Leathers, Adam Dean' },
      { name: 'All-Day Hub Presentations & Technical Track (Nyati)', description: 'Developer Deep Dives throughout the day. Mike Hornan, Dan Baruka, Vincent Sipoi, Icog Developers covering Smart contracts, DeFi, Scalability, MeTTa and Hyperon' }
    ]
  },
  {
    id: '7',
    time: '1:00 PM',
    endTime: '2:00 PM',
    type: 'networking',
    title: 'Networking Lunch and Open Booths',
    description: '',
    badge: 'NETWORKING'
  },
  {
    id: '9',
    time: '2:00 PM',
    endTime: '2:30 PM',
    type: 'keynote',
    title: 'Keynote: Accelerated Development: Harnessing Innovation for Inclusive and Sustainable Growth (Main Stage)',
    description: 'Building Inclusion From the Ground Up in Africa.',
    badge: 'KEYNOTE',
    speakers: [{ name: 'Ms. Ebby Gatamu', title: 'CEO & Co-founder, Cladfy | UNDP SDG Blockchain Accelerator Alumnus', avatar: '/imgs/Ebby.jpg' }]
  },
  {
    id: '10',
    time: '2:30 PM',
    endTime: '3:00 PM',
    type: 'panel',
    title: 'Panel 2: Creatives, Tech & IP Ownership (Main Stage)',
    description: 'A critical conversation exploring the intersection of creative industries, technology, and intellectual property rights in the digital age.',
    badge: 'PANEL',
    speakers: [
      { name: 'Diana Kemunto', title: 'Blockchain Centre NBO', avatar: '/imgs/diana-kemunto-headshot.jpeg' },
      { name: 'George Buliba', title: 'Creative, Pepeta', avatar: '/imgs/george-buliba.jpg' },
      { name: 'Richard Odongo', title: 'IP & Technology Advocate, Bowman', avatar: '/imgs/Richard-Odongo-picture.jpg' },
      { name: 'Richard Prezler', title: 'HarlemCLX', avatar: '/imgs/richard_pelzer.jpg' },
      { name: 'Alice Kajenjo', title: 'Founder My Tech Story', avatar: '/imgs/Alice.jpeg' }
    ]
  },
  {
    id: '11',
    time: '3:00 PM',
    endTime: '4:00 PM',
    type: 'breakout',
    title: 'Afternoon Tracks – 4 Parallel Sessions',
    description: 'Choose your afternoon path across three specialized tracks plus continuing Hub Presentations & Technical sessions.',
    badge: 'BREAKOUT SESSIONS',
    tracks: [
      { name: 'Emerging Trends & Tech Integration (Simba)', description: 'Women in blockchain, tokenisation & DeFi, Charity Ogada (Women in blockchain & scalability), Joanne Wendoh (Tokenisation, Edutech & DAOism), Isaac Wabuge (YoguPay), Victor Joseph (TemboPlus)' },
      { name: 'Governance Track (Tembo)', description: 'Cardano Governance deep-dive, Mike Hornan & Nana Safo' },
      { name: 'Tech, Creative & IP Ownership Deep Dive (Kifaru)', description: 'Post-panel continuation, Preston Odep (Blockchain Centre NBO), Stephen Kimoi (Techrift), Nefertiti Strong (XR Agency), Temitope Emiola (Agora Visit)' },
      { name: 'Hub Presentations & Technical Track (Nyati)', description: 'Developer Roadmaps & Community Building (Jane Wangari/Vincent Sipoi - Adamur.io)' }
    ]
  },
  {
    id: '13',
    time: '4:00 PM',
    endTime: '5:20 PM',
    type: 'lightning',
    title: 'Lightning Talks by Industry Leaders (Main Stage)',
    description: 'From Words to Action',
    badge: 'LIGHTNING TALKS',
    tracks: [
      { name: 'Shogo Ishida', description: 'EMURGO Africa', avatar: '/imgs/shogo-ishida-headshot.png' },
      { name: 'Ben Thompson Coon', description: 'UNDP', avatar: '/imgs/ben_01.jpg' },
      { name: 'Jess Groopman', description: 'The Regenerative Technology Project', avatar: '/imgs/jessica.png' },
      { name: 'Naomi Kilungu', description: 'AI for Peace', avatar: '/imgs/naomi-headshot.jpg' },
      { name: 'Nefertiti Strong', description: 'SingularityNet Global South', avatar: '/imgs/nefertiti-strong-headshot.jpeg' },
      { name: 'Brenton Naicker', description: 'CV VC Labs', avatar: '/imgs/Brenton-Naicker.jpg' }
    ]
  },
  {
    id: '14',
    time: '5:30 PM',
    endTime: '6:00 PM',
    type: 'closing',
    title: 'Closing Address (Main Stage)',
    description: '',
    badge: 'CLOSING',
    speakers: [
      { name: 'Frederik Gregard', title: 'CEO of the Cardano Foundation', avatar: '/imgs/frederik-gregard-headshot.jpg' },
      { name: 'Darlington Wleh', title: 'Host, Blockchain Centre', avatar: '/imgs/darlington-02.jpg' }
    ]
  }
];

const typeColors: Record<string, string> = {
  keynote: '#FF5722',
  panel: '#FFC107',
  breakout: '#03A9F4',
  networking: '#8e63b3',
  lightning: '#8BC34A',
  transition: '#FF5722',
  closing: '#FF5722'
};

const filters = [
  { id: 'all', label: 'All Sessions', color: '#FF5722' },
  { id: 'keynote', label: 'Keynote', color: '#FF5722', dot: true },
  { id: 'panel', label: 'Panel', color: '#FFC107', dot: true },
  { id: 'breakout', label: 'Breakout Sessions', color: '#03A9F4', dot: true },
  { id: 'lightning', label: 'Lightning Talks', color: '#8BC34A', dot: true },
  { id: 'networking', label: 'Break & Networking', color: '#8e63b3', dot: true }
];


function TimelineItem({ session }: { session: Session }) {
  const borderColor = typeColors[session.type] || '#FF5722';

  const displayTime = session.time;
  const displayEndTime = session.endTime;

  return (
    <div className="flex gap-4 md:gap-6 group min-h-[120px]">
      <div className="flex-shrink-0 w-24 md:w-32 pt-2 flex flex-col items-center">
        <div
          style={{
            fontFamily: '"PP Telegraf", "Telegraf", sans-serif',
            fontWeight: 800,
            fontSize: '18px',
            lineHeight: '27px',
            textAlign: 'center',
            color: '#000'
          }}
        >
          {displayTime}
        </div>
        <div
          className="text-gray-400 font-bold"
          style={{
            fontSize: '14px',
            textAlign: 'center',
            marginTop: '2px'
          }}
        >
          - {displayEndTime} EAT
        </div>
      </div>

      <div className="flex-1 relative pb-10 md:pb-14">
        <div
          className="absolute top-0 bottom-10 md:bottom-14 transform -translate-x-1/2"
          style={{
            left: '0px',
            width: '3px',
            backgroundColor: borderColor,
            opacity: 1
          }}
        ></div>

        <div
          className="absolute z-20 flex items-center justify-center rounded-full"
          style={{
            left: '0px',
            top: '0px',
            width: '28px',
            height: '28px',
            transform: 'translate(-50%, -50%)',
            backgroundColor: `${borderColor}15`,
          }}
        >
          <div
            className="w-[18px] h-[18px] rounded-full"
            style={{ backgroundColor: borderColor }}
          ></div>
        </div>

        <div
          className="relative bg-white p-6 md:p-8 rounded-xl transition-all duration-200 ml-[12px]"
          style={{
            borderTop: `4px solid ${borderColor}`,
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
          }}
        >
          <div className="flex flex-wrap gap-2 mb-4">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] md:text-[11px] font-bold uppercase tracking-wider"
              style={{
                backgroundColor: `${borderColor}10`,
                color: borderColor,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: borderColor }}></span>
              {session.badge || session.type}
            </span>
          </div>

          <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-2 leading-tight">
            {session.title}
          </h3>
          <p className="text-sm md:text-base text-gray-600 mb-6 leading-relaxed">
            {session.description}
          </p>

          {session.speakers && session.speakers.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {session.speakers.map((speaker, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden flex-shrink-0 ring-4 ring-gray-50">
                    <img
                      src={speaker.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(speaker.name)}&background=random`}
                      alt={speaker.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <div className="text-base md:text-xl font-bold text-gray-900 leading-tight">
                      {speaker.name}
                    </div>
                    {speaker.title && (
                      <div className="text-sm md:text-base text-gray-500 mt-1 leading-snug">
                        {speaker.title}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {session.tracks && session.tracks.length > 0 && (
            <div className={`grid gap-3 md:gap-4 mt-4 md:mt-6 ${session.type === 'breakout' ? 'grid-cols-1' : (session.tracks.length > 2 ? 'md:grid-cols-3' : 'md:grid-cols-2')}`}>
              {session.tracks.map((track, index) => (
                <div
                  key={index}
                  className={`rounded-xl md:rounded-2xl p-4 md:p-5 transition-all hover:shadow-sm ${session.type === 'breakout' ? '' : 'flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4'}`}
                  style={{ backgroundColor: session.type === 'breakout' ? '#eff6fa' : '#effaf0' }}
                >
                  {session.type !== 'breakout' && (
                    <div className="flex-shrink-0">
                      {track.avatar ? (
                        <img
                          src={track.avatar}
                          alt={track.name}
                          className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#d0eecf] flex items-center justify-center text-[#558b4b] font-bold text-base md:text-lg">
                          {track.badge || track.name.substring(0, 1)}
                        </div>
                      )}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 text-base md:text-lg mb-0.5 md:mb-1">{track.name}</h4>
                    <p className="text-xs md:text-sm text-gray-700 leading-relaxed">{track.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


export default function SchedulePage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [isMounted, setIsMounted] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setIsMounted(true);
    const updateCartCount = () => {
      try {
        const savedCart = localStorage.getItem('cats-trip-planner-cart');
        if (savedCart) {
          const items = JSON.parse(savedCart);
          const count = items.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0);
          setCartCount(count);
        } else {
          setCartCount(0);
        }
      } catch (error) {
        console.error('Failed to load cart count:', error);
        setCartCount(0);
      }
    };

    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    window.addEventListener('cartUpdated', updateCartCount);

    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  const filteredSessions = activeFilter === 'all'
    ? scheduleData
    : scheduleData.filter(session => session.type === activeFilter);

  const localTZName = 'East Africa Time';
  const localTZLabel = 'EAT';

  const startTime = '9:00 AM';
  const endTime = '6:00 PM';

  return (
    <main className="min-h-screen bg-white">
      <section className="relative bg-black text-white py-20 px-6 overflow-hidden">
        <div className="absolute left-[10%] top-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 opacity-60 blur-3xl hidden md:block"></div>
        <div className="absolute right-[10%] top-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 opacity-50 blur-3xl hidden md:block"></div>

        <div className="relative z-10 max-w-5xl mx-auto text-center pt-10 md:pt-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Summit <span className="text-orange-500">Agenda</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            A carefully curated day of thought-provoking keynotes, immersive panel discussions,
            collaborative breakout sessions, and meaningful networking, designed to inspire and accelerate change.
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-10">
            <div className="flex items-center gap-4 bg-white/5 backdrop-blur-sm rounded-lg px-6 py-4 border border-white/10">
              <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-white font-bold">Feb 13, 2026</div>
                <div className="text-sm text-gray-400">Full Day Event</div>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/5 backdrop-blur-sm rounded-lg px-6 py-4 border border-white/10">
              <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-white font-bold">{startTime} – {endTime}</div>
                <div className="text-sm text-gray-400">{localTZLabel} ({localTZName})</div>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/5 backdrop-blur-sm rounded-lg px-6 py-4 border border-white/10">
              <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-white font-bold">Tamarind Tree Hotel</div>
                <div className="text-sm text-gray-400">Nairobi, Kenya</div>
              </div>
            </div>
          </div>

          <a
            href="https://www.africatechsummit.com/nairobi/agenda2026/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-lg transition-colors duration-200 shadow-lg shadow-orange-500/30 inline-block"
          >
            View Day 1 & 2 Agenda
          </a>
        </div>
      </section>

      <div className="sticky top-16 z-40 bg-gray-50/95 backdrop-blur-sm py-4 px-6 border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest flex-shrink-0">
              FILTER BY
            </span>

            <div className="flex overflow-x-auto no-scrollbar gap-2 pb-1 -mb-1 whitespace-nowrap">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 transform cursor-pointer
                    ${activeFilter === filter.id
                      ? 'text-white shadow-lg scale-105'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:scale-105 hover:shadow-md'
                    }
                  `}
                  style={{
                    backgroundColor: activeFilter === filter.id ? filter.color : undefined
                  }}
                >
                  {filter.dot && activeFilter !== filter.id && (
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: filter.color }}
                    ></span>
                  )}
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="bg-white py-12 px-2 md:px-6">
        <div className="max-w-6xl mx-auto">
          {filteredSessions.length > 0 ? (
            <div className="space-y-0">
              {filteredSessions.map((session) => (
                <TimelineItem key={session.id} session={session} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No sessions found for this filter.</p>
            </div>
          )}
        </div>
      </section>

      {
        isMounted && (
          <div
            aria-hidden={false}
            style={{
              position: "fixed",
              bottom: 20,
              right: 30,
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              gap: 8,
              pointerEvents: "auto",
            }}
          >
            <Link
              href="/cart"
              aria-label="Open cart"
              style={{
                background: "#F05A28",
                color: "#fff",
                border: "none",
                borderRadius: 28,
                padding: "10px 20px",
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                cursor: "pointer",
                boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
                pointerEvents: "auto",
                textDecoration: "none",
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <ShoppingCart size={18} aria-hidden />
              </div>
              <div
                style={{
                  minWidth: 24,
                  height: 24,
                  borderRadius: 12,
                  background: "#000",
                  color: "#fff",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: 700,
                  padding: "0 6px",
                  boxSizing: "border-box",
                }}
              >
                {cartCount}
              </div>
            </Link>
          </div>
        )
      }
    </main >
  );
}
