import Link from "next/link";
import Image from "next/image";
import { FaXTwitter } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import { BsCalendarWeek } from "react-icons/bs";
import BurgerMenu from "@/components/BurgerMenu";
import RegisterButton from "@/components/RegisterButton";
import { TiHome } from "react-icons/ti";

const iconClasses = "w-5 h-5 text-white transition-all duration-500 hover:scale-110";

export default function Navbar() {

  return (
    <div className="fixed right-0 left-0 top-0 z-50 w-full bg-transparent print:hidden">
      {/* Blurred background */}
      <div className="absolute -z-10 inset-0 backdrop-blur-sm bg-neutral-900/70 border-b border-neutral-800" />

      <nav className="relative mx-auto flex w-full items-center gap-4 px-6 justify-between h-16">
        {/* Logos */}
        <div className="flex flex-row gap-3 items-center">
          <Link
            href="/"
            className="me-auto flex items-center transition-opacity hover:opacity-75"
            aria-label="Wada"
          >
            <Image
              src="/brand_assets/Wada-RGB_Logo-Full-Alternative-Color.svg"
              width={120}
              height={60}
              alt="Wada Logo"
              priority
            />
          </Link>
        </div>

        {/* Center links */}
        <div className="absolute left-1/2 top-1/2 hidden lg:flex transform -translate-x-1/2 -translate-y-1/2 gap-8 items-center">
            <Link
                href="/"
            >
                <TiHome className="text-gray-500 h-6 w-6 pb-1 hover:!text-wada-a duration-300"/>
            </Link>
            <Link
                href="/enrolment"
                className="font-custom text-white hover:!text-wada-a duration-300"
            >
                Enrolment
            </Link>
            <Link
                href="/hackathon"
                className="font-custom text-white hover:!text-wada-a duration-300"
            >
                Hackathon
            </Link>
            <Link
                href="/summit"
                className="font-custom text-white hover:!text-wada-a duration-300"
            >
                Summit
            </Link>
        </div>

        {/* Desktop icons */}
        <div className="lg:flex items-center gap-4 hidden">
          <a href="https://t.me/+RnO5qajd0AVjY2U8" target="_blank" rel="noopener noreferrer">
            <FaTelegramPlane className={`${iconClasses} hover:text-wada-b`} />
          </a>
          <a href="https://x.com/wada_org" target="_blank" rel="noopener noreferrer">
            <FaXTwitter className={`${iconClasses} hover:text-wada-c`} />
          </a>
          <a href="https://luma.com/prisma?tag=cats" target="_blank" rel="noopener noreferrer">
            <BsCalendarWeek className={`${iconClasses} hover:text-wada-d`} />
          </a>
          <RegisterButton/>
        </div>

        <BurgerMenu />
      </nav>
    </div>
  );
}
