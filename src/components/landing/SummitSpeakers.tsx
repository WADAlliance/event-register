import React from "react";

interface Speaker {
  name: string;
  role: string;
  image: string;
  imageClass: string;
}

const speakers: Speaker[] = [
  {
    name: "Preston Odep",
    role: "Designer @ Lido Nation",
    image: "/preston_img.png",
    imageClass: "",
  },
  {
    name: "Richmond Opong",
    role: "Designer @ Wada",
    image: "/richmond_img.png",
    imageClass: "rounded-[5px] object-cover",
  },
  {
    name: "Preston Odep",
    role: "Designer @ Lido Nation",
    image:  "/preston_img.png",
    imageClass: "",
  },
  {
    name: "Richmond Opong",
    role: "Designer @ Wada",
    image: "/richmond_img.png",
    imageClass: "rounded-[5px] object-cover",
  },
  {
    name: "Richmond Opong",
    role: "Designer @ Wada",
    image: "/richmond_img.png",
    imageClass: "rounded-[5px] object-cover",
  },
  {
    name: "Preston Odep",
    role: "Designer @ Lido Nation",
    image:  "/preston_img.png",
    imageClass: "",
  },
  {
    name: "Richmond Opong",
    role: "Designer @ Wada",
    image: "/richmond_img.png",
    imageClass: "rounded-[5px] object-cover",
  },
  {
    name: "Preston Odep",
    role: "Designer @ Lido Nation",
    image:  "/preston_img.png",
    imageClass: "",
  },
];

export default function SummiSpeaker () {
  return (
    <div className="w-full bg-white">
      {/* Main Container */}
      <div className="flex flex-col lg:flex-row w-full">
        
        {/* Left Column - Summit Speakers Section */}
        <div className="flex-1 flex flex-col items-center px-4 sm:px-6 lg:px-10 py-8 lg:py-[50px] border-r-0 lg:border-r-2 border-dashed border-gray-300">
          <div className="flex flex-col items-center gap-6 lg:gap-[39px] w-full max-w-6xl">
            
            {/* Header */}
            <header className="flex flex-col items-center gap-2.5 w-full">
              <div className="inline-flex items-start flex-wrap justify-center">
                <div className="inline-flex items-center justify-center gap-2.5 px-2.5 py-[5px]">
                  <h1 className="w-fit font-telegraf font-bold text-black text-2xl sm:text-3xl lg:text-4xl text-center leading-tight whitespace-nowrap">
                    Summit
                  </h1>
                </div>

                <div className="inline-flex items-center justify-center bg-[#80B741] gap-2.5 px-2.5 py-[5px] bg-lime-green rounded">
                  <h1 className="w-fit font-telegraf font-bold  text-white text-2xl sm:text-3xl lg:text-4xl text-center leading-tight whitespace-nowrap">
                    Speakers
                  </h1>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2.5 w-full">
                <div className="flex w-full max-w-[566px] items-center justify-center gap-2.5 px-2.5 py-0">
                  <p className="flex-1 font-poppins font-normal text-black text-sm sm:text-base text-center leading-6 sm:leading-7">
                    Discover visionary leaders, developers, and ecosystem pioneers
                    driving Cardano adoption across Africa.
                  </p>
                </div>
              </div>
            </header>

            {/* Speakers Grid - Desktop: 2 rows of 4, Mobile: Single column */}
            <div className="w-full">
              {/* First Row */}
              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-[39px] mb-6 lg:mb-[39px]">
                {speakers.slice(0, 4).map((speaker, index) => (
                  <div
                    key={`speaker-row1-${index}`}
                    className="flex flex-col items-start gap-2.5"
                  >
                    <div className="w-full">
                      <img
                        className={`w-full aspect-square object-cover ${speaker.imageClass}`}
                        alt={speaker.name}
                        src={speaker.image}
                      />
                    </div>

                    <div className="flex flex-col items-start gap-[5px] w-full">
                      <h2 className="font-telegraf font-bold text-black text-lg sm:text-xl lg:text-2xl leading-tight">
                        {speaker.name}
                      </h2>
                      <p className="font-poppins font-normal text-black text-sm sm:text-base leading-6 sm:leading-7">
                        {speaker.role}
                      </p>
                    </div>
                  </div>
                ))}
              </section>

              {/* Second Row */}
              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-[39px]">
                {speakers.slice(4, 8).map((speaker, index) => (
                  <div
                    key={`speaker-row2-${index}`}
                    className="flex flex-col items-start gap-2.5"
                  >
                    <div className="w-full">
                      <img
                        className={`w-full aspect-square object-cover ${speaker.imageClass}`}
                        alt={speaker.name}
                        src={speaker.image}
                      />
                    </div>

                    <div className="flex flex-col items-start gap-[5px] w-full">
                      <h2 className="font-telegraf font-bold text-black text-lg sm:text-xl lg:text-2xl leading-tight">
                        {speaker.name}
                      </h2>
                      <p className="font-poppins font-normal text-black text-sm sm:text-base leading-6 sm:leading-7">
                        {speaker.role}
                      </p>
                    </div>
                  </div>
                ))}
              </section>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-center w-full mt-4">
              <button className="inline-flex bg-[#80B741] items-center gap-2.5 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 bg-lime-green rounded-md hover:bg-lime-green/90 transition-colors">
                <span className="font-telegraf font-bold text-white text-base sm:text-lg lg:text-xl tracking-[-0.20px] leading-tight whitespace-nowrap">
                  Submit a Talk
                </span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};