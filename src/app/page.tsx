"use client";

import { useRouter } from 'next/navigation';
import '../styles/globals.css'; 
import StakeholderCardGrid from './components/StakeholderCardGrid';

const stakeholderTypes = [
  { name: 'Participants', id: 'mD627j', description: 'Individuals', video: '/videos/cats_dinner.mp4' },
  { name: 'Communities of Place', id: 'w4NK1O', description: 'Regional hubs and locals', video: '/videos/cats_dinner.mp4' },
  { name: 'Communities of Practice', id: 'n9J7rK', description: 'Network representatives', video: '/videos/cats_dinner.mp4' },
  { name: 'Partners', id: 'wQB7El', description: 'Technologies, funders, institutions', video: '/videos/cats_dinner.mp4' },
];

export default function Home() {
  const router = useRouter(); // Initialise the router

  const handleCardClick = (id: string) => {
    router.push(`/register?type=${id}`); // Navigate to register page, loading tally form based on type id
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="flex flex-col items-center justify-end relative z-20 min-h-screen">
        <div className="container mx-auto">
          <StakeholderCardGrid stakeholderTypes={stakeholderTypes} onCardClick={handleCardClick} />
        </div>
      </div>
    </div>
  );
}
