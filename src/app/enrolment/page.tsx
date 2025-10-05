"use client";

import { useRouter } from 'next/navigation';
import '@/styles/globals.css'; 
import StakeholderCardGrid from '@/components/StakeholderCardGrid';

const stakeholderTypes = [
  { name: 'Participants', id: 'mD627j', description: 'Individuals', video: '/videos/cats_dinner.mp4', extraInfo: "Participants are all individuals including developers, artists, farmers, community leaders, and anyone else wanting to hack on local systems.", disabled: false },
  { name: 'Communities of Place', id: 'w4NK1O', description: 'Regional hubs and locals', video: '/videos/boat_selfie.mp4', extraInfo: "Place is your neighborhood, your community, your region, including hubs, the centres of place.", disabled: false },
  { name: 'Communities of Practice', id: 'n9J7rK', description: 'Network representatives', video: '/videos/cats_fire.mp4', extraInfo: "# Role\nThis stakeholder is interested in how to best *collaborate*. \n\n# Profile Description\nProbably you are someone who \n- fits this kind of \n- archetype because if youre this archetype then youre this role innit.", disabled: true },
  { name: 'Partners', id: 'wQB7El', description: 'Technologies, funders, institutions', video: '/videos/cats_dance.mp4', extraInfo: "", disabled: true },
];

export default function Home() {
  const router = useRouter(); // Initialise the router

  const handleCardClick = (id: string) => {
    router.push(`/register?type=${id}`); // Navigate to register page, loading tally form based on type id
  }

  return (
    <div className="relative h-auto md:h-[calc(100vh-4rem)] overflow-hidden mt-16">
      <div className="container mx-auto h-full p-6">
        <StakeholderCardGrid stakeholderTypes={stakeholderTypes} onCardClick={handleCardClick} />
      </div>
    </div>
  );
};
