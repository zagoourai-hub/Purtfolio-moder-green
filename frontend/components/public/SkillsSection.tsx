"use client";

import React from "react";
import { Code2, Terminal, Wrench } from "lucide-react";
import { motion } from "motion/react";
import { Skill } from "@/services/skill.service";

interface SkillsSectionProps {
  data: Skill[];
}

export default function SkillsSection({ data }: SkillsSectionProps) {
  // If database skills are empty, use default skills matching design reference
  const skillsToRender: Skill[] = data.length > 0 ? data : [
    // Frontend
    { id: "s1", name: "React / Next.js", category: "Frontend", level: 90, order: 1 },
    { id: "s2", name: "TypeScript", category: "Frontend", level: 85, order: 2 },
    { id: "s3", name: "Tailwind CSS", category: "Frontend", level: 90, order: 3 },
    { id: "s4", name: "UI/UX Design", category: "Frontend", level: 85, order: 4 },
    // Backend
    { id: "s5", name: "Node.js", category: "Backend", level: 85, order: 5 },
    { id: "s6", name: "Prisma", category: "Backend", level: 80, order: 6 },
    { id: "s7", name: "PostgreSQL", category: "Backend", level: 80, order: 7 },
    { id: "s8", name: "REST API", category: "Backend", level: 85, order: 8 },
    // Tools & Lainnya
    { id: "s9", name: "Git & GitHub", category: "Tools & Lainnya", level: 90, order: 9 },
    { id: "s10", name: "Docker", category: "Tools & Lainnya", level: 75, order: 10 },
    { id: "s11", name: "Figma", category: "Tools & Lainnya", level: 80, order: 11 },
    { id: "s12", name: "Vercel", category: "Tools & Lainnya", level: 85, order: 12 },
  ];

  // Group skills by category
  const categories = ["Frontend", "Backend", "Tools & Lainnya"];
  
  const groupedSkills = React.useMemo(() => {
    const groups: Record<string, typeof skillsToRender> = {
      Frontend: [],
      Backend: [],
      "Tools & Lainnya": [],
    };

    skillsToRender.forEach((skill) => {
      let cat = skill.category || "Frontend";
      if (cat.toLowerCase().includes("front")) {
        groups["Frontend"].push(skill);
      } else if (cat.toLowerCase().includes("back") || cat.toLowerCase().includes("server") || cat.toLowerCase().includes("db")) {
        groups["Backend"].push(skill);
      } else {
        groups["Tools & Lainnya"].push(skill);
      }
    });

    return groups;
  }, [skillsToRender]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Frontend":
        return <Code2 className="w-5 h-5 text-yellow-300" />;
      case "Backend":
        return <Terminal className="w-5 h-5 text-yellow-300" />;
      default:
        return <Wrench className="w-5 h-5 text-yellow-300" />;
    }
  };

  // Tech items with custom SVGs
  const techLogos = [
    {
      name: "Next.js",
      svg: (
        <svg viewBox="0 0 180 180" width="24" height="24" className="text-zinc-100 fill-current">
          <path d="M125 15 L80 85 L140 155 Z" stroke="currentColor" strokeWidth="2" fill="none" />
          <text x="30" y="110" fontSize="70" fontWeight="bold">N</text>
        </svg>
      ),
    },
    {
      name: "React",
      svg: (
        <svg viewBox="-11.5 -10.23174 23 20.46348" width="24" height="24" className="text-zinc-100 fill-none stroke-current" strokeWidth="1">
          <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
          <g>
            <ellipse rx="11" ry="4.2"/>
            <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
            <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
          </g>
        </svg>
      ),
    },
    {
      name: "TypeScript",
      svg: (
        <svg viewBox="0 0 100 100" width="24" height="24" className="text-zinc-100 fill-current">
          <rect width="100" height="100" fill="none" stroke="currentColor" strokeWidth="6" />
          <text x="18" y="75" fontSize="50" fontWeight="black" fontFamily="sans-serif">TS</text>
        </svg>
      ),
    },
    {
      name: "Tailwind CSS",
      svg: (
        <svg viewBox="0 0 24 24" width="24" height="24" className="text-zinc-100 fill-current">
          <path d="M12 6.018C13.882 3.96 16.8 3 20 3c0 3.92-3.118 7.078-7 7.078C11.118 10.078 8.2 11 5 11c0-3.92 3.118-7.078 7-7.078z" />
          <path d="M12 17.982C10.118 20.04 7.2 21 4 21c0-3.92 3.118-7.078 7-7.078 1.882 0 4.8-.922 8-9.022 0 3.92-3.118 7.078-7 7.078z" />
        </svg>
      ),
    },
    {
      name: "Prisma",
      svg: (
        <svg viewBox="0 0 24 24" width="24" height="24" className="text-zinc-100 fill-current">
          <path d="M12 2L2 22h20L12 2zM12 6l7 14H5l7-14z" />
        </svg>
      ),
    },
    {
      name: "NestJS",
      svg: (
        <svg viewBox="0 0 24 24" width="24" height="24" className="text-zinc-100 fill-none stroke-current" strokeWidth="1.5">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      ),
    },
    {
      name: "Node.js",
      svg: (
        <svg viewBox="0 0 24 24" width="24" height="24" className="text-zinc-100 fill-none stroke-current" strokeWidth="1.5">
          <polygon points="12 2 22 7.5 22 18.5 12 24 2 18.5 2 7.5" />
          <polyline points="2 7.5 12 13 22 7.5" />
          <line x1="12" y1="13" x2="12" y2="24" />
        </svg>
      ),
    },
    {
      name: "Git",
      svg: (
        <svg viewBox="0 0 24 24" width="24" height="24" className="text-zinc-100 fill-none stroke-current" strokeWidth="1.5">
          <circle cx="18" cy="18" r="3" />
          <circle cx="6" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <path d="M6 9v6M9 15h6M18 15a9 9 0 0 0-9-9" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      svg: (
        <svg viewBox="0 0 24 24" width="24" height="24" className="text-zinc-100 fill-current">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      ),
    },
    {
      name: "Docker",
      svg: (
        <svg viewBox="0 0 24 24" width="24" height="24" className="text-zinc-100 fill-current">
          <path d="M13.983 11.078h2.119c.102 0 .186-.085.186-.186V8.775c0-.102-.084-.186-.186-.186h-2.119c-.102 0-.186.084-.186.186v2.117c0 .101.084.186.186.186zm-2.95.002h2.119c.102 0 .186-.085.186-.186V8.777c0-.102-.084-.186-.186-.186h-2.119c-.102 0-.186.084-.186.186v2.117c0 .101.084.186.186.186zm-2.943 0h2.119c.102 0 .186-.085.186-.186V8.777c0-.102-.084-.186-.186-.186H8.09c-.102 0-.186.084-.186.186v2.117c0 .101.084.186.186.186zm-2.943 0h2.119c.102 0 .186-.085.186-.186V8.777c0-.102-.084-.186-.186-.186H5.147c-.102 0-.186.084-.186.186v2.117c0 .101.084.186.186.186zm2.942-2.943h2.119c.102 0 .186-.085.186-.186V5.832c0-.102-.084-.186-.186-.186H8.09c-.102 0-.186.084-.186.186v2.117c0 .101.084.186.186.186zm-2.942 0h2.119c.102 0 .186-.085.186-.186V5.832c0-.102-.084-.186-.186-.186H5.147c-.102 0-.186.084-.186.186v2.117c0 .101.084.186.186.186zm2.942-2.942h2.119c.102 0 .186-.085.186-.186V2.89c0-.102-.084-.186-.186-.186H8.09c-.102 0-.186.084-.186.186v2.117c0 .101.084.186.186.186zm2.95 5.884h2.119c.102 0 .186-.085.186-.186V5.832c0-.102-.084-.186-.186-.186h-2.119c-.102 0-.186.084-.186.186v2.117c0 .101.084.186.186.186zm-8.835 8.835c0 .102.084.186.186.186h17.67c1.336 0 2.508-1.074 2.508-2.484 0-.199-.028-.396-.078-.589-.472-1.802-1.91-2.951-3.662-2.951h-16.44c-1.336 0-2.508 1.074-2.508 2.484 0 1.956 1.155 3.354 2.504 3.354z" />
        </svg>
      ),
    },
    {
      name: "Figma",
      svg: (
        <svg viewBox="0 0 24 24" width="24" height="24" className="text-zinc-100 fill-current">
          <path d="M12 2C9.24 2 7 4.24 7 7c0 1.78.93 3.34 2.33 4.25C7.93 12.16 7 13.72 7 15.5c0 2.76 2.24 5 5 5s5-2.24 5-5c0-1.78-.93-3.34-2.33-4.25C16.07 10.34 17 8.78 17 7c0-2.76-2.24-5-5-5zm-2.5 5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5S13.38 9.5 12 9.5 9.5 8.38 9.5 7zm2.5 6c1.38 0 2.5 1.12 2.5 2.5S13.38 18 12 18s-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5z" />
        </svg>
      ),
    },
    {
      name: "Vercel",
      svg: (
        <svg viewBox="0 0 24 24" width="24" height="24" className="text-zinc-100 fill-current">
          <path d="M12 1L24 21H0L12 1Z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="skills" className="py-28 bg-zinc-950 border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Keahlian Saya Header */}
        <div className="flex flex-col items-start mb-16">
          <span className="text-yellow-300 font-mono text-sm tracking-widest font-extrabold uppercase">
            KEAHLIAN SAYA
          </span>
        </div>

        {/* 3 Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-28">
          {categories.map((category, catIndex) => {
            const skills = groupedSkills[category] || [];
            return (
              <motion.div
                key={category}
                className="border border-zinc-900 bg-zinc-950 p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: catIndex * 0.15 }}
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-zinc-900">
                  <div className="w-8 h-8 flex items-center justify-center border border-zinc-900 bg-zinc-950 text-yellow-300">
                    {getCategoryIcon(category)}
                  </div>
                  <h3 className="text-base font-extrabold text-zinc-100 uppercase tracking-wide font-sans">
                    {category}
                  </h3>
                </div>

                {/* Skills Progress List */}
                <div className="space-y-6">
                  {skills.map((skill) => (
                    <div key={skill.name} className="group">
                      {/* Label & Value */}
                      <div className="flex items-center justify-between mb-2 text-xs font-sans font-bold">
                        <span className="text-zinc-300 group-hover:text-zinc-100 transition-colors">
                          {skill.name}
                        </span>
                        <span className="text-zinc-500 group-hover:text-yellow-300 transition-colors font-mono">
                          {skill.level}%
                        </span>
                      </div>

                      {/* Progress Bar Container */}
                      <div className="h-1.5 w-full bg-zinc-900 border border-zinc-900 overflow-hidden">
                        {/* Yellow Animated Fill Bar */}
                        <motion.div
                          className="h-full bg-yellow-300"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Teknologi Yang Digunakan Subsection */}
        <div className="flex flex-col items-start mb-12">
          <span className="text-yellow-300 font-mono text-sm tracking-widest font-extrabold uppercase">
            TEKNOLOGI YANG DIGUNAKAN
          </span>
        </div>

        {/* Tech Logos Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-12 gap-4">
          {techLogos.map((tech, index) => (
            <motion.div
              key={tech.name}
              className="aspect-square flex items-center justify-center border border-zinc-900 bg-zinc-950 hover:border-yellow-300/30 transition-all duration-300 group relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: (index % 6) * 0.05 }}
            >
              <div className="opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                {tech.svg}
              </div>
              
              {/* Tooltip */}
              <span className="absolute bottom-[-25px] left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-zinc-900 text-[10px] text-zinc-300 font-mono py-0.5 px-2 tracking-wider transition-opacity duration-200 whitespace-nowrap pointer-events-none z-30">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
