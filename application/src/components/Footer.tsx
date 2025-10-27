import React from "react";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import { BsCalendarWeek } from "react-icons/bs";
import { FaTelegramPlane } from "react-icons/fa";
import Image from "next/image";

const Footer: React.FC = () => {
    return (
        <footer className="relative bg-black text-gray-300 py-12 px-6 border-t border-neutral-800 z-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                
                {/* Logo + About */}
                <div className="flex flex-row gap-3 items-start">
                    <Link
                    href="/"
                    className="me-auto flex items-center transition-opacity hover:opacity-75"
                    aria-label="Wada"
                    >
                    <Image
                        src="/brand_assets/cardano-logo.svg"
                        width={30}
                        height={30}
                        alt="Cardano Logo"
                        priority
                    />
                    <Image
                        src="/brand_assets/CAT-logo.svg"
                        width={120}
                        height={60}
                        alt="CAT Logo"
                        priority
                    />
                    </Link>
                </div>

                {/* Navigation */}
                <div>
                    <h3 className="text-white font-telegraf mb-4">Explore</h3>
                    <ul className="space-y-2">
                        <li><Link href="/enrolment" className="font-poppins hover:!text-wada-a duration-200">Enrolment</Link></li>
                        <li><Link href="/hackathon" className="font-poppins hover:!text-wada-a duration-200">Hackathon</Link></li>
                        <li><Link href="/summit" className="font-poppins hover:!text-wada-a duration-200">Summit</Link></li>
                        <li><Link href="https://www.wada.org" className="font-poppins hover:!text-wada-a duration-200">Wada</Link></li>
                        <li><Link href="https://www.cardano.org" className="font-poppins hover:!text-wada-a duration-200">Cardano</Link></li>
                    </ul>
                </div>

                {/* Docs / Resources */}
                <div>
                    <h3 className="text-white font-telegraf mb-4">Resources</h3>
                    <ul className="space-y-2">
                        <li><a href="https://docs.wada.org/faqs" className="font-poppins hover:!text-wada-a duration-200">FAQs</a></li>
                        <li><a href="https://docs.wada.org/hub-selection-criteria" className="font-poppins hover:!text-wada-a duration-200">Hub Criteria</a></li>
                        <li><a href="https://docs.wada.org/hackathon-difference" className="font-poppins hover:!text-wada-a duration-200">Hackathon Difference</a></li>
                    </ul>
                </div>

                {/* Social Links */}
                <div>
                    <h3 className="text-white font-telegraf mb-4">Connect</h3>
                    <div className="self-stretch inline-flex justify-start items-start gap-2 mb-4">
                        <div className="flex-1 min-w-[200px] px-2.5 py-3.5 bg-wada-f rounded-md flex justify-start items-center gap-2.5">
                            <input type="text" className="justify-start text-white/50 text-sm font-normal font-poppins" placeholder="Subscribe to Newsletter" />
                        </div>
                        <div className="px-5 py-3.5 bg-wada-a rounded-md flex justify-center items-center gap-2.5">
                            <div className="justify-start text-white text-base font-extrabold font-telegraf leading-none">Subscribe</div>
                        </div>
                    </div>
                    <div className="flex gap-5 text-xl">
                        <a href="https://x.com/wada_org" aria-label="Twitter" className="hover:!text-wada-a duration-200"><FaXTwitter /></a>
                        <a href="https://t.me/+RnO5qajd0AVjY2U8" aria-label="Telegram" className="hover:!text-wada-a duration-200"><FaTelegramPlane /></a>
                        <a href="https://luma.com/cats" target="_blank" rel="noopener noreferrer"><BsCalendarWeek className="hover:!text-wada-a duration-200" /></a>
                    </div>
                </div>
            </div>

            {/* Divider + Copyright */}
            <div className="mt-10 pt-6 border-t border-neutral-800 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} CArdano Africa Tech Summit. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
