"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

const partnerLogos = [
    {
        src: "/brand_assets/Wada-RGB_Logo-Full-Alternative-Color.svg",
        alt: "Wada",
        href: "https://www.wada.org/",
    },
    {
        src: "/brand_assets/Prisma_Full.svg",
        alt: "Prisma",
        href: "https://www.prisma.events/",
    },
    {
        src: "/brand_assets/Cardano Africa Summit Logo-12.png",
        alt: "CATS",
        href: "https://x.com/africa_townhall",
    },
    {
        src: "/brand_assets/Cardano Africa Summit Logo-15.png",
        alt: "Remo Start",
        href: "https://x.com/RemoStart",
    },
    {
        src: "/brand_assets/Cardano Africa Summit Logo-17.png",
        alt: "Blockchain Centre",
        href: "https://x.com/BCentreNBO",
    },
    {
        src: "/brand_assets/Cardano Africa Summit Logo-21.png",
        alt: "Lido Nation",
        href: "https://x.com/LidoNation",
    },
];

export default function RotatingLogo() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % partnerLogos.length);
        }, 3000); // rotate every 3s
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-[120px] h-[50px] overflow-hidden">
            <div
                key={index}
                className="absolute inset-0 flex items-center justify-center animate-slideDown"
            >
                <Link
                    href={partnerLogos[index].href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                >
                    <Image
                        src={partnerLogos[index].src}
                        alt={partnerLogos[index].alt}
                        width={120}
                        height={50}
                        priority
                    />
                </Link>
            </div>
        </div>
    );
}
