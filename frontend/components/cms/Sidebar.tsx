"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebarStore } from "@/stores/use-sidebar-store";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Mail,
  HeartHandshake,
  BarChart3,
  Image as ImageIcon,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Proyek", href: "/dashboard/projects", icon: Briefcase },
  { name: "Blog", href: "/dashboard/blog", icon: FileText },
  { name: "Pesan", href: "/dashboard/leads", icon: Mail },
  { name: "Testimoni", href: "/dashboard/testimonials", icon: HeartHandshake },
  { name: "Statistik", href: "/dashboard/stats", icon: BarChart3 },
  { name: "Media", href: "/dashboard/media", icon: ImageIcon },
  { name: "Pengaturan", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { isOpen, toggle } = useSidebarStore();

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-20 h-screen border-r border-zinc-900 bg-black transition-all duration-300 ease-in-out flex flex-col justify-between overflow-y-auto overflow-x-hidden",
        isOpen ? "w-64" : "w-20"
      )}
    >
      <div>
        {/* Header / Logo */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-zinc-900/60">
          <Link href="/dashboard" className="flex flex-col overflow-hidden select-none">
            <div className="flex items-baseline gap-0.5">
              <span className="font-extrabold text-3xl text-white tracking-tight">P</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#d0f000] inline-block mb-1" />
            </div>
            {isOpen && (
              <span className="font-bold text-[10px] text-[#d0f000] tracking-[0.2em] -mt-1 uppercase">
                PORTFOLIO CMS
              </span>
            )}
          </Link>
          <button
            onClick={toggle}
            className="p-1 rounded-lg hover:bg-zinc-900/60 border border-zinc-800 text-zinc-500 hover:text-zinc-200 transition-all ml-2"
            aria-label="Toggle Sidebar"
          >
            {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>

        {/* KEEP BUILDING STICKER */}
        {isOpen && (
          <div className="px-6 py-4 flex justify-center">
            <div className="relative rotate-[-6deg] bg-zinc-100 text-black px-4 py-2 border-2 border-dashed border-zinc-800 shadow-[2px_2px_10px_rgba(0,0,0,0.5)] select-none">
              {/* Barcode representation */}
              <div className="flex items-center gap-0.5 h-2 mb-1.5 opacity-80">
                <div className="w-0.5 h-full bg-black"></div>
                <div className="w-1 h-full bg-black"></div>
                <div className="w-0.5 h-full bg-black"></div>
                <div className="w-1.5 h-full bg-black"></div>
                <div className="w-0.5 h-full bg-black"></div>
                <div className="w-2 h-full bg-black"></div>
                <div className="w-0.5 h-full bg-black"></div>
              </div>
              <span className="font-mono font-black text-xs tracking-wider uppercase">KEEP BUILDING</span>
            </div>
          </div>
        )}

        {/* Navigation Links */}
        <nav className="p-3 space-y-1.5 mt-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all group relative",
                  isActive
                    ? "bg-[#d0f000] text-black shadow-[0_0_15px_rgba(208,240,0,0.15)]"
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/40"
                )}
              >
                <Icon
                  className={cn(
                    "w-5 h-5 shrink-0 transition-transform group-hover:scale-105 duration-200",
                    isActive ? "text-black" : "text-zinc-400 group-hover:text-zinc-200"
                  )}
                />
                {isOpen ? (
                  <span className="transition-all duration-200">{item.name}</span>
                ) : (
                  <span className="absolute left-16 scale-0 bg-zinc-900 border border-zinc-800 text-white text-xs px-2.5 py-1.5 rounded-md shadow-md group-hover:scale-100 transition-all origin-left z-30 whitespace-nowrap">
                    {item.name}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer info */}
      <div className="flex flex-col space-y-4">
        {/* Handwritten text */}
        {isOpen && (
          <div className="px-6 py-2 select-none">
            <p className="font-handwritten text-[#d0f000] text-lg leading-snug tracking-wide text-left max-w-[200px]">
              KODE ITU SENI, LOGIKA ITU DAKWAH. <span className="inline-block font-sans font-medium text-sm rotate-12">:)</span>
            </p>
          </div>
        )}

        {/* Decorative Torn Paper Console */}
        {isOpen ? (
          <div className="px-4 pb-4">
            <div
              className="relative w-full h-24 bg-zinc-100 rounded shadow-inner rotate-3 p-3 overflow-hidden select-none border border-zinc-300"
              style={{
                backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)",
                backgroundSize: "12px 12px",
                clipPath: "polygon(0% 0%, 100% 4%, 96% 92%, 84% 96%, 70% 90%, 50% 98%, 30% 92%, 15% 96%, 4% 88%)",
              }}
            >
              {/* Box container for terminal symbol */}
              <div className="w-14 h-14 bg-black rounded flex items-center justify-center border-2 border-[#d0f000]/80 shadow-md">
                <span className="font-mono font-black text-xl text-[#d0f000] animate-pulse">&gt;_</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center pb-4">
            <div className="w-8 h-8 bg-black rounded flex items-center justify-center border border-[#d0f000] text-xs font-mono font-bold text-[#d0f000]">
              &gt;_
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

