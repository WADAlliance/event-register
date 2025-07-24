'use client'

import Link from 'next/link'
import Image from 'next/image'
import { FaXTwitter } from "react-icons/fa6";
import { FaTelegramPlane, FaGithub } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { BsCalendarWeek } from "react-icons/bs";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";


const hoverColorClasses = [
    'hover:text-wada-a',
    'hover:text-wada-b',
    'hover:text-wada-c',
    'hover:text-wada-d',
  ];

const getRandomHoverColor = () => hoverColorClasses[Math.floor(Math.random() * hoverColorClasses.length)];

const iconClasses = 'w-5 h-5 transition-all duration-500 hover:scale-110'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle the mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Disable scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'; // Disable scrolling
    } else {
      document.body.style.overflow = ''; // Re-enable scrolling
    }

    return () => {
      document.body.style.overflow = ''; // Clean up when the component is unmounted
    };
  }, [menuOpen]);

  return (
    <>
        <header className="fixed right-0 left-0 top-0 z-50 w-full bg-transparent print:hidden">
            {/* Blurred background */}
            <div className="absolute -z-10 inset-0 backdrop-blur-sm bg-white/70 dark:bg-neutral-900/70 border-b border-neutral-200 dark:border-neutral-800" />

            <nav className="mx-auto flex w-full items-center gap-4 px-6 justify-between h-16">
                {/* Logo */}
                <Link
                href="https://www.wada.org/"
                className="me-auto flex items-center transition-opacity hover:opacity-75"
                aria-label="Wada"
                >
                    <div>
                        <Image
                            src="/brand_assets/Wada-RGB_Logo-Full-Alternative-Color.svg"
                            width={140}
                            height={60}
                            alt="Wada Logo"
                            priority={true}
                        />
                    </div>
                </Link>

                {/* Hamburger Menu for Mobile */}
                <button
                    onClick={toggleMenu}
                    className="lg:hidden flex flex-col gap-1.5 items-center justify-center p-2"
                    aria-label="Open menu"
                >
                    <div
                    className={`w-6 h-0.5 bg-white transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
                    ></div>
                    <div
                    className={`w-6 h-0.5 bg-white transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`}
                    ></div>
                    <div
                    className={`w-6 h-0.5 bg-white transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
                    ></div>
                </button>

                {/* Main icons */}
                <div className={`lg:flex items-center gap-4 hidden`}>
                    {/* GitHub */}
                    <a
                        href="https://github.com/WADAlliance/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaGithub className={`${iconClasses} ${getRandomHoverColor()}`} />
                    </a>

                    {/* Telegram */}
                    <a
                        href="https://t.me/+cwjF0iDX0m81M2Y8/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaTelegramPlane className={`${iconClasses} ${getRandomHoverColor()}`} />
                    </a>

                    {/* X (Twitter) */}
                    <a
                        href="https://x.com/wada_org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaXTwitter className={`${iconClasses} ${getRandomHoverColor()}`} />
                    </a>

                    {/* Luma */}
                    <a
                        href="https://lu.ma/wada"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <BsCalendarWeek className={`${iconClasses} ${getRandomHoverColor()}`} />
                    </a>
                    <button 
                        onClick={() => window.open('https://www.singularitynet.io', '_blank')}
                        className='flex flex-row gap-2 items-center justify-center simple-button bg-snet-c! text-snet-b! hover:bg-gradient-to-r! hover:from-snet-a! hover:to-snet-c! border-none!'
                    >
                        
                        SNET
                        <FaArrowUpRightFromSquare size={12}/>
                    </button>
                </div>
            </nav>
        </header>

        {/* Mobile Menu Overlay */}
        {menuOpen && (
            <div className="lg:hidden fixed inset-0 z-40 w-full h-full" onClick={toggleMenu}>
                <div className="backdrop-blur-md bg-black/60 p-4 absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                    <div className="flex flex-col gap-8 items-center">
                        <a href="https://github.com/WADAlliance/" className="text-white text-xl">GitHub</a>
                        <a href="https://t.me/+cwjF0iDX0m81M2Y8" className="text-white text-xl">Telegram</a>
                        <a href="https://x.com/wada_org" className="text-white text-xl">Twitter</a>
                        <a href="https://lu.ma/wada" className="text-white text-xl">Calendar</a>
                    </div>
                </div>
            </div>
        )}
    </>
    
  );
}
