"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface HeroProps {
  data: {
    greeting: string;
    name: string;
    tagline: string;
    description: string;
    ctaLabel: string;
    ctaUrl: string;
    avatarUrl: string | null;
  } | null;
}

export function Hero({ data }: HeroProps) {
  // Safe default fallback
  const hero = data || {
    greeting: "Hi, I'm",
    name: "Alex Zagoour",
    tagline: "Building premium digital experiences that make an impact.",
    description: "I am a fullstack engineer and product designer specialized in Next.js, Node.js, and high-fidelity UI animations. I help businesses build sleek websites and scalable SaaS apps.",
    ctaLabel: "Let's Talk",
    ctaUrl: "#contact",
    avatarUrl: null,
  };

  return (
    <section className="relative min-h-[85vh] flex items-center py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col text-left space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300 w-fit">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              <span>{hero.greeting}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
              {hero.name}
            </h1>

            <p className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-zinc-100 via-zinc-300 to-zinc-500 bg-clip-text text-transparent leading-relaxed">
              {hero.tagline}
            </p>

            <p className="text-zinc-400 text-base sm:text-lg max-w-xl leading-relaxed font-light">
              {hero.description}
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                href={hero.ctaUrl}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-zinc-950 font-bold hover:bg-zinc-200 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.15)] group"
              >
                {hero.ctaLabel}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-zinc-900 text-white font-bold border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 transition-all duration-300"
              >
                View Works
              </Link>
            </div>
          </motion.div>

          {/* Graphic/Avatar Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center relative"
          >
            {/* Decorative background glow behind avatar */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-full filter blur-3xl -z-10 animate-pulse" />

            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl overflow-hidden border-2 border-zinc-800/80 bg-zinc-900/50 backdrop-blur-sm p-3 group shadow-2xl">
              <div className="absolute inset-0 border border-zinc-700/50 rounded-3xl pointer-events-none group-hover:scale-98 transition-all duration-300" />
              {hero.avatarUrl ? (
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <Image
                    src={hero.avatarUrl}
                    alt={hero.name}
                    fill
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ) : (
                <div className="w-full h-full rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-950 flex flex-col items-center justify-center text-center p-6 border border-zinc-800">
                  <span className="text-6xl font-black text-zinc-700 tracking-wider select-none mb-3">
                    {hero.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                  <div className="h-[2px] w-12 bg-white/20 rounded mb-2" />
                  <span className="text-xs text-zinc-500 uppercase tracking-widest font-mono">
                    Fullstack Architect
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
