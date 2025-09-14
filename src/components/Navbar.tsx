import Link from "next/link";
import Image from "next/image";
import { FaXTwitter } from "react-icons/fa6";
import { FaTelegramPlane, FaGithub } from "react-icons/fa";
import { BsCalendarWeek } from "react-icons/bs";
import BurgerMenu from "@/components/BurgerMenu"; // Client-only burger menu
import { Countdown } from "@/components/Countdown";
import RegisterButton from "@/components/RegisterButton";

const iconClasses = "w-5 h-5 text-white transition-all duration-500 hover:scale-110";

export default function Navbar() {

  return (
    <div className="fixed right-0 left-0 top-0 z-50 w-full bg-transparent print:hidden">
      {/* Blurred background */}
      <div className="absolute -z-10 inset-0 backdrop-blur-sm bg-neutral-900/70 border-b border-neutral-800" />

      <nav className="mx-auto flex w-full items-center gap-4 px-6 justify-between h-16">
        {/* Logo */}
        <div className="flex flex-row gap-6 items-center">
          <Link
            href="https://www.wada.org/"
            className="me-auto flex items-center transition-opacity hover:opacity-75"
            aria-label="Wada"
          >
            <Image
              src="/brand_assets/Wada-RGB_Logo-Full-Alternative-Color.svg"
              width={140}
              height={60}
              alt="Wada Logo"
              priority
            />
          </Link>
          <Countdown />
        </div>

        {/* Desktop icons */}
        <div className="lg:flex items-center gap-4 hidden">
          <a href="https://github.com/WADAlliance/" target="_blank" rel="noopener noreferrer">
            <FaGithub className={`${iconClasses} hover:text-wada-a`} />
          </a>
          <a href="https://t.me/+cwjF0iDX0m81M2Y8/" target="_blank" rel="noopener noreferrer">
            <FaTelegramPlane className={`${iconClasses} hover:text-wada-b`} />
          </a>
          <a href="https://x.com/wada_org" target="_blank" rel="noopener noreferrer">
            <FaXTwitter className={`${iconClasses} hover:text-wada-c`} />
          </a>
          <a href="https://lu.ma/user/wada" target="_blank" rel="noopener noreferrer">
            <BsCalendarWeek className={`${iconClasses} hover:text-wada-d`} />
          </a>
          <RegisterButton/>
        </div>

        <BurgerMenu />
      </nav>
    </div>
  );
}
