"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Download, Users, FolderGit, Smile, Trophy, Github, Linkedin, Twitter, Instagram } from "lucide-react";
import { motion } from "motion/react";
import { HeroSection as HeroData } from "@/services/hero.service";
import { Meteors } from "@/components/ui/meteors";

interface HeroSectionProps {
  data: HeroData | null;
}

export default function HeroSection({ data }: HeroSectionProps) {
  // Use data from database or fall back to Indonesian matching design reference
  const greeting = data?.greeting || "HALO, SAYA";
  const name = data?.name || "DEVELOPER & DESAINER";
  const tagline = data?.tagline || "YANG BIKIN IDE JADI NYATA.";
  const description =
    data?.description ||
    "Saya membangun website dan produk digital yang cepat, fungsional, dan berkesan. Fokus pada pengalaman pengguna dan hasil yang berdampak.";
  const ctaLabel = data?.ctaLabel || "Lihat Portofolio";
  const ctaUrl = data?.ctaUrl || "#projects";

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 90,
        damping: 14,
      },
    },
  };

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-zinc-950 overflow-hidden pt-28 pb-16"
    >
      {/* Background Decorators */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#141417_1px,transparent_1px),linear-gradient(to_bottom,#141417_1px,transparent_1px)] bg-[size:5rem_5rem] opacity-40" />

      {/* Meteor shower (Magic UI) — acid-green tinted to match accent */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Meteors number={30} className="text-yellow-300/80" />
      </div>

      {/* Subtle Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-yellow-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] bg-yellow-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* KEEP BUILDING barcode sticker (far left, vertical) */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 translate-x-[48%] z-20 hidden lg:block pointer-events-none -rotate-90">
        <div className="flex items-center gap-3 bg-zinc-100 px-4 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
          <span className="font-mono text-[11px] font-black tracking-[0.35em] text-zinc-950 uppercase whitespace-nowrap">
            KEEP BUILDING
          </span>
          <div className="h-5 w-20 bg-[repeating-linear-gradient(90deg,#09090b_0,#09090b_2px,transparent_2px,transparent_5px)]" />
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-30 items-center">
          
          {/* Left Column: Greeting, Main Heading, Buttons, Socials */}
          <motion.div
            className="lg:col-span-5 flex flex-col items-start text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Subtitle "HALO, SAYA" */}
            <motion.span
              variants={itemVariants}
              className="text-yellow-300 font-mono text-sm tracking-widest font-extrabold uppercase mb-4"
            >
              {greeting}
            </motion.span>

            {/* Giant Heading "DEVELOPER & DESAINER" */}
            <motion.div variants={itemVariants} className="relative mb-8">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-sans font-black tracking-tighter text-zinc-100 uppercase leading-none">
                DEVELOPER
                <br />
                <span className="text-zinc-100">&amp; DESAINER</span>
              </h1>
              
              {/* Handwritten lime tagline with marker underline */}
              <div className="relative inline-block mt-3 -rotate-2">
                <span className="font-handwritten text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-300 leading-none drop-shadow-[0_0_18px_rgba(208,240,0,0.25)]">
                  {tagline}
                </span>

                {/* Rough marker underline */}
                <svg
                  viewBox="0 0 260 16"
                  preserveAspectRatio="none"
                  fill="none"
                  className="absolute -bottom-2 left-0 w-full h-3 text-yellow-300"
                >
                  <path
                    d="M4 10 C 70 3, 150 15, 256 6"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>

                {/* Hand-drawn arrow decorator */}
                <svg
                  width="50"
                  height="30"
                  viewBox="0 0 50 30"
                  fill="none"
                  className="absolute -bottom-9 right-[-22px] text-zinc-500 hidden sm:block rotate-[-10deg]"
                >
                  <path
                    d="M5 5 C 15 12, 25 18, 35 15 C 38 14, 42 12, 45 8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M38 6 L45 8 L43 14"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </div>
            </motion.div>

            {/* Paragraph Text */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-zinc-400 max-w-lg font-sans leading-relaxed mb-10"
            >
              {description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-12"
            >
              <Link
                href={ctaUrl}
                onClick={(e) => handleCtaClick(e, ctaUrl)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-yellow-300 hover:bg-yellow-400 text-zinc-950 text-sm font-bold tracking-wider transition-all duration-200"
              >
                {ctaLabel}
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <a
                href="#about"
                onClick={(e) => handleCtaClick(e, "#about")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 border border-zinc-800 hover:border-zinc-700 bg-transparent text-zinc-100 text-sm font-semibold tracking-wider transition-all duration-200"
              >
                Download CV
                <Download className="w-4 h-4" />
              </a>
            </motion.div>

            {/* Socials Connection */}
            <motion.div variants={itemVariants} className="flex items-center gap-4 text-xs font-sans text-zinc-500">
              <span className="uppercase tracking-widest text-[10px] font-mono">Terhubung dengan saya</span>
              <div className="flex items-center gap-3">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-yellow-300 transition-colors">
                  <Github className="w-4 h-4" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-yellow-300 transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-yellow-300 transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-yellow-300 transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Center Column: Portrait Photo with Doodles */}
          <div className="lg:col-span-4 flex justify-center items-center relative my-12 lg:my-0">
            {/* The Outer Glowing Area */}
            <div className="absolute inset-0 rounded-full bg-yellow-500/5 blur-3xl pointer-events-none" />

            <motion.div
              className="relative w-[300px] h-[360px] sm:w-[320px] sm:h-[390px] border-[3px] border-zinc-900 bg-zinc-950 p-2 overflow-visible"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Outer decorative striped frame shadow */}
              <div className="absolute inset-0 translate-x-3 translate-y-3 bg-[repeating-linear-gradient(-45deg,#09090b,#09090b_6px,#eab308_6px,#eab308_7px)] border-[3px] border-zinc-900 -z-10" />

              {/* Profile Image - Hardcoded generated headshot for reference matching */}
              <div className="relative w-full h-full bg-zinc-900/40 overflow-hidden">
                {/* Dotted texture background behind the portrait */}
                <div className="absolute inset-0 bg-[radial-gradient(#eab308_1px,transparent_1px)] [background-size:12px_12px] opacity-25 z-0 pointer-events-none" />
                <img
                  src="/profil-hero.png"
                  alt="Developer Portrait"
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500 relative z-10"
                />
                {/* Halftone dot texture overlay on top of the image */}
                <div className="absolute inset-0 bg-[radial-gradient(#000000_1.5px,transparent_1.5px)] [background-size:8px_8px] opacity-20 z-20 pointer-events-none mix-blend-multiply" />
              </div>

              {/* Doodle 1: Yellow Crown */}
              <div className="absolute top-[-35px] left-[20%] z-20 rotate-[-12deg] pointer-events-none">
                <svg
                  width="70"
                  height="50"
                  viewBox="0 0 80 60"
                  fill="none"
                  className="text-yellow-300 drop-shadow-[0_0_8px_rgba(208,240,0,0.6)]"
                >
                  <path
                    d="M10 45 L15 15 L32 30 L48 10 L64 30 L81 15 L86 45 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />
                  <circle cx="15" cy="12" r="2.5" fill="currentColor" />
                  <circle cx="32" cy="27" r="2.5" fill="currentColor" />
                  <circle cx="48" cy="7" r="2.5" fill="currentColor" />
                  <circle cx="64" cy="27" r="2.5" fill="currentColor" />
                  <circle cx="81" cy="12" r="2.5" fill="currentColor" />
                </svg>
              </div>

              {/* Doodle 2: KODE DESAIN ULANGI! handwritten script top-left */}
              <div className="absolute top-[-58px] left-[-70px] z-20 rotate-[-12deg] flex flex-col items-start pointer-events-none">
                <span className="font-handwritten text-2xl sm:text-3xl font-bold text-yellow-300 leading-[0.9] drop-shadow-[0_0_12px_rgba(208,240,0,0.3)]">
                  KODE<br />DESAIN<br />ULANGI!
                </span>

                {/* Mini Smiley */}
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="mt-1 text-zinc-400"
                >
                  <circle cx="12" cy="12" r="7" />
                  <circle cx="9.5" cy="10.5" r="0.8" fill="currentColor" />
                  <circle cx="14.5" cy="10.5" r="0.8" fill="currentColor" />
                  <path d="M9.5 15 C11 16.5 13 16.5 14.5 15" strokeLinecap="round" />
                </svg>
              </div>

              {/* Doodle 3: Yellow Glowing arrows >_ */}
              <div className="absolute bottom-[35%] right-[-35px] z-20 pointer-events-none">
                <span className="font-sans font-black text-2xl text-yellow-300 drop-shadow-[0_0_8px_rgba(208,240,0,0.6)] animate-pulse">
                  &gt;_
                </span>
              </div>

              {/* Doodle 4: Globus with circular FOCUS GROW text */}
              <div className="absolute bottom-[8%] left-[-60px] w-24 h-24 rotate-[25deg] hidden sm:block pointer-events-none z-20">
                <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_20s_linear_infinite]">
                  <path
                    id="focusPath"
                    d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    strokeDasharray="3 3"
                    className="text-zinc-600"
                  />
                  <text className="text-[7.5px] fill-zinc-400 font-mono tracking-widest font-black uppercase">
                    <textPath href="#focusPath">
                      • FOCUS • GROW • INSPIRE • DESIGN •
                    </textPath>
                  </text>
                </svg>
                {/* Globe lines inside */}
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.8"
                  className="absolute inset-0 m-auto text-zinc-500"
                >
                  <circle cx="20" cy="20" r="16" />
                  <ellipse cx="20" cy="20" rx="8" ry="16" />
                  <ellipse cx="20" cy="20" rx="16" ry="8" />
                  <line x1="20" y1="4" x2="20" y2="36" />
                  <line x1="4" y1="20" x2="36" y2="20" />
                </svg>
              </div>

            </motion.div>
          </div>
          
          {/* Right Column: Vertically stacked Stats Cards */}
          <motion.div
            className="lg:col-span-3 flex flex-col gap-8 lg:pl-6"
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Stat 1 */}
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 flex items-center justify-center border border-zinc-900 bg-zinc-950 text-yellow-300 group-hover:border-yellow-300/30 transition-colors">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="text-2xl font-black text-yellow-300 block tracking-tight">5+</span>
                <span className="text-xs font-medium text-zinc-400 group-hover:text-zinc-200 transition-colors">Tahun Pengalaman</span>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 flex items-center justify-center border border-zinc-900 bg-zinc-950 text-yellow-300 group-hover:border-yellow-300/30 transition-colors">
                <FolderGit className="w-5 h-5" />
              </div>
              <div>
                <span className="text-2xl font-black text-yellow-300 block tracking-tight">50+</span>
                <span className="text-xs font-medium text-zinc-400 group-hover:text-zinc-200 transition-colors">Proyek Selesai</span>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 flex items-center justify-center border border-zinc-900 bg-zinc-950 text-yellow-300 group-hover:border-yellow-300/30 transition-colors">
                <Smile className="w-5 h-5" />
              </div>
              <div>
                <span className="text-2xl font-black text-yellow-300 block tracking-tight">30+</span>
                <span className="text-xs font-medium text-zinc-400 group-hover:text-zinc-200 transition-colors">Klien Puas</span>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 flex items-center justify-center border border-zinc-900 bg-zinc-950 text-yellow-300 group-hover:border-yellow-300/30 transition-colors">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <span className="text-2xl font-black text-yellow-300 block tracking-tight">10+</span>
                <span className="text-xs font-medium text-zinc-400 group-hover:text-zinc-200 transition-colors">Penghargaan</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
