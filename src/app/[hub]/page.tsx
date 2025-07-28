'use client';

import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { FaChevronDown } from "react-icons/fa6";
// import Card from '@/components/Card'
import SimpleButton from '@/components/SimpleButton'
import Image from 'next/image';
import '../../styles/globals.css'; 

// interface FootnoteListProps {
//   footnoteData: Array<{ text: string; linkedText: string; link: string }>;
//   footnoteColors: string[]; // Receive colors array as props
// }

// interface FootnoteSupProps {
//     index: number; // Define index as a number
//     onClick: (index: number) => void; 
//     color: string;
// };

// interface Footnote {
//     text: string;
//     linkedText: string;
//     link: string;
// }

// const footnoteData: Footnote[] = [
//     {
//         text: "Beyond the Carbon Fixation: Pathways to Regenerative Futures, by Culture Hack Labs in collaboration with Ma Earth",
//         linkedText: "Beyond the Carbon Fixation",
//         link: "https://www.culturehack.io/issues/issue-07-beyond-the-carbon-fixation-pathways-to-regenerative-futures/"
//     },
//     {
//         text: "Land Back to Right Relations Briefing, by Culture Hack Labs",
//         linkedText: "Land Back to Right Relations",
//         link: "https://www.culturehack.io/issues/territories-of-transition-land-back-to-right-relations-briefing/"
//     },
//     {
//         text: "An Introduction to the Metacrisis, Daniel Schmachtenberger",
//         linkedText: "An Introduction to the Metacrisis",
//         link: "https://www.youtube.com/watch?v=4kBoLVvoqVY"
//     },
//     {
//         text: "Alnoor Ladha, Kosmos Journal",
//         linkedText: "Alnoor Ladha",
//         link: "https://www.kosmosjournal.org/contributor/alnoor-ladha/"
//     },
//     {
//         text: "Twelve principles for transformation-focused evaluation, Sam Buckton",
//         linkedText: "Twelve principles for transformation-focused evaluation",
//         link: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4872604"
//     },
//     {
//         text: "Báyò Akómoláfé, The Emergence Network",
//         linkedText: "Báyò Akómoláfé",
//         link: "https://www.emergencenetwork.org/onto-fugitivity-grounding-sanctuary-in-the-cracks/"
//     },
//     {
//         text: "Sophie Strand, Sounds of SAND",
//         linkedText: "Sophie Strand",
//         link: "https://www.youtube.com/watch?v=BZE1DNhgqN8"
//     },
//     {
//         text: "ABC of Action Learning, Reg Revans",
//         linkedText: "Action Learning",
//         link: "https://archive.org/details/abcofactionlearn0000reva"
//     },
//     {
//         text: "Regenesis Institute of Regenerative Practice",
//         linkedText: "Regenesis Institute of Regenerative Practice",
//         link: "https://www.regenerat.es/"
//     },
//     {
//         text: "Delfina Terrado, Regenerative Education",
//         linkedText: "Regenerative Education",
//         link: "https://delfinaterrado.medium.com/regenerative-education-536e6f2ec1fd"
//     },
//     {
//         text: "Journal of Awareness-based Systems Change",
//         linkedText: "Awareness-based Systems Change",
//         link: "https://jabsc.org/index.php/jabsc"
//     }
// ];

// const TeamMembersGrid = () => {
//   const teamMembers = [
//       {
//           name: 'Shik',
//           description: 'Evaluation',
//           socials: {
//               linkedin: 'https://www.linkedin.com/in/shik/',
//           },
//           image: '/shik.svg'
//       },
//       {
//           name: 'Delfi',
//           description: 'Action',
//           socials: {
//               linkedin: 'https://www.linkedin.com/in/delfina-terrado/',
//               website: 'https://iniciativamurmullo.com/'
//           },
//           image: '/delfi.svg'
//       },
//       {
//           name: 'Mercy',
//           description: 'Ground-Potentialising',
//           socials: {
//               website: 'https://www.wada.org',
//           },
//           image: '/mercy.svg'
//       },
//       {
//           name: 'Tabs',
//           description: 'Process Infrastructure',
//           socials: {
//               github: 'https://github.com/tbsfchnr',
//           },
//           image: '/tabs.svg'
//       },
//   ];

