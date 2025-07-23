"use client";

import { useRouter } from 'next/navigation';
import '../styles/globals.css'; 
import Image from 'next/image'; 

const stakeholderTypes = [
  { name: 'Participants', id: '3NB7ON', description: 'Individuals', image: '/card-participant.jpg' },
  { name: 'Communities of Place', id: 'w4NK1O', description: 'Regional hubs and locals', image: '/card-copl.jpg' },
  { name: 'Communities of Practice', id: 'n9J7rK', description: 'Network representatives', image: '/card-copr.jpg' },
  { name: 'Partners', id: 'wQB7El', description: 'Technologies, funders, institutions', image: '/card-partners.jpg' },
];

export default function Home() {
  const router = useRouter(); // Initialise the router

  const handleCardClick = (id: string) => {
    router.push(`/register?type=${id}`); // Navigate to register page, loading tally form based on type id
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="mesh-gradient absolute inset-0 z-10" /> 
      <div className="min-h-screen flex flex-col items-center justify-center relative z-20 pt-5 pb-5">
        <a href="https://www.wada.org" target="_blank" rel="noopener noreferrer" className="mb-6">
          <Image 
              src="/brand_assets/Wada-RGB_Logo-Full-Alternative-Color.svg"
              alt="Wada Logo" 
              className="h-16 w-auto" 
              width={64} // Specify width
              height={64} // Specify height
          />
        </a>
        <div className="container mx-auto px-16 mb-6">
          <h1 className="text-4xl font-custom font-extrabold text-center text-white">Choose Your Registration Path</h1>
        </div>
        <div className="container mx-auto px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stakeholderTypes.map((type) => (
              <div
                key={type.id}
                onClick={() => handleCardClick(type.id)} // Call handleCardClick on click
                className="relative hover:bg-wada-b/30 rounded-xl border border-gray-600 shadow-lg overflow-hidden duration-500 cursor-pointer flex flex-col hover:scale-105"
              >
                <Image
                  src={type.image}
                  alt={type.name}
                  className="h-50 w-full object-cover mb-0"
                  width={200} 
                  height={150}
                />
                <div className="h-0.5 bg-gray-600" />
                <div className="absolute inset-0 -z-10" />
                <div className="p-6">
                  <h2 className="md:text-2xl font-custom text-white mb-2 z-20 relative truncate">{type.name}</h2>
                  <p className="font-custom text-gray-300 mb-4 truncate">{type.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
