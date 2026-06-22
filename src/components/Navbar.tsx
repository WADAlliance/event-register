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
    { label: 'About', href: '/#about' },
    { label: 'Venues', href: '/#venue' },
    { label: 'Sponsors', href: '/#partners' },
    { label: 'FAQs', href: '/#faqs' },
  ];

  const isActive = (segment: string) => {
    if (!pathname) return false;

    // Handle homepage specially
    if (segment === '/') return pathname === '/';

    // Handle anchor links explicitly
    if (segment.startsWith('/#')) {
      const s = `#${segment.split('#')[1]}`;
      return pathname === '/' && hash === s;
    }

    // Handle dedicated pages
    if (pathname === segment) return true;
    if (pathname.startsWith(segment) && segment !== '/') return true;

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
          <RegisterForSummitButton text="Join CATS 2027 Waitlist" className=" font-telegraf bg-[#ff4b26] border-none" />
        </div>

        <BurgerMenu />
      </nav>

    </div>
  );
}
