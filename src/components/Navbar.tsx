'use client'
import Link from "next/link";
import Image from "next/image";
import { FaChevronDown } from "react-icons/fa6";
import BurgerMenu from "@/components/BurgerMenu";
// home icon removed
import { usePathname } from "next/navigation";
import RegisterForSummitButton from "@/components/RegisterForSummitButton";
import { useState, useEffect, useRef } from "react";


export default function Navbar() {
  const pathname = usePathname() || "/";
  const [openMenu, setOpenMenu] = useState<null | "hackathon">(null);
  const navRef = useRef<HTMLDivElement>(null);
  const [hash, setHash] = useState('');
  const [isPartnerOpen, setPartnerOpen] = useState(false);

  // Track hash changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    setHash(window.location.hash || "");
    const onHash = () => setHash(window.location.hash || "");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // central nav items (order matches the header image)
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/#about' },
    { label: 'Venue', href: '/#venue' },
    { label: 'Speakers', href: '/#speakers' },
    { label: 'Our Partners', href: '/#partners' },
    { label: 'Program', href: '/#schedule' },
  ];

  // Close dropdown on outside click
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Close dropdown when pathname or hash changes
  useEffect(() => {
    setOpenMenu(null);
  }, [pathname, hash]);

  // Check if a section is active (for button highlight)
    const isActive = (segment: string) => {
      if (!pathname) return false;
      if (segment === '/') return pathname === '/';
      if (segment.startsWith('/#')) {
        const s = `#${segment.split('#')[1]}`;
        return pathname === '/' && hash === s;
      }
      if (pathname.startsWith(segment)) return true;
      if (pathname === "/") {
        const s = segment.replace("/", ""); // "/hackathon" -> "hackathon"
        return !!hash && hash.startsWith(`#${s}`);
      }
      return false;
    };

  // Handle same-page anchor clicks (smooth scroll + close dropdown)
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.href;
    const url = new URL(href);
    const targetPath = url.pathname;
    const targetHash = url.hash;

    const isSamePage = targetPath === pathname;

    if (isSamePage) {
      e.preventDefault();
      const id = targetHash.slice(1);
      const el = document.getElementById(id) || document.querySelector(`[data-anchor="${id}"]`);
      if (el) {
        // smooth scroll
        document.documentElement.style.scrollBehavior = 'smooth';
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(() => {
          document.documentElement.style.scrollBehavior = '';
        }, 700);
      } else if (!targetHash) {
        // Scroll to top if no hash
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      history.replaceState(null, '', targetPath + (targetHash || ''));
      setHash(targetHash);
      setOpenMenu(null);
    }
  };

  return (
    <div className="fixed right-0 left-0 top-0 z-50 w-full bg-black print:hidden">
      {/* Blurred background */}
      <div className="absolute -z-10 inset-0 backdrop-blur-sm bg-neutral-900/70 border-b border-neutral-800" />

      <nav ref={navRef} className="relative mx-auto flex w-full items-center gap-4 px-6 justify-between h-16">
        {/* Logos */}
        <div className="flex flex-row gap-3 items-center">
          <Link
            href="/"
            className="me-auto flex items-center transition-opacity hover:opacity-75"
            aria-label="Wada"
          >
            <Image
              src="/brand_assets/cardano-logo.svg"
              width={30}
              height={60}
              alt="Cardano Logo"
              priority
            />
            <Image
              src="/brand_assets/CAT-logo.svg"
              width={100}
              height={100}
              alt="Cardano Logo"
              priority
            />
          </Link>
        </div>

        {/* Center links */}
        <div className="absolute left-1/2 top-1/2 hidden lg:flex transform -translate-x-1/2 -translate-y-1/2 w-[792px] flex-nowrap justify-between items-center">
          {/* Home icon removed */}
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleAnchorClick}
              className={`font-extrabold px-2 py-1 rounded duration-200 ${isActive(item.href) ? '' : 'text-white hover:text-wada-a'}`}
              style={{ color: isActive(item.href) ? '#eb5626' : undefined }}
            >
              {item.label}
            </Link>
          ))}

          {/* HACKATHON DROPDOWN */}
          <div
            className="relative"
            onMouseEnter={() => setOpenMenu("hackathon")}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button
              aria-expanded={openMenu === "hackathon"}
              className="flex items-center gap-1 font-extrabold px-2 py-1 rounded duration-200"
              style={{
                backgroundColor: isActive("/hackathon") ? '#eb5626' : undefined,
                color: isActive("/hackathon") ? '#ffffff' : undefined,
              }}
            >
              Hackathon <FaChevronDown className="text-sm" style={{ color: isActive("/hackathon") ? '#ffffff' : '#ffffff' }} />
            </button>

            <div
              className={`absolute left-0 pt-2 transition-all duration-200
              ${
                openMenu === "hackathon"
                  ? "opacity-100 visible"
                  : "opacity-0 invisible pointer-events-none"
              }`}
            >
              <div className="bg-black/90 shadow-lg rounded-lg w-48">
                <Link
                  href="/hackathon"
                  onClick={handleAnchorClick}
                  className={`block px-4 py-2 text-sm duration-100
                ${
                    pathname === "/hackathon" && (hash === "" || hash === "#hackathon") || (pathname === "/" && hash === "#hackathon")
                      ? "bg-wada-a text-white font-bold"
                      : "text-white hover:text-wada-a"
                  }`}
                >
                  Overview
                </Link>
              </div>

            </div>
          </div>

          {/* Summit removed from header */}


          {/* Dropdown Section */}
          {/*<div className="relative group">*/}
          {/*    <button*/}
          {/*        className="flex items-center gap-1 font-telegraf font-extrabold text-white hover:!text-wada-a duration-300"*/}
          {/*    >*/}
          {/*        Resources <FaChevronDown className="text-wada-a ml-1 text-sm" />*/}
          {/*    </button>*/}

          {/*    /!* Dropdown Menu *!/*/}
          {/*    <div className="absolute left-0 mt-2 w-60 bg-black/90 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">*/}
          {/*        <Link*/}
          {/*            href="https://docs.wada.org/Resources/hackathonDifference"*/}
          {/*            className="block px-4 py-2 text-sm text-white hover:!text-wada-a duration-100"*/}
          {/*        >*/}
          {/*            <span className="inline">*/}
          {/*                What Makes This Hackathon Different? <HiArrowUpRight className="relative inline-block text-wada-a h-[10px] w-[10px] bottom-[4px]" />*/}
          {/*            </span>*/}
          {/*        </Link>*/}
          {/*        <Link*/}
          {/*            href="https://docs.wada.org/Resources/selectionCriteria"*/}
          {/*            className="block px-4 py-2 text-sm text-white hover:!text-wada-a duration-100"*/}
          {/*        >*/}
          {/*            <span className="inline">*/}
          {/*                Hub Selection Criteria <HiArrowUpRight className="relative inline-block text-wada-a h-[10px] w-[10px] bottom-[4px]" />*/}
          {/*            </span>*/}
          {/*        </Link>*/}
          {/*        <Link*/}
          {/*            href="https://docs.wada.org/Resources/faqs"*/}
          {/*            className="block px-4 py-2 text-sm text-white hover:!text-wada-a duration-100"*/}
          {/*        >*/}
          {/*          <span className="inline">*/}
          {/*            FAQs <HiArrowUpRight className="relative inline-block text-wada-a h-[10px] w-[10px] bottom-[4px]" />*/}
          {/*          </span>*/}
          {/*        </Link>*/}
          {/*    </div>*/}
          {/*</div>*/}
        </div>

        {/* Desktop icons */}
        <div className="lg:flex items-center gap-4 hidden">
          {/* <a href="https://t.me/+RnO5qajd0AVjY2U8" target="_blank" rel="noopener noreferrer">
            <FaTelegramPlane className={`${iconClasses} hover:text-wada-b`} />
          </a>
          <a href="https://x.com/wada_org" target="_blank" rel="noopener noreferrer">
            <FaXTwitter className={`${iconClasses} hover:text-wada-c`} />
          </a>
          <a href="https://luma.com/cats" target="_blank" rel="noopener noreferrer">
            <BsCalendarWeek className={`${iconClasses} hover:text-wada-d`} />
          </a> */}
          {/*<RegisterButton/>*/}
          <RegisterForSummitButton text="Register Today" className=" font-telegraf" />
        </div>

        <BurgerMenu />
      </nav>

    
    </div>
  );
}
