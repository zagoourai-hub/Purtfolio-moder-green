"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { Briefcase, GraduationCap, Award, Calendar, ChevronRight } from "lucide-react";

interface TimelineItem {
  id: number;
  period: string;
  role: string;
  company: string;
  description: string;
  type: "work" | "education" | "milestone";
  tags: string[];
}

const timelineData: TimelineItem[] = [
  {
    id: 1,
    period: "2024 - Sekarang",
    role: "Senior Full-Stack Engineer",
    company: "Zagoour Studio",
    description: "Memimpin tim pengembang dalam membangun platform SaaS modern dengan performa tinggi. Fokus pada arsitektur monolitik terdistribusi menggunakan Next.js, NestJS, dan orkestrasi Docker.",
    type: "work",
    tags: ["Next.js 16", "NestJS", "Prisma v7", "Docker", "Coolify"],
  },
  {
    id: 2,
    period: "2022 - 2024",
    role: "Lead Frontend Developer",
    company: "Porto Modern Tech",
    description: "Mendesain ulang sistem antarmuka utama dan mengembangkan komponen UI reusable berkualitas tinggi. Berhasil meningkatkan retensi pengguna sebesar 35% melalui optimasi kinerja web.",
    type: "work",
    tags: ["React", "TypeScript", "Tailwind CSS", "Zustand", "Playwright"],
  },
  {
    id: 3,
    period: "2021",
    role: "Mendapatkan Penghargaan 'Best Creative Portfolio'",
    company: "Awwwards Nominee",
    description: "Karya desain portfolio personal mendapatkan apresiasi tingkat internasional untuk kategori keunggulan desain visual interaktif dan transisi animasi mikro.",
    type: "milestone",
    tags: ["UI/UX Design", "Framer Motion", "WebGL", "Creative Code"],
  },
  {
    id: 4,
    period: "2019 - 2022",
    role: "Software Engineer",
    company: "Nusantara Digital Agency",
    description: "Membangun dan merancang aplikasi web e-commerce, portal berita, dan sistem manajemen internal untuk klien berskala enterprise.",
    type: "work",
    tags: ["Vue.js", "Express.js", "PostgreSQL", "Tailwind", "REST API"],
  },
  {
    id: 5,
    period: "2015 - 2019",
    role: "Sarjana Komputer (S.Kom.)",
    company: "Universitas Indonesia",
    description: "Menyelesaikan studi Ilmu Komputer dengan fokus pada Rekayasa Perangkat Lunak dan Kecerdasan Buatan. Lulus dengan predikat Cum Laude.",
    type: "education",
    tags: ["Ilmu Komputer", "Data Structures", "Algorithms", "Web Programming"],
  },
];

export default function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of the section to animate the connector line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const lineY = useTransform(scaleY, [0, 1], ["0%", "100%"]);

  const getIcon = (type: "work" | "education" | "milestone") => {
    switch (type) {
      case "work":
        return <Briefcase className="w-5 h-5 text-yellow-300" />;
      case "education":
        return <GraduationCap className="w-5 h-5 text-yellow-300" />;
      case "milestone":
        return <Award className="w-5 h-5 text-yellow-300" />;
    }
  };

  return (
    <section
      id="timeline"
      ref={containerRef}
      className="py-28 relative overflow-hidden bg-zinc-950 border-t border-zinc-900"
    >
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#141417_1px,transparent_1px),linear-gradient(to_bottom,#141417_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-35" />

      {/* Decorative Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-yellow-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 w-full">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <span className="text-yellow-300 font-mono text-sm tracking-widest font-extrabold uppercase mb-3">
            RIWAYAT PERJALANAN
          </span>
          <h2 className="text-4xl sm:text-5xl font-sans font-black tracking-tight text-zinc-100 uppercase">
            LINI MASA KARIR
          </h2>
          <div className="w-20 h-1 bg-yellow-300 mt-4 rounded-full" />
        </div>

        {/* Timeline container */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* Vertical central line (Desktop/Tablet) or left line (Mobile) */}
          <div className="absolute left-4 sm:left-1/2 top-2 bottom-2 w-[3px] bg-zinc-900 -translate-x-1/2 z-0">
            {/* Animated growing line on scroll */}
            <motion.div
              style={{ height: lineY }}
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-yellow-300 to-yellow-500 rounded-full"
            />
          </div>

          <div className="space-y-16">
            {timelineData.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.id}
                  className={`flex flex-col sm:flex-row relative z-10 ${
                    isEven ? "sm:flex-row-reverse" : ""
                  }`}
                >
                  {/* Visual Node Dot */}
                  <div className="absolute left-4 sm:left-1/2 top-4 -translate-x-1/2 z-20">
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                      className="w-9 h-9 rounded-full bg-zinc-950 border-[3px] border-zinc-900 flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)] group hover:border-yellow-300 transition-colors duration-300"
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        {getIcon(item.type)}
                      </div>
                    </motion.div>
                  </div>

                  {/* Spacer / Left/Right Columns alignment */}
                  <div className="w-full sm:w-1/2" />

                  {/* Card Column */}
                  <div className={`w-full sm:w-1/2 pl-12 sm:pl-0 ${isEven ? "sm:pr-12" : "sm:pl-12"}`}>
                    <motion.div
                      initial={{ 
                        opacity: 0, 
                        x: isEven ? 40 : -40 
                      }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{ type: "spring", stiffness: 80, damping: 15 }}
                      className="relative group bg-zinc-950 border-[3px] border-zinc-900 p-6 md:p-8 hover:border-yellow-300/30 transition-all duration-300 overflow-visible"
                    >
                      {/* Brutalist offset shadow wrapper */}
                      <div className="absolute inset-0 translate-x-2 translate-y-2 bg-zinc-900 -z-10 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-300 border-[3px] border-zinc-900 opacity-60" />

                      {/* Period Badge */}
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-300 text-zinc-950 text-xs font-bold font-mono tracking-wider mb-4">
                        <Calendar className="w-3.5 h-3.5" />
                        {item.period}
                      </div>

                      {/* Heading */}
                      <h3 className="text-xl font-black text-zinc-100 uppercase tracking-tight group-hover:text-yellow-300 transition-colors duration-200">
                        {item.role}
                      </h3>
                      
                      {/* Company Subtitle */}
                      <span className="text-zinc-400 font-mono text-xs uppercase tracking-widest block mt-1 mb-4 flex items-center gap-1">
                        {item.company}
                        <ChevronRight className="w-3 h-3 text-yellow-300" />
                      </span>

                      {/* Description */}
                      <p className="text-sm text-zinc-400 leading-relaxed font-sans mb-6">
                        {item.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-semibold font-mono tracking-wider bg-zinc-900 text-zinc-400 border border-zinc-800 px-2 py-0.5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Decorative small node detail */}
                      <div className="absolute top-4 right-4 text-zinc-800 font-mono text-xs font-bold group-hover:text-yellow-300/10 transition-colors">
                        // 0{item.id}
                      </div>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
