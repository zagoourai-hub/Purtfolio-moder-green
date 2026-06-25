"use client";

import React from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { MapPin, Mail, FileText, User } from "lucide-react";
import { motion } from "framer-motion";

interface AboutProps {
  data: {
    bio: string;
    photoUrl: string | null;
    location: string | null;
    email: string | null;
    resumeUrl: string | null;
  } | null;
}

export function About({ data }: AboutProps) {
  // Safe default fallback
  const about = data || {
    bio: `I am a **Senior Fullstack Developer** based in Jakarta, Indonesia. With over 6 years of experience, I build robust web architectures and beautiful interactive user interfaces.
    
### Core Philosophy
I believe that code quality and design aesthetics should go hand in hand. A beautiful UI without a solid backend is just a shell, and a powerful backend without intuitive design is a missed opportunity.`,
    photoUrl: null,
    location: "Jakarta, Indonesia",
    email: "alex@zagoour.com",
    resumeUrl: "#",
  };

  return (
    <section id="about" className="py-20 bg-zinc-950/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">
            Profile
          </h2>
          <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            About Me
          </h3>
          <div className="h-[2px] w-12 bg-white/20 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Photo & Coordinates Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4 space-y-6"
          >
            <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
              <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 mb-6 flex items-center justify-center">
                {about.photoUrl ? (
                  <Image
                    src={about.photoUrl}
                    alt="About photo"
                    fill
                    className="object-cover group-hover:scale-103 transition-transform duration-300"
                  />
                ) : (
                  <User className="w-20 h-20 text-zinc-700" />
                )}
              </div>

              <div className="space-y-4">
                {about.location && (
                  <div className="flex items-center gap-3 text-zinc-400">
                    <MapPin className="w-4 h-4 text-zinc-500 flex-shrink-0" />
                    <span className="text-sm font-light">{about.location}</span>
                  </div>
                )}
                {about.email && (
                  <div className="flex items-center gap-3 text-zinc-400">
                    <Mail className="w-4 h-4 text-zinc-500 flex-shrink-0" />
                    <a
                      href={`mailto:${about.email}`}
                      className="text-sm font-light hover:text-white transition-colors duration-150 break-all"
                    >
                      {about.email}
                    </a>
                  </div>
                )}
              </div>

              {about.resumeUrl && (
                <div className="mt-6 pt-6 border-t border-zinc-800/50">
                  <a
                    href={about.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-zinc-900 border border-zinc-800 text-sm font-semibold hover:bg-zinc-800 hover:border-zinc-700 hover:text-white transition-all duration-200"
                  >
                    <FileText className="w-4 h-4 text-zinc-400" />
                    Download Resume
                  </a>
                </div>
              )}
            </div>
          </motion.div>

          {/* Biography details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-8 bg-zinc-900/40 border border-zinc-900 rounded-2xl p-8 sm:p-10 shadow-xl"
          >
            <div className="prose prose-invert prose-zinc max-w-none text-zinc-300 font-light leading-relaxed">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {about.bio}
              </ReactMarkdown>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
