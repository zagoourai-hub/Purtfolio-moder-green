"use client";

import React from "react";
import Link from "next/link";
import { Github, Linkedin, Twitter, Instagram } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const router = useRouter();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isSection: boolean) => {
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

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 pt-20 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16">
          
          {/* Brand info - taking 4 cols */}
          <div className="md:col-span-4 flex flex-col items-start">
            <Link
              href="/"
              className="flex items-center gap-3 group focus:outline-none mb-6"
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
                width="24"
                height="24"
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
            
            <p className="text-zinc-550 text-xs font-mono">
              &copy; {currentYear} Namakamu. Semua hak dilindungi.
            </p>
          </div>

          {/* Navigasi - 2 cols */}
          <div className="md:col-span-2 flex flex-col items-start">
            <h4 className="text-[10px] font-mono tracking-widest font-black text-zinc-500 uppercase mb-5">
              Navigasi
            </h4>
            <div className="flex flex-col gap-3 text-xs font-semibold text-zinc-400">
              <Link href="#hero" onClick={(e) => handleLinkClick(e, "#hero", true)} className="hover:text-yellow-300 transition-colors">
                Beranda
              </Link>
              <Link href="#about" onClick={(e) => handleLinkClick(e, "#about", true)} className="hover:text-yellow-300 transition-colors">
                Tentang Saya
              </Link>
              <Link href="/projects" className="hover:text-yellow-300 transition-colors">
                Proyek
              </Link>
              <Link href="/blog" className="hover:text-yellow-300 transition-colors">
                Blog
              </Link>
              <Link href="#contact" onClick={(e) => handleLinkClick(e, "#contact", true)} className="hover:text-yellow-300 transition-colors">
                Kontak
              </Link>
            </div>
          </div>

          {/* Layanan - 2 cols */}
          <div className="md:col-span-2 flex flex-col items-start">
            <h4 className="text-[10px] font-mono tracking-widest font-black text-zinc-500 uppercase mb-5">
              Layanan
            </h4>
            <div className="flex flex-col gap-3 text-xs font-semibold text-zinc-400">
              <Link href="/services" className="hover:text-yellow-300 transition-colors">
                Web Development
              </Link>
              <Link href="/services" className="hover:text-yellow-300 transition-colors">
                UI/UX Design
              </Link>
              <Link href="/services" className="hover:text-yellow-300 transition-colors">
                Branding
              </Link>
              <Link href="/services" className="hover:text-yellow-300 transition-colors">
                SEO Optimization
              </Link>
            </div>
          </div>

          {/* Kontak - 2 cols */}
          <div className="md:col-span-2 flex flex-col items-start">
            <h4 className="text-[10px] font-mono tracking-widest font-black text-zinc-500 uppercase mb-5">
              Kontak
            </h4>
            <div className="flex flex-col gap-3 text-xs font-semibold text-zinc-400">
              <a href="mailto:hello@namakamu.com" className="hover:text-yellow-300 transition-colors">
                hello@namakamu.com
              </a>
              <span className="text-zinc-400">+62 812 3456 7890</span>
              <span className="text-zinc-500">Jakarta, Indonesia</span>
            </div>
          </div>

          {/* Ikuti Saya + script accent - 2 cols */}
          <div className="md:col-span-2 flex flex-col items-start">
            <h4 className="text-[10px] font-mono tracking-widest font-black text-zinc-500 uppercase mb-5">
              Ikuti Saya
            </h4>
            <div className="flex items-center gap-3 mb-8">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center border border-zinc-900 bg-zinc-950 text-zinc-400 hover:text-yellow-300 transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center border border-zinc-900 bg-zinc-950 text-zinc-400 hover:text-yellow-300 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center border border-zinc-900 bg-zinc-950 text-zinc-400 hover:text-yellow-300 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center border border-zinc-900 bg-zinc-950 text-zinc-400 hover:text-yellow-300 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>

            {/* Handwritten lime tagline with rocket doodle */}
            <div className="relative -rotate-3">
              <span className="font-handwritten text-3xl font-bold text-yellow-300 leading-none drop-shadow-[0_0_14px_rgba(208,240,0,0.25)]">
                CODE.<br />CREATE.<br />IMPACT.
              </span>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="absolute -top-4 -right-5 text-yellow-300 rotate-12">
                <path d="M5 13c4-8 11-9 14-9 0 3-1 10-9 14l-3-1-2-2-1-2z" />
                <path d="M9 15l-3 3M5 13l-2 2M11 17l-1 3" strokeLinecap="round" />
              </svg>
            </div>
          </div>

        </div>

        {/* Fine subtext footer details */}
        <div className="mt-8 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-zinc-600">
          <p>Didesain ulang sesuai dengan spesifikasi referensi.</p>
          <p className="flex items-center gap-1">
            Build with premium aesthetics by
            <span className="font-semibold text-zinc-400">Zagoour Studio</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
