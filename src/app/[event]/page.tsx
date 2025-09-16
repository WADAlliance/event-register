'use client';

import Image from 'next/image';
import '../../styles/globals.css';
import RegisterButton from '@/components/RegisterButton';
import BackgroundBlobScene from '@/components/3d/ChromeSphere';
import EventsPopup from '@/components/EventsPopup';
import { Countdown } from '@/components/Countdown';
import { PhaseInfo } from '@/components/PhaseInfo';

const LandingPage: React.FC = () => {
    return (
        <div className="min-h-screen">
            <div className="relative pb-40">
                
                <BackgroundBlobScene />
                <EventsPopup />

                <div className="py-25">
                    <div className="flex flex-col items-center w-5/6 md:w-1/3 mx-auto z-10 space-y-4 backdrop-blur-3xl rounded-4xl border border-neutral-600 py-10">
                        <Countdown />
                        <Image
                            src="/Cardano-RGB_Logo-Icon-White.svg"
                            alt="Event card"
                            className="w-4/5 md:w-3/5 p-6"
                            width={350}
                            height={350}
                        />
                        <h1 className='font-custom font-bold text-3xl text-center'>CARDANO AFRICA TECH SUMMIT</h1>
                        <p className='font-custom text-xl text-center'>Nairobi, February 11 — 13, 2026</p>
                        <PhaseInfo />
                        <RegisterButton />
                    </div>
                </div>

                <main className="max-w-4xl mx-auto mt-20 space-y-12 px-4">
                    <Card title="Where">
                        <p>
                            Location: Blockchain centre NBO, Maralal Oasis; Argwings Kodhek Road Rose Avenue, Nairobi - Kenya
                        </p>
                    </Card>

                    <Card title="What&apos;s Included">
                        <p>From August 18th—28th, the 10-day program offers:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Direct training with Dr. Ben Goertzel, CEO of SingularityNET & ASI, and developers from iCog Labs</li>
                            <li>Hands-on tutorials in MeTTa, the symbolic programming language for AGI</li>
                            <li>A high-stakes Hackathon (Aug 24–28) with pathways to mentorship, internships, and recruitment</li>
                            <li>Daily networking with top talent and industry leaders and Founders of Wada</li>
                        </ul>
                        <p className="mt-4">
                            Selections close August 20th — only 50 in-person spots are available. If you&apos;re not selected for the in-person cohort, you&apos;ll still receive an invitation to join the program virtually and access key sessions online.
                        </p>
                    </Card>

                    <Card title="Why Join In Person?">
                        <p>This immersive, in-person experience is designed to jumpstart your path into the future of AGI. As one of only 50 selected developers, you&apos;ll gain:</p>
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
                            <li>🔁 Ongoing access to SingularityNET&apos;s weekly MeTTa Masterclasses for highly motivated teams, regardless of final placement</li>
                            <li>🏆 Recognition, mentorship, and long-term ecosystem engagement</li>
                            <li>🍽 Daily lunch, refreshments, and energizing breaks</li>
                            <li>🎁 Limited-edition swag: t-shirts, wristbands, notebooks &amp; more</li>
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
                            Applications close on <strong>August 20th</strong> — Only 50 in-person slots available. Don&apos;t miss your chance to be part of this transformative program. Spots are limited - don&apos;t miss your chance to be part of this game-changing program.
                        </p>
                    </Card>

                    {/* About Sections with Logos */}
                    <CardWithLogo title="About WADA" logo="/brand_assets/Wada-RGB_Logo-Full-Alternative-Color.svg">
                        <p>
                            Wada is a grassroots organization advancing blockchain education, infrastructure, and innovation across Africa. With local hubs in over a dozen countries, Wada connects global partners to African developers and communities, supporting real-world applications of decentralized technology. Wada is an essential contributor to ASI&apos;s mission to build inclusive, globally representative AI ecosystems.
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

                    <Card title="About iCog Labs">
                        <p>
                            AI Research and Software Development. Our mission is to advance science and technology for the good of all humanity, with a special focus on advanced AI and on the use of cutting-edge technology to help leapfrog Africa into the future. iCog Labs is a team of visionary software professionals, dedicated to advancing the frontier of artificial intelligence research and applications and delivering quality products to customers, based in Addis Ababa, Ethiopia. We are core contributors to the OpenCog open source AI platform and utilize OpenCog within our projects as appropriate. Founded by Getnet Aseffa, CEO and Dr. Ben Goertzel, Chief Scientific Advisor.
                        </p>
                    </Card>
                </main>
            </div>
        </div>
    );
};

const Card: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="backdrop-blur-3xl border-1 border-neutral-600 shadow-2xl rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="space-y-3">{children}</div>
    </div>
);

const CardWithLogo: React.FC<{ title: string; logo: string; children: React.ReactNode }> = ({ title, logo, children }) => (
    <div className="backdrop-blur-3xl border-1 border-neutral-600 shadow-2xl rounded-2xl p-6 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
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