//   return (
//       <div className="flex flex-wrap justify-center">
//           {teamMembers.map((member, index) => (
//               <Card
//                   key={index}
//                   name={member.name}
//                   description={member.description}
//                   socials={member.socials}
//                   image={member.image}
//                   size={160}
//               />
//           ))}
//       </div>
//   );
// };

// const PartnersGrid = () => {
//   const partners = [
//       {
//           name: 'Regenesis Institute of Regenerative Practice',
//           description: 'Regenerative Design and Development',
//           socials: {
//               linkedin: 'https://www.linkedin.com/school/regenesis-institute-for-regenerative-practice/',
//               website: 'https://www.regenerat.es'
//           },
//           image: '/regenesis.png'
//       },
//       {
//           name: 'Wada',
//           description: 'Entrepreneurship & dApp Development',
//           socials: {
//               linkedin: 'https://www.linkedin.com/company/wada-org/',
//               website: 'https://www.wada.org'
//           },
//           image: '/wada.png'
//       },
//       {
//           name: 'Cardano',
//           description: 'Blockchain',
//           socials: {
//               linkedin: 'https://www.linkedin.com/company/cardano-community/',
//               website: 'https://cardano.org/'
//           },
//           image: '/cardano.svg'
//       },
//       {
//           name: 'Holochain',
//           description: 'Distributed P2P Apps',
//           socials: {
//               linkedin: 'https://www.linkedin.com/company/holochain/',
//               website: 'https://www.holochain.org/',
//               github: 'https://github.com/holochain/holochain'
//           },
//           image: '/holochain.png'
//       },
//   ];

//   return (
//       <div className="flex flex-wrap justify-center">
//           {partners.map((partner, index) => (
//               <Card
//                   key={index}
//                   name={partner.name}
//                   description={partner.description}
//                   socials={partner.socials}
//                   image={partner.image}
//                   size={280}
//               />
//           ))}
//       </div>
//   );
// };

// // FootnoteSup Component
// const FootnoteSup: React.FC<FootnoteSupProps> = ({ index, onClick, color }) => {
//   return (
//     <sup
//       style={{ color }}
//       onClick={() => onClick(index)}
//       role="button" // Indicate that this is clickable
//       tabIndex={0} // Make it focusable for accessibility
//       onKeyDown={(e) => {
//         if (e.key === "Enter" || e.key === " ") { // Handle both Enter and Space keys
//           onClick(index);
//         }
//       }}
//     >
//       {index + 1} {/* Display the footnote number */}
//     </sup>
//   );
// };

// // Helper function to blend a color with white
// const fadeToWhite = (hex: string, ratio: number) => {
//   // Ensure ratio is between 0 and 1
//   ratio = Math.min(Math.max(ratio, 0), 0.4);

//   // Remove the hash at the start of the hex string
//   hex = hex.replace('#', '');

//   // Extract the red, green, and blue components from the hex string
//   const r = parseInt(hex.substring(0, 2), 16);
//   const g = parseInt(hex.substring(2, 4), 16);
//   const b = parseInt(hex.substring(4, 6), 16);

//   // Calculate the blended color by mixing with white
//   const blendedR = Math.round(r + (255 - r) * ratio);
//   const blendedG = Math.round(g + (255 - g) * ratio);
//   const blendedB = Math.round(b + (255 - b) * ratio);

//   // Return the blended color as a hex string
//   return `#${toHex(blendedR)}${toHex(blendedG)}${toHex(blendedB)}`;
// };

// // Helper function to convert a number to a 2-digit hex value
// const toHex = (n: number) => {
//   const hex = n.toString(16);
//   return hex.length === 1 ? '0' + hex : hex;
// };

// const FootnoteList: React.FC<FootnoteListProps> = ({ footnoteData, footnoteColors }) => {
//   return (
//     <ol className="list-decimal md:w-2/3 lg:w-1/2 w-5/6 text-left m-12 leading-8 space-y-2">
//         {footnoteData.map((footnote, index) => {
//             const precolor = footnoteColors[index] || "#ff4b85"; // Default color if not found
            
//             // Fade the color towards white
//             const color = fadeToWhite(precolor, 0.7); // Adjust 0.7 for how much white to mix in
            
//             // Split the text around the linked text
//             const beforeLink = footnote.text.split(footnote.linkedText)[0];
//             const afterLink = footnote.text.split(footnote.linkedText)[1];

