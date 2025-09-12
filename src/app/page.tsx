"use client";

import { useRouter } from 'next/navigation';
import '../styles/globals.css'; 
import StakeholderCardGrid from '@/components/StakeholderCardGrid';

const stakeholderTypes = [
  { name: 'Participants', id: 'mD627j', description: 'Individuals', video: '/videos/cats_dinner.mp4' },
  { name: 'Communities of Place', id: 'w4NK1O', description: 'Regional hubs and locals', video: '/videos/boat_selfie.mp4' },
  { name: 'Communities of Practice', id: 'n9J7rK', description: 'Network representatives', video: '/videos/cats_fire.mp4' },
  { name: 'Partners', id: 'wQB7El', description: 'Technologies, funders, institutions', video: '/videos/cats_dance.mp4' },
];

export default function Home() {
  const router = useRouter(); // Initialise the router

  const handleCardClick = (id: string) => {
    router.push(`/register?type=${id}`); // Navigate to register page, loading tally form based on type id
  }

  return (
    <div className="relative h-[900px] md:h-[calc(100vh-4rem)] overflow-hidden mt-16">
      <div className="container mx-auto h-full p-6">
        <StakeholderCardGrid stakeholderTypes={stakeholderTypes} onCardClick={handleCardClick} />
      </div>
    </div>
  );
};
