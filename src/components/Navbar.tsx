'use client'
import Link from "next/link";
import Image from "next/image";
import BurgerMenu from "@/components/BurgerMenu";
import { usePathname } from "next/navigation";
import RegisterForSummitButton from "@/components/RegisterForSummitButton";
import { useState, useEffect, useRef } from "react";


export default function Navbar() {
  const pathname = usePathname() || "/";
  const navRef = useRef<HTMLDivElement>(null);
  const [hash, setHash] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window === "undefined") return;
    setHash(window.location.hash || "");
    const onHash = () => setHash(window.location.hash || "");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);


  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Venue', href: '/#venue' },
    { label: 'Speakers', href: '/#speakers' },
    { label: 'Program', href: '/#schedule' },
    { label: 'Hackathon', href: '/hackathon' },
  ];


  const isActive = (segment: string) => {
    if (!pathname) return false;
    if (segment === '/') return pathname === '/';
    if (segment.startsWith('/#')) {
      const s = `#${segment.split('#')[1]}`;
      return pathname === '/' && hash === s;
    }
    if (pathname.startsWith(segment)) return true;
    if (pathname === "/") {
      const s = segment.replace("/", "");
      return !!hash && hash.startsWith(`#${s}`);
    }
    return false;
  };


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

        document.documentElement.style.scrollBehavior = 'smooth';
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(() => {
          document.documentElement.style.scrollBehavior = '';
        }, 700);
      } else if (!targetHash) {

        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      history.replaceState(null, '', targetPath + (targetHash || ''));
      setHash(targetHash);
    }
  };

  return (
    <div className="fixed right-0 left-0 top-0 z-50 w-full bg-black print:hidden">


      <nav ref={navRef} className="relative mx-auto flex w-full items-center gap-4 px-6 justify-between h-16">
        <div className="flex flex-row gap-3 items-center">
          <Link
            href="/"
            className="me-auto flex items-center transition-opacity hover:opacity-75"
            aria-label="Wada"
          >
            <Image
              src="/brand_assets/CAT-logo.svg"
              width={250}
              height={50}
              alt="Cardano Africa Tech Summit Logo"
              priority
              className="h-10 w-auto"
            />
          </Link>
        </div>

        <div className="absolute left-1/2 top-1/2 hidden lg:flex transform -translate-x-1/2 -translate-y-1/2 flex-nowrap gap-10 items-center">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleAnchorClick}
              className={`font-extrabold duration-200 ${isActive(item.href) ? '' : 'text-white hover:text-wada-a'}`}
              style={{ color: isActive(item.href) ? '#f05a28' : undefined }}
            >
              {item.label}
            </Link>
          ))}


        </div>

        <div className="lg:flex items-center gap-4 hidden">

          <a
            href="/trip-planner"
            className="inline-flex items-center justify-center rounded-[6px] px-8 py-[15px] bg-[#80b741] hover:bg-[#80b741]/90 opacity-100 !text-white transition"
            style={{
              fontFamily: '"PP Telegraf", "Telegraf", sans-serif',
              fontWeight: 800,
              fontSize: '16px',
              lineHeight: '14px',
              letterSpacing: '-1%',
            }}
          >
            Plan My Trip
          </a>
          <RegisterForSummitButton text="Register Today" className=" font-telegraf" />
        </div>

        <BurgerMenu />
      </nav>

    </div>
  );
}
