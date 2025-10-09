"use client";

import Image from "next/image";
import { useState } from "react";

type ExpandableImageProps = {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
};

const ExpandableImage: React.FC<ExpandableImageProps> = ({
    src,
    alt,
    width = 800,
    height = 600,
    className = "",
}) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Thumbnail */}
            <div className="cursor-pointer" onClick={() => setOpen(true)}>
                <Image
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    className={`rounded-lg w-full shadow-md ${className}`}
                />
            </div>

            {/* Fullscreen Modal */}
            {open && (
                <div
                    className="fixed top-0 left-0 right-0 bottom-0 mt-16 backdrop-blur-2xl flex items-center justify-center z-50 px-20"
                    onClick={() => setOpen(false)}
                >
                    <div className="relative w-full h-full">
                        <Image
                            src={src}
                            alt={alt}
                            fill
                            className="object-contain cursor-zoom-out"
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default ExpandableImage;
