'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { FaChevronDown } from "react-icons/fa6";
import SimpleButton from '@/components/SimpleButton';
import Image from 'next/image';
import '../../styles/globals.css';

const LandingPage: React.FC = () => {
    const [showLogoName, setShowLogoName] = useState<boolean>(false);
    const [showAllElse, setShowAllElse] = useState<boolean>(false);

    useEffect(() => {
        const appearComponents = () => {
            setTimeout(() => setShowLogoName(true), 0);
            setTimeout(() => setShowAllElse(true), 1500);
        };
        appearComponents();
    }, []);

    const variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    return (
        <div className="min-h-screen">
            {/* Hero */}
            <div className="relative">
                <div
                    className="fixed top-0 left-0 w-full h-full bg-cover bg-center bg-fixed -z-10"
                    style={{ backgroundImage: "url('/hero.jpg')" }}
                />

                <div className="flex flex-col md:flex-row justify-center items-center px-10 z-10 relative">
                    {/* Event Image */}
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
                                className="w-full md:w-auto rounded-lg cursor-pointer shadow-md"
                                width={400}
                                height={400}
                            />
                        </a>
                    </motion.div>

                    {/* Hero Text */}
                    <motion.div
                        initial="hidden"
                        animate={showAllElse ? "visible" : "hidden"}
                        variants={variants}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col justify-center w-full md:w-1/2 text-left"
                    >
                        <h1 className="text-3xl font-extrabold mb-4">
                            MeTTa Training & Hackathon Program
                        </h1>
                        <p className="mb-4">
                            We’re excited to invite you to the MeTTa Training and Hackathon Program powered by
                            SingularityNET.io, Wada and Beyondthecode.ai.
                        </p>
                        <p className="mb-6">
                            This program is part of Beyondthecode.ai — a global initiative documenting and accelerating the journeys of next-gen AI builders from Africa, India, and beyond. You won’t just learn; you’ll become part of the story shaping the future of decentralized, beneficial AGI.
                        </p>

                        <div className="flex flex-col space-y-3 md:flex-row md:space-x-4 md:space-y-0 items-start mb-6">
                            <SimpleButton
                                buttonText="1. Apply Now"
                                redirectTo="https://lu.ma/y5jblri6"
                                className="!bg-wada-a !hover:bg-white !border-transparent"
                            />
                            <SimpleButton
                                buttonText="2. Join WhatsApp Group"
                                redirectTo="https://chat.whatsapp.com/CpVH0BWoD3s6ZlGwj5255f"
                            />
                        </div>

                        <motion.div
                            initial="hidden"
                            animate={showAllElse ? "visible" : "hidden"}
                            variants={variants}
                            transition={{ duration: 0.5 }}
                            className="relative flex flex-col items-start justify-center"
                        >
                            <motion.div
                                className="absolute top-full mt-6 flex flex-col items-center animate-bounce"
                                initial="hidden"
                                animate={showAllElse ? "visible" : "hidden"}
                                variants={variants}
                                transition={{ duration: 0.5 }}
                            >
                                <span className="text-sm text-gray-300">Scroll Down</span>
                                <FaChevronDown className="text-white text-2xl mt-2" />
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Sections */}
            <main className="max-w-4xl mx-auto mt-20 space-y-12 px-4">
                <Card title="Where">
                    <p>
                        Location: Blockchain centre NBO, Maralal Oasis; Argwings Kodhek Road Rose Avenue, Nairobi - Kenya
                    </p>
                </Card>

                <Card title="What’s Included">
                    <p>From August 18th–28th, the 10-day program offers:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Direct training with Dr. Ben Goertzel, CEO of SingularityNET & ASI, and developers from iCog Labs</li>
                        <li>Hands-on tutorials in MeTTa, the symbolic programming language for AGI</li>
                        <li>A high-stakes Hackathon (Aug 24–28) with pathways to mentorship, internships, and recruitment</li>
                        <li>Daily networking with top talent and industry leaders and Founders of Wada</li>
                    </ul>
                    <p className="mt-4">
                        Selections close August 20th — only 50 in-person spots are available. If you're not selected for the in-person cohort, you’ll still receive an invitation to join the program virtually and access key sessions online.
                    </p>
                </Card>

                <Card title="Why Join In Person?">
                    <p>This immersive, in-person experience is designed to jumpstart your path into the future of AGI. As one of only 50 selected developers, you'll gain:</p>
                    <ul className="list-disc pl-5 space-y-2 mt-2">
                        <li>Live training with AGI pioneer Dr. Ben Goertzel, developers from iCog Labs Ethiopia, and Prof. Malik Koné of Tubman University, Liberia</li>
                        <li>Hands-on MeTTa tutorials that sharpen your skills in symbolic reasoning and prepare you for real-world AGI applications</li>
                        <li>A 4-day Hackathon (Aug 24–28) solving real-world problems—with winners and top teams gaining visibility across the SingularityNET ecosystem</li>
                    </ul>
                    <h3 className="text-lg font-semibold mt-4">In-Person Perks Include:</h3>
                    <ul className="list-disc pl-5 space-y-2 mt-2">
                        <li>🧠 Pathway to internships with iCog Labs for standout contributors</li>
                        <li>📜 MeTTa certification program initiated through your participation</li>
                        <li>💸 Surprise bonus for Problem Statement #6 — a chance to earn cash and secure a role building the BASIX Marketplace</li>
                        <li>🔁 Ongoing access to SingularityNET’s weekly MeTTa Masterclasses for highly motivated teams, regardless of final placement</li>
                        <li>🏆 Recognition, mentorship, and long-term ecosystem engagement</li>
                        <li>🍽 Daily lunch, refreshments, and energizing breaks</li>
                        <li>🎁 Limited-edition swag: t-shirts, wristbands, notebooks & more</li>
                    </ul>
                </Card>

                <Card title="How To Secure Your Spot">
		    <ol className="list-decimal pl-5 space-y-2">
    <li>
        <a 
            href="https://tally.so/r/wAgPr0" 
            className="!text-wada-a hover:text-blue-600!"
        >
            Complete the form
        </a>
    </li>
    <li>
        <a 
            href="https://chat.whatsapp.com/CpVH0BWoD3s6ZlGwj5255f" 
            className="!text-wada-a hover:text-blue-600!"
        >
            Join the WhatsApp group
        </a>
    </li>
</ol>

                    <p className="mt-4">
                        Priority will be given to applicants active in the WhatsApp group.
                    </p>
                </Card>

                <Card title="Deadline">
                    <p>
                        Applications close on <strong>August 20th</strong> — Only 50 in-person slots available. Don’t miss your chance to be part of this transformative program. Spots are limited - don’t miss your chance to be part of this game-changing program.
                    </p>
                </Card>

                {/* About Sections with Logos */}
                <CardWithLogo title="About WADA" logo="/brand_assets/Wada-RGB_Logo-Full-Alternative-Color.svg">
                    <p>
                        Wada is a grassroots organization advancing blockchain education, infrastructure, and innovation across Africa. With local hubs in over a dozen countries, Wada connects global partners to African developers and communities, supporting real-world applications of decentralized technology. Wada is an essential contributor to ASI’s mission to build inclusive, globally representative AI ecosystems.
                    </p>
                </CardWithLogo>

                <CardWithLogo title="About BeyondTheCode.ai" logo="/brand_assets/btc.png">
                    <p>
                        BeyondTheCode.ai is an immersive AI documentary and developer empowerment project. More than storytelling, it offers cultural scaffolding for technical learning—capturing the journeys of real developers building with MeTTa and ASI infrastructure. As part of the BASIX platform, BeyondTheCode.ai integrates education, credentialing, and visibility to support the next generation of AGI-native builders.
                    </p>
                </CardWithLogo>

                <CardWithLogo title="About SingularityNET" logo="/brand_assets/snet.png">
                    <p>
                        SingularityNET is a decentralized platform for AI services, founded by Dr. Ben Goertzel, with the goal of creating open, interoperable frameworks for Artificial General Intelligence. It is home to the MeTTa reasoning language, the Hyperon cognitive architecture, and the AGIX token. SingularityNET pioneers research in symbolic AI, logic-based cognition, and decentralized governance to advance beneficial AGI.
                    </p>
                </CardWithLogo>

                <CardWithLogo title="About iCog Labs" logo="/brand_assets/icog.png">
                    <p>
                        AI Research and Software Development. Our mission is to advance science and technology for the good of all humanity, with a special focus on advanced AI and on the use of cutting-edge technology to help leapfrog Africa into the future. iCog Labs is a team of visionary software professionals, dedicated to advancing the frontier of artificial intelligence research and applications and delivering quality products to customers, based in Addis Ababa, Ethiopia. We are core contributors to the OpenCog open source AI platform and utilize OpenCog within our projects as appropriate. Founded by Getnet Aseffa, CEO and Dr. Ben Goertzel, Chief Scientific Advisor.
                    </p>
                </CardWithLogo>
            </main>

            <div className="mb-40"></div>
        </div>
    );
};

const Card: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-purple-950/60 border-1 border-purple-700 shadow-md rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="space-y-3">{children}</div>
    </div>
);

const CardWithLogo: React.FC<{ title: string; logo: string; children: React.ReactNode }> = ({ title, logo, children }) => (
    <div className="bg-purple-950/60 border border-purple-700 shadow-md rounded-2xl p-6 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
        <div className="w-32 h-32 flex-shrink-0 relative">
            <Image src={logo} alt={title} fill className="object-contain" />
        </div>
        <div className="flex-1">
            <h2 className="text-xl font-bold mb-2">{title}</h2>
            <div className="space-y-3">{children}</div>
        </div>
    </div>
);


export default LandingPage;
