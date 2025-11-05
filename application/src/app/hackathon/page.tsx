import React from "react";
import ExpandableImage from "@/components/ExpandableImage";
import RegisterEnrolButton from '@/components/RegisterEnrolCombo';

const HackathonPage = () => {
    return (
        <div className="relative z-10">
            <main className="max-w-4xl mx-auto mt-25 px-1 md:mt-40 space-y-12 z-10">
                
                <div className="hidden md:block relative w-full px-2 md:px-0 md:w-2/3 mx-auto border-1 border-neutral-600 rounded-2xl">
                    <div className="bg-white absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 overflow-hidden rounded-b-xl">
                        <p className="text-black text-center font-custom">Next Deadline</p>
                    </div>
                    <ExpandableImage src="/hubs_deadline.jpg" alt="Hub Deadline"/>
                </div>
                
                <RegisterEnrolButton />

                {/* 1. Introduction / Hook */}
                <Card title="Introduction">
                    <p>
                        Wada is once again teaming up with the Prisma team to deliver a hackathon unlike any other. 
                        This isn&apos;t about chasing flashy ideas that fade once the event ends — it&apos;s about building 
                        the foundations for real, lasting projects.
                    </p>
                    <p className="italic">
                        We are uncovering the principles of regeneration in place for the place to remember itself
                    </p>
                    <p>
                        CATS26 is the first summit in Africa to be shaped this way; not a single event, but a living process. 
                        It is technology guided by culture. It is Africa remembering itself in code, art, and community.
                    </p>
                    <p>
                        That means giving developers, community leaders, and innovators the tools, skills, and networks they 
                        need to design projects that grow beyond the event itself.
                    </p>
                    <p>
                        Together, we&apos;re creating the conditions for impact: projects that live on, teams that stay together, 
                        and communities that continue to benefit long after the hackathon is over.
                    </p>
                </Card>

                {/* 2. Context */}
                <Card title="Context">
                    <p>
                        This hackathon is part of the journey toward the{" "}
                        <span className="font-bold text-wada-a">Cardano Africa Tech Summit (CATS)</span>, 
                        taking place in <span className="font-bold">February 2026</span>. 
                        Across local partner hubs, developers and innovators will come together to form teams, 
                        design solutions, and bring their ideas to life.
                    </p>
                    <p>
                        The most promising projects won&apos;t stop at the hackathon — they&apos;ll continue to grow with ongoing support. 
                        Then, in Nairobi, the winning teams will present their work on the big stage, 
                        showcasing the depth of local talent and innovation to a global audience.
                    </p>
                    <p>
                        This is more than an event — it&apos;s a launchpad for Africa-driven projects that connect communities, 
                        technology, and the global Cardano ecosystem.
                    </p>
                </Card>

		        <div className="hidden md:block">
                    <ExpandableImage src="/roadmap_2.png" alt="Hackathon Process Diagram" />
                </div>

                {/* The Journey */}
                <Card title="The Journey">
                    <p>The path begins in October 2025</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><span className="font-bold text-wada-a">Amuse Bouche:</span> a small taste of what is to come</li>
                        <li><span className="font-bold text-wada-a">Enrollment:</span> participants gather, hub leaders trained, roles defined</li>
                        <li><span className="font-bold text-wada-a">Problem Statements:</span> communities name what calls for change before any code is written</li>
                        <li><span className="font-bold text-wada-a">Hackathons:</span> across the continent, 40 projects emerge from place-based inquiry and Cardano tools</li>
                        <li><span className="font-bold text-wada-a">Summit:</span> the top 5 projects are brought to Nairobi to be shared with the world</li>
                        <li><span className="font-bold text-wada-a">Beyond:</span> those 5 receive 3–6 months of incubation, moving from prototype to scaling</li>
                    </ul>
                </Card>

                {/* 4. The Offer / What to Expect */}
                <Card title="What to Expect">
                    <p className="font-bold">What participants will get:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Training, facilitation, and tools</li>
                        <li>A path from idea → project → visibility at Cardano Africa Tech Summit</li>
                        <li>Real community incubation support (not just a weekend sprint)</li>
                    </ul>
                    <p className="font-bold mt-4">Expected impact:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>250 developers + 375 collaborators engaged</li>
                        <li>125+ teams formed → 50 viable projects</li>
                        <li>Projects designed with regenerative and local relevance in mind</li>
                    </ul>
                </Card>

                {/* 5. How It Works */}
                <Card title="How It Works">
                    <p className="mb-2">The flow in simple terms:</p>
                    <ul className="list-decimal pl-5 space-y-2">
                        <li>Sign-up & orientation (“amuse bouche”)</li>
                        <li>Training & onboarding</li>
                        <li>Local cohorts via Wada hubs</li>
                        <li>Project incubation & reflection tools</li>
                        <li>Showcase at Cardano Summit</li>
                    </ul>
                    <p className="mt-4">
                        This reflects a <span className="font-bold text-wada-a">layered system design</span>: 
                        Participants → Teams → Hubs → Summit.
                    </p>
                </Card>

                {/* 6. Call to Action */}
                <Card title="Join Us">
                    <p>
                        Ready to be part of Africa&apos;s first living-process hackathon? 
                        Step into the village and start your journey toward CATS26.
                    </p>
                </Card>

                <div className="mb-40">
                    <RegisterEnrolButton />
                </div>
            </main>
        </div>
    );
};

const Card: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="backdrop-blur-3xl border-1 border-neutral-600 shadow-2xl rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="space-y-3">{children}</div>
    </div>
);

export default HackathonPage;
