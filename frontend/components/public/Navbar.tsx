"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";

interface NavLink {
  label: string;
  href: string;
  isSection: boolean;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks: NavLink[] = [
    { label: "Beranda", href: "#hero", isSection: true },
    { label: "Tentang Saya", href: "#about", isSection: true },
    { label: "Proyek", href: "/projects", isSection: false },
    { label: "Blog", href: "/blog", isSection: false },
    { label: "Kontak", href: "#contact", isSection: true },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isSection: boolean) => {
    setIsOpen(false);
    
    if (isSection) {
      e.preventDefault();
      if (pathname === "/") {
        const targetId = href.replace("#", "");
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", href);
        }
      } else {
        router.push(`/${href}`);
      }
    }
  };

  const isLinkActive = (link: NavLink) => {
    if (!link.isSection) {
      return pathname.startsWith(link.href);
    }
    if (pathname === "/") {
      if (typeof window !== "undefined") {
        const hash = window.location.hash || "#hero";
        return hash === link.href;
      }
      return link.href === "#hero"; // Default to Beranda on SSR
    }
    return false;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-350 ${
        isScrolled
          ? "bg-zinc-950/90 backdrop-blur-md border-b border-zinc-900 py-3 shadow-xl"
          : "bg-transparent py-5 border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo with crosshair */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
                window.history.pushState(null, "", "#hero");
              }
            }}
          >
            {/* Fine crosshair SVG */}
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              className="text-zinc-400 group-hover:text-yellow-300 transition-colors"
            >
              <circle cx="12" cy="12" r="7" />
              <line x1="12" y1="2" x2="12" y2="22" />
              <line x1="2" y1="12" x2="22" y2="12" />
            </svg>
            <span className="font-sans font-extrabold text-2xl tracking-tighter text-zinc-100">
              P<span className="text-yellow-300">.</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = isLinkActive(link);
              return (
                <Link
                  key={link.label}
                  href={link.isSection && pathname !== "/" ? `/${link.href}` : link.href}
                  onClick={(e) => handleLinkClick(e, link.href, link.isSection)}
                  className={`relative py-1 text-sm font-medium transition-all duration-200 focus:outline-none ${
                    active
                      ? "text-yellow-300"
                      : "text-zinc-400 hover:text-zinc-100"
                  }`}
                >
                  {link.label}
                  {/* Yellow underline for active link */}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-yellow-300 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Button & Smiley */}
          <div className="hidden md:flex items-center gap-5">
            <Link
              href="#contact"
              onClick={(e) => handleLinkClick(e, "#contact", true)}
              className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-yellow-300 hover:bg-yellow-400 text-zinc-950 text-xs font-bold tracking-wider transition-all duration-200 focus:outline-none"
            >
              Ayo Ngobrol
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            {/* Smiley face icon */}
            <svg
              width="30"
              height="30"
              viewBox="0 0 28 28"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-zinc-300 hover:text-yellow-300 transition-colors cursor-pointer"
            >
              <circle cx="14" cy="14" r="11" />
              <circle cx="10" cy="11" r="1.2" fill="currentColor" />
              <circle cx="18" cy="11" r="1.2" fill="currentColor" />
              <path
                d="M10 16.5C10 16.5 11.5 19 14 19C16.5 19 18 16.5 18 16.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-zinc-950 border-b border-zinc-900 px-6 py-6 space-y-3 shadow-2xl">
          {navLinks.map((link) => {
            const active = isLinkActive(link);
            return (
              <Link
                key={link.label}
                href={link.isSection && pathname !== "/" ? `/${link.href}` : link.href}
                onClick={(e) => handleLinkClick(e, link.href, link.isSection)}
                className={`block px-4 py-3 rounded-none text-base font-medium transition-colors ${
                  active
                    ? "text-yellow-300 bg-zinc-900/50"
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/20"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="#contact"
            onClick={(e) => handleLinkClick(e, "#contact", true)}
            className="block w-full text-center mt-6 px-4 py-3 rounded-none bg-yellow-300 text-zinc-950 font-bold text-sm hover:bg-yellow-400 transition-colors"
          >
            Ayo Ngobrol
          </Link>
        </div>
      )}
    </header>
  );
}
