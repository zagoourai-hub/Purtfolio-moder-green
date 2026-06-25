"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Github, ExternalLink, Box } from "lucide-react";
import { motion } from "framer-motion";

interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverUrl: string | null;
  techStack: string[];
  liveUrl: string | null;
  repoUrl: string | null;
  featured: boolean;
  published: boolean;
  order: number;
}

interface FeaturedProjectsProps {
  data: ProjectItem[];
}

export function FeaturedProjects({ data }: FeaturedProjectsProps) {
  // Take up to 3 featured projects
  const projects = data
    .filter((p) => p.featured && p.published)
    .sort((a, b) => a.order - b.order)
    .slice(0, 3);

  if (projects.length === 0) {
    return null;
  }

  return (
    <section id="projects" className="py-20 bg-zinc-950/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-end justify-between mb-16 gap-4">
          <div className="text-left">
            <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">
              Portfolio
            </h2>
            <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Featured Projects
            </h3>
            <div className="h-[2px] w-12 bg-white/20 mt-4" />
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-400 hover:text-white group transition-colors duration-200"
          >
            View all projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-zinc-900/40 border border-zinc-900 hover:border-zinc-800/80 rounded-2xl overflow-hidden flex flex-col shadow-xl hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-all duration-300 relative"
            >
              {/* Cover Image Container */}
              <div className="relative w-full aspect-video bg-zinc-950 border-b border-zinc-900 overflow-hidden flex items-center justify-center">
                {project.coverUrl ? (
                  <Image
                    src={project.coverUrl}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-zinc-900 to-zinc-950 flex flex-col items-center justify-center p-6 text-zinc-700">
                    <Box className="w-12 h-12 mb-2 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-[10px] font-mono tracking-widest uppercase">
                      No Preview Image
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 flex-grow flex flex-col">
                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-900 text-zinc-400 border border-zinc-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <h4 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-zinc-200 transition-colors">
                  {project.title}
                </h4>

                <p className="text-zinc-400 text-sm font-light leading-relaxed mb-6 line-clamp-3">
                  {project.description.replace(/[#*`_-]/g, "")}
                </p>

                {/* Footer action buttons */}
                <div className="mt-auto pt-4 border-t border-zinc-900/60 flex items-center justify-between">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-xs font-semibold text-white hover:underline inline-flex items-center gap-1"
                  >
                    View Details
                  </Link>

                  <div className="flex items-center gap-2">
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
                        title="Source Code"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