//             console.log(`FootnoteList 1) Retrieved/ generated ${index}: ${color}`);

//             return (
//                 <li key={index}>
//                     {beforeLink}
//                     <a
//                         href={footnote.link}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         style={{ color }}
//                     >
//                         {footnote.linkedText}
//                     </a>
//                     {afterLink}
//                 </li>
//             );
//         })}
//     </ol>
//   );
// };


const LandingPage = () => {
  // const router = useRouter();
  const [showLogoName, setShowLogoName] = useState<boolean>(false);
  const [showAllElse, setShowAllElse] = useState<boolean>(false);
  // const [scrollPosition, setScrollPosition] = useState(0);
  // const footnoteRef = useRef<HTMLDivElement | null>(null); 

  // const palette = ["#cd5aff", "#8067ff", "#ef64ff", "#ff4b85"];
  
  // Generate an array of colors by randomly picking from the palette
  // const footnoteColors = footnoteData.map(() => {
  //   // Randomly select a color from the palette
  //   const selectedColor = palette[Math.floor(Math.random() * palette.length)];
  //   return selectedColor;
  // });

  // const handleFootnoteClick = () => {
  //     // Store the current scroll position
  //     setScrollPosition(window.scrollY);
    
  //     // Scroll to the footnote section if footnoteRef.current is not null
  //     if (footnoteRef.current) {
  //         footnoteRef.current.scrollIntoView({ behavior: 'smooth' });
  //     }
  // };

  // const handleBackToText = () => {
  //     window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
  // };

  // Render components sequentially to make it look smoother
  useEffect(() => {
    const appearComponents = () => {
      setTimeout(() => setShowLogoName(true), 0); // Show first component immediately
      setTimeout(() => setShowAllElse(true), 1500); // Show other components after 1500ms
    };

    appearComponents(); // Start the appearance sequence
  }, []);
  
  // Animation variants
  const variants = {
    hidden: { opacity: 0 }, // Start hidden
    visible: { opacity: 1 }, // Fade in 
  };
  
  return (
    <div>
		<div
		  className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
		  style={{ backgroundImage: "url('/hero.jpg')" }}
		></div>
      <div className="flex flex-col md:flex-row justify-center items-center h-screen text-center md:text-left overflow-hidden px-10">
	
	  {/* Left Content (Image) */}
	  <motion.div
	    initial="hidden"
	    animate={showAllElse ? "visible" : "hidden"}
	    variants={variants}
	    transition={{ duration: 0.5 }}
	    className="flex justify-center md:justify-end w-full md:w-1/2 mt-5 md:mt-16 p-2 md:p-10 md:pl-32"
	  >
		<a href="https://lu.ma/y5jblri6" target="_blank" rel="noopener noreferrer">
		    <Image
		      src="/event_card.jpg"
		      alt="Event card"
		      className="w-full md:w-auto rounded-lg cursor-pointer"
		      width={400} 
		      height={400}
		    />
		</a>
	  </motion.div>
	
	  {/* Right Content (Logo and Subtitle) */}
	  <motion.div
	    initial="hidden"
	    animate={showLogoName ? "visible" : "hidden"}
	    variants={variants}
	    transition={{ duration: 0.5 }}
	    className="flex flex-col justify-center text-center md:text-left w-full md:w-1/2"
	  >
	    {/* Subtitle */}
	    <p className="md:w-2/3 mx-auto md:mx-0 mb-2">
	    	This isn&apos;t just a hackathon. It&apos;s a gateway into the MeTTa Cycle, a developer-focussed, 
			AGI-algined training and development pipeline being built by Dr. Ben Goertzel and the core SingularityNET team.
	    </p>
	    <p className="md:w-2/3 mx-auto md:mx-0 mb-6">
			Join SingularityNET, BeyondTheCode.ai and Wada for a one-of-a-kind experience that blends technical training, 
			real-world problem solving, and decentralized innovation.
	    </p >
		<div className="flex flex-col space-y-3 space-x-0 md:flex-row md:space-x-4 md:space-y-0 items-center">
			<SimpleButton buttonText='1. Register' redirectTo='https://lu.ma/y5jblri6' className="!bg-wada-a !hover:bg-white !border-transparent"/>
			<SimpleButton buttonText='2. Begin Onboarding' redirectTo='/'/>
		</div>
		  
	
		  {/* Button 1 */}
		  <motion.div
		    initial="hidden"
		    animate={showAllElse ? "visible" : "hidden"}
		    variants={variants}
		    transition={{ duration: 0.5 }}
		    className="relative flex flex-col items-center md:items-start justify-center"
		  >
		    <motion.div 
		      className="absolute top-full mt-6 flex flex-col items-center ml-0 md:ml-20 animate-bounce"
		      initial="hidden"
		      animate={showAllElse ? "visible" : "hidden"}
		      variants={variants}
		      transition={{ duration: 0.5 }}
		    >
		      <span className="text-sm text-gray-300 w-full">Scroll Down</span>
		      <FaChevronDown className="text-white text-2xl mt-2" />
		    </motion.div>
		  </motion.div>
	  </motion.div>
	</div>

      {/* Section texts */}
      <div className='mt-20 flex flex-col items-center'>
        <h2 className='text-2xl font-custom font-extrabold'>Why</h2>
        <p className='md:w-2/3 lg:w-1/2 w-5/6 text-center'>MeTTa powers Hyperon - SingularityNET&apos;s next gen AGI engine. 
        Developers using MeTTa build smart agents with autonomy and general reasoning. 
        It enables dcentralised cognitive architectures, not just smart contracts. 
        If you learn MeTTa, you&apos;re contributing to AGI, not just web3.</p>
      </div>

      <div className='mt-20 flex flex-col items-center'>
        <h2 className='text-2xl font-custom font-extrabold'>What</h2>
        <p className='md:w-2/3 lg:w-1/2 w-5/6 text-center'>MeTTa (Meta-Type Talk) is the 
        programming language designed for Artificial General Intelligence (AGI). It&apos;s logic-first, not 
        syntax first. That means you reason, not just compute. This isn&apos;t just a hackathon. It&apos;s a gateway into 
        the MeTTa Cycle, a developer-focussed, AGI-algined training and development pipeline being built by Dr. Ben 
        Goertzel and the core SingularityNET team. Through this event, you&apos;re not just competing, you&apos;re 
        you&apos;re being recruited into the next wave of decentralized intelligence builders.</p>
      </div>
      
      <div className='mt-20 flex flex-col items-center'>
        <h2 className='text-2xl font-custom font-extrabold'>Where</h2>
        <p className='md:w-2/3 lg:w-1/2 w-5/6 text-center'>Starting with registration and virtual training online, 
        we then meet in-person in Nairobi for a hackathon, where participants will be accompanied by Dr. Ben 
        Goertzel himself to get hands-on training in MeTTa.</p>
      </div>
      
      <div className='mt-20 flex flex-col items-center'>
        <h2 className='text-2xl font-custom font-extrabold'>Developer Tracks</h2>
        <p className='md:w-2/3 lg:w-1/2 w-5/6 text-center mb-3'>Each track is designed with entry-level
        to advanced pathways. No prior MeTTa experience required.</p>
        <ol className='md:w-2/3 lg:w-1/2 w-5/6 text-center'>
          <li>Track 1: Knowledge Graph Agents in MeTTa</li>
          <li>Track 2: Decentralized Media + AI Identity Tools</li>
          <li>Track 3: Real World Agents (Agriculture, Health, Education)</li>
          <li>Track 4: Visual Agents - AGI in Film, Sound, and Narrative</li>
        </ol>
      </div>
      
      <div className='mt-20 mb-40 flex flex-col items-center'>
        <h2 className='text-2xl font-custom font-extrabold'>When</h2>
        <ol className='md:w-2/3 lg:w-1/2 w-5/6 text-center mb-6'>
          <li>July 24–Aug 5: Registration, testing</li>
          <li>Aug 1–8: Onboarding</li>
          <li>Aug 9–15: Virtual Teaching (MeTTa) iCog Ethiopia</li>
          <li>Aug 18–28: Hackathon & in-person intensive</li>
        </ol>
		<div className="flex flex-col space-y-3 space-x-0 md:flex-row md:space-x-4 md:space-y-0 items-center">
			<SimpleButton buttonText='1. Register' redirectTo='https://lu.ma/y5jblri6' className="!bg-wada-a !hover:bg-white !border-transparent"/>
			<SimpleButton buttonText='2. Begin Onboarding' redirectTo='/'/>
		</div>
      </div>
    </div>
  );
};

export default LandingPage;
