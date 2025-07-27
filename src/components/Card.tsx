import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaGlobe } from 'react-icons/fa6';
import Image from 'next/image';

interface Socials {
    [key: string]: string | undefined; // key: logo URL, value: link
}

interface CardProps {
    name: string;
    description: string; // Role for team members, field for partners
    socials: Socials;
    image: string;
    size: number;
}

const getIcon = (iconType) => {
    switch (iconType) {
        case 'github':
            return <FaGithub className="w-5 h-5" />;
        case 'linkedin':
            return <FaLinkedin className="w-5 h-5" />;
        case 'twitter':
            return <FaTwitter className="w-5 h-5" />;
        case 'globe':
            return <FaGlobe className="w-5 h-5" />;
        default:
            return null;
    }
};

const Card: React.FC<CardProps> = ({ name, description, socials, image, size }) => {
    const [highlighted, setHighlighted] = useState(false);

    const handleMouseEnter = () => {
        setHighlighted(true);
    };

    const handleMouseLeave = () => {
        setHighlighted(false);
    };

    const handleTouchStart = () => {
        setHighlighted((prev) => !prev); // Toggle highlight on click for touch devices
    };

    return (
        <motion.div
            className={`relative w-${size} h-auto m-6 flex items-center justify-center`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
        >
            <Image src={image} alt={name} width={size} height={size} style={{ objectFit: "contain" }} />
            {highlighted && (
                <motion.div
                    className="absolute inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center text-white rounded"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className='flex flex-col items-center justify-center text-center'>
                        <h3 className="text-lg">{name}</h3>
                        <p className="text-sm">{description}</p>
                    </div>
                    <div className="flex space-x-4 mt-2">
                        {Object.entries(socials).map(([iconType, link]) => {
                            let icon;
                            switch (iconType) {
                                case 'website':
                                    icon = FaGlobe;
                                    break;
                                case 'github':
                                    icon = FaGithub;
                                    break;
                                case 'linkedin':
                                    icon = FaLinkedin;
                                    break;
                                case 'twitter':
                                    icon = FaTwitter;
                                    break;
                                default:
                                    return null; // Skip if no matching icon
                            }
                            return (
                                <a
                                    key={iconType}
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onTouchStart={(event) => event.stopPropagation()} // Prevent touch event from bubbling up
                                >
                                    {getIcon(iconType)}
                                </a>
                            );
                        })}
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
};

export default Card;
