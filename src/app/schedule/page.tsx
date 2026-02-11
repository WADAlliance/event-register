"use client";

import React, { useState, useEffect } from 'react';
import { ShoppingCart, MicVocal, Navigation2 } from 'lucide-react';
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
  type: 'keynote' | 'panel' | 'breakout' | 'networking' | 'lightning' | 'transition' | 'closing' | 'setup';
  title: string;
  description: string;
  speakers?: Speaker[];
  tracks?: Track[];
  badge?: string;
  day?: 'Day 1' | 'Day 2';
  location?: string;
  duration?: string;
  displayTimeRange?: string;
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
      { name: 'Richard E. Pelzer', title: 'HarlemCLX', avatar: '/imgs/richard_pelzer.jpg' },
      { name: 'Alice Kanjejo', title: 'Founder My Tech Story', avatar: '/imgs/Alice.jpeg' }
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
  closing: '#FF5722',
  transition: '#607D8B',
  setup: '#9E9E9E',
};

const filters = [
  { id: 'all', label: 'All Sessions', color: '#FF5722' },
  { id: 'keynote', label: 'Keynote', color: '#FF5722', dot: true },
  { id: 'panel', label: 'Panel', color: '#FFC107', dot: true },
  { id: 'breakout', label: 'Breakout Sessions', color: '#03A9F4', dot: true },
  { id: 'lightning', label: 'Lightning Talks', color: '#8BC34A', dot: true },
  { id: 'networking', label: 'Break & Networking', color: '#8e63b3', dot: true }
];

const detailedScheduleData: Session[] = [

  {
    id: 'd1-1',
    day: 'Day 1',
    time: '09:00',
    endTime: '09:30',
    duration: '30 min',
    type: 'breakout',
    title: 'Cardano Corner Opens',
    description: 'Meet the Cardano ecosystem, explore demos, and engage with projects and community members.',
    badge: 'OPENING',
    displayTimeRange: '9:00 AM – 9:30 PM',
    location: 'Cardano Corner'
  },
  {
    id: 'd1-2',
    day: 'Day 1',
    time: '09:30',
    endTime: '10:30',
    duration: '60 min',
    type: 'breakout',
    title: 'Cardano Stage Sessions',
    description: 'Education, onboarding, and ecosystem storytelling from across the Cardano network.',
    badge: 'SESSIONS',
    displayTimeRange: '9:30–10:30 AM',
    location: 'Cardano Corner'
  },
  {
    id: 'd1-3',
    day: 'Day 1',
    time: '10:40',
    endTime: '11:00',
    duration: '20 min',
    type: 'keynote',
    title: 'Cardano in Africa Past, Present and Future',
    description: 'A candid keynote tracing Cardano’s journey across the continent; from early community efforts to today’s growing ecosystem of builders, partners, and communities. We’ll reflect on key lessons, highlight where momentum is building, and explore what’s next for Cardano’s role in Africa’s future.',
    badge: 'KEYNOTE',
    displayTimeRange: '10:40–11:00 AM',
    location: 'ATS VALR Stage',
    speakers: [
      { name: 'Jack Briggs', title: 'Executive Director at Intersect MBO', avatar: '/imgs/jack-briggs-headshot.jpg' }
    ]
  },
  {
    id: 'd1-4',
    day: 'Day 1',
    time: '11:00',
    endTime: '14:30',
    duration: '210 min',
    type: 'breakout',
    title: 'Cardano Corner Stage Live',
    description: 'Interviews, project showcases, interactive demos, and community conversations.',
    badge: 'LIVE',
    displayTimeRange: '11:00 AM–2:30 PM',
    location: 'Cardano Corner'
  },
  {
    id: 'd1-5',
    day: 'Day 1',
    time: '14:30',
    endTime: '15:15',
    duration: '45 min',
    type: 'breakout',
    title: 'Cardano Innovation Corner Stage',
    description: 'Health and Wellness In The Age of AI (Emilian Popa and Kennedy Schall)',
    badge: 'INNOVATION',
    displayTimeRange: '2:30–3:15 PM',
    location: 'MAAI Masterclass Room 2',
    speakers: [
      { name: 'Emilian Popa', title: 'Founder & CEO, Expand Health AI', avatar: '/imgs/emilian-popa.jpg' },
      { name: 'Kennedy Schaal', title: 'Founder & CEO, Rejuve Biotech', avatar: '/imgs/kennedy-matsagas-schaal-headshot.jpg' }
    ]
  },
  {
    id: 'd1-6',
    day: 'Day 1',
    time: '16:00',
    endTime: '16:00',
    duration: '0 min',
    type: 'closing',
    title: 'Program Concludes',
    description: 'Day 1 wrap-up and closing remarks.',
    badge: 'CLOSING',
    displayTimeRange: '4:00 PM',
    location: 'Cardano Corner'
  },


  {
    id: 'd2-1',
    day: 'Day 2',
    time: '09:00',
    endTime: '11:00',
    duration: '120 min',
    type: 'breakout',
    title: 'Cardano Corner Stage Live',
    description: 'Ecosystem conversations, reflections, interviews, and adoption stories.',
    badge: 'LIVE',
    displayTimeRange: '9:00–11:00 AM',
    location: 'Cardano Corner'
  },
  {
    id: 'd2-2',
    day: 'Day 2',
    time: '11:20',
    endTime: '12:00',
    duration: '40 min',
    type: 'panel',
    title: 'Bridges, Blocks & Breakthroughs: Web2 → Web3 Leap',
    description: 'Explore how African builders are using blockchain, especially Cardano, to leap from Web2 constraints to Web3 innovation. From decentralized identity to digital finance, AI integration and policy frameworks.',
    badge: 'PANEL',
    displayTimeRange: '11:20 AM–12:00 PM',
    location: 'VALR STAGE',
    speakers: [
      { name: 'Frederic (Genty) Samvura', title: 'Founding member of Ekival', avatar: '/imgs/frederic-samvura-headshot.jpeg' },
      { name: 'Kennedy Matsagas Schaal', title: 'Founder & CEO Rejuve Biotech', avatar: '/imgs/kennedy-matsagas-schaal-headshot.jpg' },
      { name: 'Peter Onyango', title: 'Chairman of VAAK', avatar: '/imgs/peter-photo.jpeg' },
      { name: 'Andreas Pletscher', title: 'COO, Cardano Foundation', avatar: '/imgs/andreas-pletscher-headshot.png' },
      { name: 'Jessica Groopman', title: 'Founder, Regenerative Technology Project', avatar: '/imgs/jessica.png' }
    ]
  },
  {
    id: 'd2-3',
    day: 'Day 2',
    time: '12:15',
    endTime: '13:15',
    duration: '60 min',
    type: 'breakout',
    title: 'MASTERCLASS: Basics of Building on the Cardano Blockchain: Technical Workshop',
    description: 'New to Cardano? This beginner-friendly masterclass will guide you through the basics of building on the Cardano blockchain. Learn how the tech works, get introduced to smart contracts and developer tools.',
    badge: 'MASTERCLASS',
    displayTimeRange: '12:15–1:15 PM',
    location: 'MARANGA (UPSTAIRS - MASTERCLASS ROOM 1)',
    speakers: [
      { name: 'Samuel Leathers', title: 'Chairperson at Cardano Product Committee', avatar: '/imgs/sam-leathers-headshot.jpg' },
      { name: 'Adam Dean', title: 'Co-Founder of DripDropz', avatar: '/imgs/adam-dean-headshot.jpg' },
      { name: 'Kyle Solomon', title: 'VP of Sales and Marketing for Hydra events', avatar: '/imgs/kyle-headshot.jpeg' }
    ]
  },
  {
    id: 'd2-4',
    day: 'Day 2',
    time: '13:15',
    endTime: '15:30',
    duration: '135 min',
    type: 'closing',
    title: 'Cardano Corner Stage Close-Out',
    description: 'Final interviews, wrap-up conversations, and closing engagements.',
    badge: 'CLOSING',
    displayTimeRange: '1:15–3:30 PM',
    location: 'Cardano Corner'
  }
];



