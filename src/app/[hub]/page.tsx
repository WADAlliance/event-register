'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { FaChevronDown } from "react-icons/fa6";
import SimpleButton from '@/components/SimpleButton'
import Image from 'next/image';
import '../../styles/globals.css'; 

const LandingPage = () => {
  // const router = useRouter();
  const [showLogoName, setShowLogoName] = useState<boolean>(false);
  const [showAllElse, setShowAllElse] = useState<boolean>(false);

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
            className="fixed top-0 left-0 w-full h-full bg-cover bg-center bg-fixed -z-10"
            style={{ backgroundImage: "url('/hero.jpg')" }}
        />

        <div className="flex flex-col md:flex-row justify-center items-center text-center md:text-left px-10 z-10 relative">

            {/* Left Content (Image) */}
            <motion.div
                initial="hidden"
                animate={showLogoName ? "visible" : "hidden"}
                variants={variants}
                transition={{ duration: 0.5 }}
                className="flex justify-center md:justify-end w-full md:w-1/2 mt-16 p-2 md:p-10 md:pl-32"
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
                animate={showAllElse ? "visible" : "hidden"}
                variants={variants}
                transition={{ duration: 0.5 }}
                className="flex flex-col justify-center text-center md:text-left w-full md:w-1/2"
            >
                {/* Subtitle */}
                <p className="md:w-2/3 mx-auto md:mx-0 mb-2">
                    This isn&apos;t just a hackathon. It&apos;s a gateway into the MeTTa Cycle, a developer-focused, 
                    AGI-aligned training and development pipeline being built by Dr. Ben Goertzel and the core SingularityNET team.
                </p>
                <p className="md:w-2/3 mx-auto md:mx-0 mb-6">
                    Join SingularityNET, BeyondTheCode.ai and Wada for a one-of-a-kind experience that blends technical training, 
                    real-world problem solving, and decentralized innovation.
                </p>

                {/* Buttons */}
                <div className="flex flex-col space-y-3 space-x-0 md:flex-row md:space-x-4 md:space-y-0 items-center mb-6">
                    <SimpleButton
                        buttonText="1. Register"
                        redirectTo="https://lu.ma/y5jblri6"
                        className="!bg-wada-a !hover:bg-white !border-transparent"
                    />
                    <SimpleButton
                        buttonText="2. Begin Onboarding"
                        redirectTo="/"
                    />
                </div>

                {/* Scroll Down Prompt */}
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
        <div className="mt-20 flex flex-col items-center">
            <h2 className="text-2xl font-custom font-extrabold">When</h2>
            <ol className="md:w-2/3 lg:w-1/2 w-5/6 text-center">
                <li>July 24–Aug 5: Registration, testing</li>
                <li>Aug 1–8: Onboarding</li>
                <li>Aug 9–15: Virtual Teaching (MeTTa) iCog Ethiopia</li>
                <li>Aug 18–28: Hackathon & in-person intensive</li>
            </ol>
        </div>

        <div className="mt-20 flex flex-col items-center">
            <h2 className="text-2xl font-custom font-extrabold">Why</h2>
            <p className="md:w-2/3 lg:w-1/2 w-5/6 text-center">
                We&apos;re not just building a program; we&apos;re building the future of AGI talent in Africa.
                This partnership between SingularityNET, BeyondTheCode.ai, and Wada aims to grow a developer
                ecosystem that drives real-world innovation, workforce opportunities, and global tech equity.
            </p>
        </div>

        <div className="mt-20 flex flex-col items-center">
            <h2 className="text-2xl font-custom font-extrabold">What</h2>
            <p className="md:w-2/3 lg:w-1/2 w-5/6 text-center">
                BeyondTheCode.ai is a cultural and technical storytelling tool that documents how developers in
                Africa and the Global South are learning MeTTa, building AGI tools, and transforming their
                communities. It&apos;s not entertainment; it&apos;s education, impact tracking, and talent
                discovery rolled into one.
            </p>
        </div>

        <div className="mt-20 flex flex-col items-center">
            <h2 className="text-2xl font-custom font-extrabold">How</h2>
            <p className="md:w-2/3 lg:w-1/2 w-5/6 text-center">
                Through behind-the-scenes videos, real developer journeys, and hackathons like this event in Nairobi,
                Kenya, we spotlight builders and connect them to hiring pipelines, funding paths, and the BASIX platform.
                This content inspires peers, informs funders, and anchors new developers in a broader AGI mission.
            </p>
        </div>

        <div className="mt-20 flex flex-col items-center">
            <h2 className="text-2xl font-custom font-extrabold">Where</h2>
            <p className="md:w-2/3 lg:w-1/2 w-5/6 text-center">
                Starting with registration and virtual training online, we then meet in-person in Nairobi for a hackathon,
                where participants will be accompanied by Dr. Ben Goertzel himself to get hands-on training in MeTTa.
            </p>
        </div>

        <div className="mt-20 mb-40 flex flex-col items-center">
            <h2 className="text-2xl font-custom font-extrabold">Developer Tracks</h2>
            <p className="md:w-2/3 lg:w-1/2 w-5/6 text-center mb-3">
                Each track is designed with entry-level to advanced pathways. No prior MeTTa experience required.
            </p>
            <ol className="md:w-2/3 lg:w-1/2 w-5/6 text-center mb-6">
                <li>Track 1: Knowledge Graph Agents in MeTTa</li>
                <li>Track 2: Decentralized Media + AI Identity Tools</li>
                <li>Track 3: Real World Agents (Agriculture, Health, Education)</li>
                <li>Track 4: Visual Agents - AGI in Film, Sound, and Narrative</li>
            </ol>
            <div className="flex flex-col space-y-3 space-x-0 md:flex-row md:space-x-4 md:space-y-0 items-center">
                <SimpleButton
                    buttonText="1. Register"
                    redirectTo="https://lu.ma/y5jblri6"
                    className="!bg-wada-a !hover:bg-white !border-transparent"
                />
                <SimpleButton
                    buttonText="2. Begin Onboarding"
                    redirectTo="/"
                />
            </div>
        </div>
    </div>
)};


export default LandingPage;
