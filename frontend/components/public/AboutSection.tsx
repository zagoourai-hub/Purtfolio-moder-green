"use client";

import React from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { MapPin, Mail, Briefcase, Calendar, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { AboutSection as AboutData } from "@/services/about.service";
import { LampContainer } from "@/components/ui/lamp";

interface AboutSectionProps {
  data: AboutData | null;
}

export default function AboutSection({ data }: AboutSectionProps) {
  const bio = data?.bio || "Saya membangun produk digital, brand, dan pengalaman yang berkesan.\n\nFull-stack developer & desainer yang suka mengubah ide menjadi solusi digital yang fungsional, estetik, dan mudah digunakan.";
  const location = data?.location || "Jakarta, Indonesia";
  const email = data?.email || "hello@namakamu.com";

  const infoItems = [
    {
      label: "Lokasi",
      value: location,
      icon: <MapPin className="w-4 h-4 text-yellow-300" />,
    },
    {
      label: "Pengalaman",
      value: "5+ Tahun",
      icon: <Briefcase className="w-4 h-4 text-yellow-300" />,
    },
    {
      label: "Email",
      value: email,
      icon: <Mail className="w-4 h-4 text-yellow-300" />,
      href: `mailto:${email}`,
    },
    {
      label: "Ketersediaan",
      value: "Freelance / Full-time",
      icon: <Calendar className="w-4 h-4 text-yellow-300" />,
    },
  ];

  // Custom components for ReactMarkdown to match design typography
  const MarkdownComponents = {
    p: ({ ...props }) => <p className="text-zinc-400 mb-6 leading-relaxed font-sans text-base sm:text-lg" {...props} />,
    h1: ({ ...props }) => <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-100 mt-8 mb-4 font-sans tracking-tight" {...props} />,
    h2: ({ ...props }) => <h2 className="text-xl sm:text-2xl font-bold text-zinc-200 mt-6 mb-3 font-sans tracking-tight" {...props} />,
    h3: ({ ...props }) => <h3 className="text-lg font-semibold text-zinc-300 mt-5 mb-2 font-sans" {...props} />,
    ul: ({ ...props }) => <ul className="list-disc pl-5 mb-6 text-zinc-400 space-y-2 text-base" {...props} />,
    ol: ({ ...props }) => <ol className="list-decimal pl-5 mb-6 text-zinc-400 space-y-2 text-base" {...props} />,
    li: ({ ...props }) => <li className="font-sans leading-relaxed" {...props} />,
    a: ({ ...props }) => <a className="text-yellow-300 hover:text-yellow-400 underline underline-offset-4 transition-colors" target="_blank" rel="noopener noreferrer" {...props} />,
    code: ({ node, inline, className, children, ...props }: any) => {
      return inline ? (
        <code className="bg-zinc-900 border border-zinc-800 text-yellow-300 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>{children}</code>
      ) : (
        <pre className="bg-zinc-900 border border-zinc-800 p-4 rounded overflow-x-auto text-zinc-300 font-mono text-sm mb-6" {...props}>{children}</pre>
      );
    },
    blockquote: ({ ...props }) => <blockquote className="border-l-4 border-yellow-300 bg-zinc-900/30 pl-4 py-1 pr-2 text-zinc-400 italic mb-6 font-sans" {...props} />,
  };

  return (
    <section id="about" className="py-20 relative overflow-hidden bg-zinc-950 border-t border-zinc-900">
      {/* Section Header with Aceternity Lamp Effect (Edge-to-Edge) */}
      <LampContainer className="min-h-[400px] h-[400px] -mb-20 select-none w-full bg-transparent">
        <motion.div
          initial={{ opacity: 0.5, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.2,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="flex flex-col items-center text-center"
        >
          <span className="text-yellow-300 font-mono text-sm tracking-widest font-extrabold uppercase mb-2">
            TENTANG SAYA
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-black tracking-tight text-zinc-100 uppercase">
            BIOGRAFI & FILOSOFI
          </h2>
          <div className="w-16 h-1 bg-yellow-300 mt-3 rounded-full" />
        </motion.div>
      </LampContainer>

      {/* Main Biography Content Grid (Constrained max-w-7xl) */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Styled Portrait Photo & Meta Info Grid */}
          <motion.div 
            className="lg:col-span-5 flex flex-col gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            {/* Photo frame with yellow lightning overlay */}
            <div className="relative w-full aspect-square border-[3px] border-zinc-900 bg-zinc-950 p-2 overflow-visible">
              {/* Outer decorative striped frame shadow */}
              <div className="absolute inset-0 translate-x-3 translate-y-3 bg-[repeating-linear-gradient(-45deg,#09090b,#09090b_6px,#eab308_6px,#eab308_7px)] border-[3px] border-zinc-900 -z-10" />

              <div className="relative w-full h-full bg-zinc-900/40 overflow-hidden">
                {/* Dotted texture background behind the portrait */}
                <div className="absolute inset-0 bg-[radial-gradient(#eab308_1px,transparent_1px)] [background-size:12px_12px] opacity-25 z-0 pointer-events-none" />
                <img
                  src="/profil-hero.png"
                  alt="Biography Portrait"
                  className="w-full h-full object-cover hover:scale-105 transition-all duration-500 relative z-10"
                />
                {/* Halftone dot texture overlay on top of the image */}
                <div className="absolute inset-0 bg-[radial-gradient(#000000_1.5px,transparent_1.5px)] [background-size:8px_8px] opacity-20 z-20 pointer-events-none mix-blend-multiply" />
              </div>

              {/* Yellow Lightning Icon Overlay */}
              <div className="absolute top-[-15px] right-[-15px] w-12 h-12 bg-yellow-300 flex items-center justify-center text-zinc-950 font-black shadow-xl rounded-none">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              {infoItems.map((item, index) => (
                <div key={index} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 flex items-center justify-center border border-zinc-900 bg-zinc-950 text-yellow-300 group-hover:border-yellow-300/30 transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <span className="text-zinc-500 font-mono text-[10px] tracking-wider uppercase block">{item.label}</span>
                    {item.href ? (
                      <a href={item.href} className="text-sm font-semibold text-zinc-200 hover:text-yellow-300 transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-sm font-semibold text-zinc-200">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Button */}
            <div className="mt-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-zinc-800 hover:border-yellow-300/50 bg-transparent text-zinc-200 hover:text-yellow-300 text-xs font-bold tracking-wider transition-all duration-200"
              >
                Lebih Lanjut Tentang Saya
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Title & Markdown Bio Rendering */}
          <motion.div 
            className="lg:col-span-7 flex flex-col pt-2 lg:pt-0"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Bold Subheading Statement */}
            <h3 className="text-3xl sm:text-4xl font-sans font-black tracking-tight text-zinc-100 leading-tight mb-8">
              Saya membangun produk digital, brand, dan pengalaman yang berkesan.
            </h3>

            {/* Bio Body (dynamic react markdown) */}
            <div className="prose prose-zinc prose-invert max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={MarkdownComponents}>
                {bio}
              </ReactMarkdown>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