function DaySeparator({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center my-12 relative max-w-6xl mx-auto px-6">
      <div className="absolute inset-0 flex items-center px-6" aria-hidden="true">
        <div className="w-full border-t border-[#f05a28]/20"></div>
      </div>
      <div className="relative flex justify-center">
        <span className="bg-[#f05a28] text-white px-10 py-2 rounded-full text-sm font-black uppercase tracking-widest shadow-md" style={{ fontFamily: '"PP Telegraf", "Telegraf", sans-serif' }}>
          {label}
        </span>
      </div>
    </div>
  );
}

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
        {session.location && (
          <div
            className="text-gray-400 font-bold"
            style={{
              fontSize: '11px',
              textAlign: 'center',
              marginTop: '4px',
              lineHeight: '1.2'
            }}
          >
            {session.location}
          </div>
        )}
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
                <div key={idx} className="flex items-center gap-4 group cursor-pointer">
                  <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden flex-shrink-0 ring-4 ring-gray-50 transition-all duration-500 group-hover:ring-orange-500/20 group-hover:shadow-xl">
                    <img
                      src={speaker.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(speaker.name)}&background=random`}
                      alt={speaker.name}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
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

function CardanoCornerSchedule() {
  const [selectedDay, setSelectedDay] = useState<'Day 1' | 'Day 2'>('Day 1');

  const filteredSessions = detailedScheduleData.filter(session => session.day === selectedDay);

  const formatTime = (time: string) => {
    if (!time.includes(':')) return time;
    const [h, m] = time.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hour12 = h % 12 || 12;
    return `${hour12}:${m.toString().padStart(2, '0')} ${ampm}`;
  };

  return (
    <div className="relative max-w-5xl mx-auto my-12 px-4 md:px-0">
      <div className="text-center mb-8 relative">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-[180%]">
          <span className="bg-[#ffe0d6] text-[#ff5722] px-6 py-2 rounded-full text-sm font-bold border border-white shadow-sm inline-block">
            Pre-Summit Event
          </span>
        </div>

        <h2 className="text-3xl md:text-5xl font-black mb-4 text-black tracking-tight" style={{ fontFamily: '"PP Telegraf", "Telegraf", sans-serif' }}>
          Cardano Corner at ATS 11th & 12th
        </h2>
        <p className="text-gray-600 font-medium text-lg max-w-3xl mx-auto mb-8">
          Two days of ecosystem exploration, demos, and community building before the main summit.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => setSelectedDay('Day 1')}
            className={`px-8 py-3 rounded-full font-bold text-base transition-all duration-200 border-2 ${selectedDay === 'Day 1'
              ? 'bg-[#ff5722] text-white border-[#ff5722] shadow-lg scale-105'
              : 'bg-white text-gray-900 border-gray-100 hover:border-gray-200 hover:bg-gray-50'
              }`}
          >
            Day 1
          </button>
          <button
            onClick={() => setSelectedDay('Day 2')}
            className={`px-8 py-3 rounded-full font-bold text-base transition-all duration-200 border-2 ${selectedDay === 'Day 2'
              ? 'bg-[#ff5722] text-white border-[#ff5722] shadow-lg scale-105'
              : 'bg-white text-gray-900 border-gray-100 hover:border-gray-200 hover:bg-gray-50'
              }`}
          >
            Day 2
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden text-left mx-auto border-t-[6px] border-[#ff5722]">
        {filteredSessions.map((session, index) => (
          <div
            key={session.id}
            className={`flex flex-col md:flex-row md:items-start gap-4 md:gap-10 p-4 md:px-12 md:py-4 ${index !== filteredSessions.length - 1 ? 'border-b border-gray-100' : ''
              } hover:bg-gray-50/10 transition-colors duration-200`}
          >
            <div className="w-full md:w-48 flex-shrink-0 pt-0.5">
              <div className="font-black text-gray-900 text-lg uppercase tracking-tight" style={{ fontFamily: '"PP Telegraf", "Telegraf", sans-serif' }}>
                {session.displayTimeRange || (
                  <>
                    {formatTime(session.time)} – {session.endTime === 'Late' ? 'Late' : formatTime(session.endTime)}
                  </>
                )}
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-extrabold text-gray-900 text-xl mb-1 tracking-tight" style={{ fontFamily: '"PP Telegraf", "Telegraf", sans-serif' }}>
                {session.title}
              </h3>
              {session.location && (
                <div className="flex items-center gap-1.5 text-blue-600 font-bold mb-2">
                  <Navigation2 className="w-3.5 h-3.5 fill-current" />
                  <span className="text-xs uppercase tracking-wider">{session.location}</span>
                </div>
              )}
              {session.description && (
                <p className="text-gray-600 text-[15px] leading-relaxed font-normal">
                  {session.description}
                </p>
              )}
              {session.speakers && session.speakers.length > 0 && (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {session.speakers.map((speaker, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-gray-50 p-2 pr-4 rounded-full border border-gray-100 hover:shadow-md transition-all duration-300 group cursor-pointer">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 shadow-sm border border-white transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-md">
                        <img
                          src={speaker.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(speaker.name)}&background=random`}
                          alt={speaker.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-900 leading-tight">{speaker.name}</span>
                        {speaker.title && (
                          <span className="text-[11px] text-gray-500 leading-tight line-clamp-1">{speaker.title}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
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
        </div>
      </section>

      <section className="bg-gray-50/50 py-12 px-6">
        <CardanoCornerSchedule />
      </section>

      <DaySeparator label="Day 3" />

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


      <section className="bg-white py-6 px-2 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div
            className="bg-black mx-auto"
            style={{
              maxWidth: '1166px',
              minHeight: '205px',
              borderRadius: '15px',
              padding: '20px',
              gap: '15px',
              opacity: 1,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div className="flex items-center" style={{ gap: '15px' }}>
              <MicVocal className="w-6 h-6 text-orange-500" />
              <h2 className="text-white text-2xl font-bold">Your Day's Hosts</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '15px', flex: 1 }}>
              <div className="flex items-center rounded-xl p-4" style={{ gap: '15px', backgroundColor: '#111d22' }}>
                <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src="/imgs/Kisaka.jpg"
                    alt="Philip Kisaka"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <div className="text-white text-lg font-bold">Philip Kisaka</div>
                  <div className="text-gray-400 text-sm">Summit Host & MC</div>
                </div>
              </div>

              <div className="flex items-center rounded-xl p-4" style={{ gap: '15px', backgroundColor: '#111d22' }}>
                <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src="/imgs/Hess headshot.jpeg"
                    alt="Megan Hess"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <div className="text-white text-lg font-bold">Megan Hess</div>
                  <div className="text-gray-400 text-sm">Summit Host & MC</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
