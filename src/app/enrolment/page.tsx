"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import '@/styles/globals.css';
import StakeholderCardGrid from '@/components/StakeholderCardGrid';

const stakeholderTypes = [
  { name: 'Participants', id: 'eqDVMl', description: 'Team Formations', video: '/videos/cats_dinner.mp4', extraInfo: "Participants are now invited to update their teams, if suitable.", disabled: false },
  { name: 'Communities of Place', id: 'GxKv6k', description: 'Hub story publishing', video: '/videos/boat_selfie.mp4', extraInfo: "Hubs are now invited to publish their first curation.", disabled: false },
  { name: 'Impact Networks', id: 'n9J7rK', description: 'Network representatives', video: '/videos/cats_fire.mp4', extraInfo: "# Role\nThis stakeholder is interested in how to best *collaborate*. \n\n# Profile Description\nProbably you are someone who \n- fits this kind of \n- archetype because if youre this archetype then youre this role innit.", disabled: true },
  { name: 'Partners', id: 'wQB7El', description: 'Technologies, funders, institutions', video: '/videos/cats_dance.mp4', extraInfo: "", disabled: true },
  { name: 'Participants', id: 'xXjA2G', description: 'Formations d’équipes', video: '/videos/cats_dinner.mp4', extraInfo: "Les participants sont désormais invités à mettre à jour les inscriptions de leur équipe.", disabled: false },
  { name: 'Communautés territoriales', id: 'QKM2Np', description: 'Publication des récits du hub', video: '/videos/boat_selfie.mp4', extraInfo: "Les hubs sont désormais invités à publier leur première curation.", disabled: false },
];

export default function Home() {
  const router = useRouter(); // Initialise the router
  const [isFrench, setIsFrench] = useState(false);

  const handleCardClick = (id: string) => {
    router.push(`/register?type=${id}`); // Navigate to register page, loading tally form based on type id
  }

  // Filter stakeholder types based on language toggle
  const frenchIds = ['xXjA2G', 'QKM2Np'];

  const filteredStakeholderTypes = isFrench
    ? stakeholderTypes.filter(type => frenchIds.includes(type.id)) // Only show French version
    : stakeholderTypes.filter(type => !frenchIds.includes(type.id)); // Show all except French version

  return (
    <div className="relative h-auto md:h-[calc(100vh-4rem)] overflow-hidden mt-16">
      <div className="container mx-auto h-full p-6 flex flex-col">
        {/* Language Toggle */}
        <div className="flex justify-center mb-6 flex-shrink-0">
          <div className="flex items-center space-x-4">
            <span className={`text-sm font-medium transition-colors ${!isFrench ? 'text-white' : 'text-gray-400'}`}>
              English
            </span>
            <button
              onClick={() => setIsFrench(!isFrench)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                isFrench ? 'bg-wada-b' : 'bg-wada-a'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isFrench ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm font-medium transition-colors ${isFrench ? 'text-white' : 'text-gray-400'}`}>
              Français
            </span>
          </div>
        </div>

        <div className="flex-1 min-h-0">
          <StakeholderCardGrid stakeholderTypes={filteredStakeholderTypes} onCardClick={handleCardClick} />
        </div>
      </div>
    </div>
  );
};