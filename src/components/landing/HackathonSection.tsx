import React from "react";

interface TimelineItem {
  number: string;
  color: string;
  accentColor: string;
  dateRange: string;
  description: string;
}

const timelineData: TimelineItem[] = [
  {
    number: "01",
    color: "text-yellow-500",
    accentColor: "bg-orange-500",
    dateRange: "Oct. 2 - Dec. 15",
    description: "Community driven hackathons",
  },
  {
    number: "02",
    color: "text-lime-500",
    accentColor: "bg-yellow-400",
    dateRange: "Dec. 16 - Dec. 30",
    description: "Winning Teams and Announcements.",
  },
  {
    number: "03",
    color: "text-cyan-400",
    accentColor: "bg-orange-500",
    dateRange: "Feb. 1 - Feb. 10",
    description: "In-person hackathon intensive in Nairobi for Kenya teams.",
  },
  {
    number: "04",
    color: "text-orange-500",
    accentColor: "bg-yellow-400",
    dateRange: "Feb. 11 - Feb. 13",
    description: "Cardano Africa Tech Summit (CATS26)",
  },
  {
    number: "05",
    color: "text-yellow-500",
    accentColor: "bg-transparent",
    dateRange: "Mar. 2026 - Aug. 2026",
    description: "In-person incubation style intensives for winning teams, moving from prototype to scaling.",
  },
];

export default function HackathonSection () {
  return (
    <div 
      className="relative w-full min-h-screen bg-black text-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: "url('/bg_img.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/60"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12 lg:mb-16">
          <h1 className="font-telegraf font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl mb-6 lg:mb-8">
            CATS Hackathon
          </h1>
          
          <p className="font-poppins text-base sm:text-lg lg:text-xl text-gray-200 max-w-4xl mx-auto mb-4 leading-relaxed px-4">
            Join a Hackathon unlike any other! Top 5 teams will be invited to Nairobi,
            Kenya to pitch live during the Cardano Africa Tech Summit 2026.
          </p>
          
          <p className="font-poppins text-sm sm:text-base lg:text-lg text-gray-300 mb-8 lg:mb-10">
            Hackathon Deadline - 30th October
          </p>
          
          <button className="inline-flex items-center justify-center px-8 py-3 sm:px-10 sm:py-4 border-2 border-orange-500 text-orange-500 font-telegraf font-bold text-base sm:text-lg rounded-md hover:bg-orange-500 hover:text-white transition-all duration-300">
            Join in on the Hackathon
          </button>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 max-w-6xl mx-auto">
          
          {timelineData.map((item, index) => (
            <div
              key={index}
              className="relative group"
            >
              {/* Accent Line */}
              <div 
                className={`absolute top-0 left-0 w-full h-1 ${item.accentColor} rounded-t-lg`}
              ></div>
              
              {/* Card */}
              <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-lg p-6 sm:p-8 hover:border-gray-700 transition-all duration-300">
                <div className="flex items-start gap-4 sm:gap-6">
                  {/* Number */}
                  <div className={`${item.color} font-telegraf font-bold text-5xl sm:text-6xl lg:text-7xl leading-none flex-shrink-0`}>
                    {item.number}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 pt-2">
                    <h3 className="font-telegraf font-bold text-xl sm:text-2xl lg:text-3xl text-white mb-2 sm:mb-3">
                      {item.dateRange}
                    </h3>
                    <p className="font-poppins text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};