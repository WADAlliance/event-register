import React from "react";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import { BsCalendarWeek } from "react-icons/bs";
import { FaTelegramPlane } from "react-icons/fa";
import Image from "next/image";

const Footer: React.FC = () => {
    return (
        <footer className="bg-black/85 backdrop-blur-lg text-gray-300 py-12 px-6 border-t border-neutral-800 z-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                
                {/* Logo + About */}
                <div>
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/brand_assets/Wada-RGB_Logo-Full-Alternative-Color.svg"
                            width={120}
                            height={60}
                            alt="Wada Logo"
                            priority
                        />
                    </Link>
                    <p className="mt-4 text-sm text-gray-400 leading-relaxed">
                        We add to multiply.
                    </p>
                </div>

                {/* Navigation */}
                <div>
                    <h3 className="text-white font-semibold mb-4">Explore</h3>
                    <ul className="space-y-2">
                        <li><Link href="/enrolment" className="hover:!text-wada-a duration-200">Enrolment</Link></li>
                        <li><Link href="/hackathon" className="hover:!text-wada-a duration-200">Hackathon</Link></li>
                        <li><Link href="/summit" className="hover:!text-wada-a duration-200">Summit</Link></li>
                        <li><Link href="https://www.wada.org" className="hover:!text-wada-a duration-200">Wada</Link></li>
                        <li><Link href="https://www.cardano.org" className="hover:!text-wada-a duration-200">Cardano</Link></li>
                    </ul>
                </div>

                {/* Docs / Resources */}
                <div>
                    <h3 className="text-white font-semibold mb-4">Resources</h3>
                    <ul className="space-y-2">
                        <li><a href="https://docs.wada.org/resources/faqs" className="hover:!text-wada-a duration-200">FAQs</a></li>
                        <li><a href="https://docs.wada.org/resources/selectionCriteria" className="hover:!text-wada-a duration-200">Hub Criteria</a></li>
                        <li><a href="https://docs.wada.org/resources/hackathonDifference" className="hover:!text-wada-a duration-200">Hackathon Difference</a></li>
                    </ul>
                </div>

                {/* Social Links */}
                <div>
                    <h3 className="text-white font-semibold mb-4">Connect</h3>
                    <div className="flex gap-5 text-xl">
                        <a href="https://x.com/wada_org" aria-label="Twitter" className="hover:!text-wada-a duration-200"><FaXTwitter /></a>
                        <a href="https://t.me/+RnO5qajd0AVjY2U8" aria-label="Telegram" className="hover:!text-wada-a duration-200"><FaTelegramPlane /></a>
                        <a href="https://luma.com/cats" target="_blank" rel="noopener noreferrer"><BsCalendarWeek className="hover:!text-wada-a duration-200" /></a>
                    </div>
                </div>
            </div>

            {/* Divider + Copyright */}
            <div className="mt-10 pt-6 border-t border-neutral-800 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} WADA. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
