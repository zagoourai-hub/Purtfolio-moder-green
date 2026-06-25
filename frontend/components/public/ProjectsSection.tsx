"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { Project } from "@/services/project.service";

interface ProjectsSectionProps {
  data: Project[];
}

export default function ProjectsSection({ data }: ProjectsSectionProps) {
  // Combine DB projects with mock projects to get exactly 4 matching the design reference if needed
  const projectsToRender = React.useMemo(() => {
    return data.filter((p) => p.published);
  }, [data]);

  return (
    <section id="projects" className="py-28 bg-zinc-950 border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="flex items-center justify-between mb-16">
          <span className="text-yellow-300 font-mono text-sm tracking-widest font-extrabold uppercase">
            PROYEK UNGGULAN
          </span>

          <Link
            href="/projects"
            className="group inline-flex items-center gap-1 text-sm font-bold text-yellow-300 hover:text-yellow-400 transition-colors"
          >
            Lihat Semua Proyek
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Projects Grid — single row of 4 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projectsToRender.map((project, index) => (
            <motion.article
              key={project.id}
              className="group relative flex flex-col border border-zinc-900 bg-zinc-950 overflow-hidden hover:border-yellow-300/30 transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/projects/${project.slug}`} className="block w-full h-full">
                {/* Cover Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-900">
                  {/* Since actual cover images might not exist, we use CSS styled placeholders if the image fails to load,
                      but we set it to coverUrl so that uploaded images show up! */}
                  {project.coverUrl ? (
                    <Image
                      src={project.coverUrl}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    // Beautiful tech-styled visual placeholders for mock projects
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-zinc-950 to-zinc-900 relative">
                      {/* Grid background inside image placeholder */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-20" />
                      
                      {/* Code/Design Mock UI */}
                      <div className="w-[80%] h-[70%] border border-zinc-800 bg-zinc-950/80 rounded p-3 flex flex-col justify-between shadow-2xl relative z-10">
                        <div className="flex items-center gap-1.5 border-b border-zinc-900 pb-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                          <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                          <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                          <span className="text-[9px] font-mono text-zinc-600 ml-2">localhost:3000</span>
                        </div>
                        
                        <div className="flex-grow flex flex-col justify-center items-center gap-2">
                          <span className="text-xs font-mono font-bold text-zinc-500 tracking-wider uppercase text-center">
                            {project.title}
                          </span>
                          <span className="text-[9px] font-mono text-yellow-300/60 uppercase tracking-widest text-center">
                            {project.techStack[0] || "Web Development"}
                          </span>
                        </div>
                        
                        <div className="h-4 w-full bg-zinc-900/60 rounded flex items-center px-2">
                          <span className="h-1 w-[40%] bg-zinc-800 rounded" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Details (Title on left, arrow on right) */}
                <div className="p-5 flex items-center justify-between gap-3 border-t border-zinc-900 bg-zinc-950">
                  <div className="min-w-0">
                    <h3 className="text-base font-black text-zinc-100 tracking-tight font-sans mb-1 truncate group-hover:text-yellow-300 transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                      {project.techStack[0] || "Web Development"}
                    </span>
                  </div>

                  {/* Lime circle arrow */}
                  <div className="w-9 h-9 shrink-0 flex items-center justify-center border border-zinc-900 bg-zinc-950 text-zinc-400 group-hover:text-zinc-950 group-hover:bg-yellow-300 group-hover:border-yellow-300 transition-all duration-300">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}
