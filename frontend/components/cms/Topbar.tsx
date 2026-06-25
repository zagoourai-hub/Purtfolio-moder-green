"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Search, Bell, Sun, ChevronDown, User } from "lucide-react";

export default function Topbar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const isHome = pathname === "/dashboard";

  const getPageTitle = (path: string) => {
    if (path === "/dashboard") return "Dashboard Admin";
    const segments = path.split("/").filter(Boolean);
    if (segments.length <= 1) return "Dashboard";
    
    const lastSegment = segments[segments.length - 1];
    return lastSegment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const getPageSubtitle = (path: string) => {
    if (path === "/dashboard") {
      return "Selamat datang kembali, Admin! Kelola portofolio dan kontenmu dengan mudah.";
    }
    return `Kelola data ${getPageTitle(path).toLowerCase()} situs portofolio Anda secara real-time.`;
  };

  return (
    <header className="pt-8 pb-6 px-8 bg-zinc-950 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-300">
      {/* Title & Welcome message */}
      <div className="space-y-1 relative">
        <div className="inline-block relative">
          <h2 className="text-3xl font-extrabold tracking-tight text-white font-sans">
            {getPageTitle(pathname)}
          </h2>
          {isHome && (
            <div className="absolute left-0 -bottom-1.5 w-24 h-1.5 select-none pointer-events-none">
              {/* Hand-drawn underline SVG */}
              <svg viewBox="0 0 100 10" width="100%" height="100%" preserveAspectRatio="none">
                <path
                  d="M0,5 Q30,8 50,4 T100,5"
                  fill="none"
                  stroke="#d0f000"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          )}
        </div>
        <p className="text-xs text-zinc-400 font-medium pt-1">
          {getPageSubtitle(pathname)}
        </p>
      </div>

      {/* Center & Right Items */}
      <div className="flex flex-wrap items-center gap-4 md:ml-auto">
        {/* Search Bar */}
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Cari proyek, artikel, pesan..."
            className="w-full bg-black border border-zinc-800 rounded-xl py-2.5 pl-4 pr-10 text-xs text-zinc-300 placeholder-zinc-500 focus:outline-none focus:border-[#d0f000]/60 transition"
          />
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <button className="relative p-2.5 bg-black border border-zinc-850 hover:border-zinc-700 rounded-xl text-zinc-400 hover:text-white transition group">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#d0f000] text-black font-extrabold text-[10px] rounded-full flex items-center justify-center border border-black shadow group-hover:scale-105 transition-transform">
              3
            </span>
          </button>

          {/* Theme Toggle */}
          <button className="p-2.5 bg-black border border-zinc-850 hover:border-zinc-700 rounded-xl text-zinc-400 hover:text-white transition">
            <Sun className="w-4 h-4" />
          </button>
        </div>

        {/* User Account Dropdown */}
        <button
          onClick={() => {
            if (confirm("Apakah Anda ingin keluar dari dashboard?")) {
              signOut({ callbackUrl: "/login" });
            }
          }}
          className="flex items-center gap-3 border border-zinc-800/80 bg-zinc-900/10 hover:bg-zinc-900/30 rounded-2xl py-1.5 pl-2 pr-4 transition group text-left"
        >
          {/* User Avatar image */}
          <div className="w-9 h-9 rounded-xl bg-zinc-800 overflow-hidden flex items-center justify-center border border-zinc-700 text-zinc-400 group-hover:border-zinc-500 transition-colors">
            {session?.user?.image ? (
              <img src={session.user.image} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <User className="w-4 h-4 text-zinc-300" />
            )}
          </div>

          <div className="flex flex-col text-left">
            <span className="text-xs font-bold text-white group-hover:text-[#d0f000] transition-colors leading-tight">
              Admin Portfolio
            </span>
            <span className="text-[10px] text-zinc-500 font-medium leading-none mt-0.5">
              {session?.user?.email || "admin@namakamu.com"}
            </span>
          </div>

          <ChevronDown className="w-3.5 h-3.5 text-zinc-500 ml-1 group-hover:text-zinc-300 transition-colors" />
        </button>
      </div>
    </header>
  );
}

