"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Box } from "lucide-react";
import { motion } from "framer-motion";

// Custom Github SVG component since it's missing in this version of lucide-react
const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

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

interface ProjectListProps {
  projects: ProjectItem[];
}

export function ProjectList({ projects }: ProjectListProps) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-20 bg-zinc-900/10 rounded-2xl border border-zinc-900 max-w-md mx-auto">
        <Box className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
        <h4 className="text-lg font-bold text-white mb-2">No Projects Found</h4>
        <p className="text-zinc-500 text-sm font-light">
          There are no projects published yet. Please check back later!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
          className="group bg-zinc-900/40 border border-zinc-900 hover:border-zinc-800/80 rounded-2xl overflow-hidden flex flex-col shadow-xl hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-all duration-300 relative"
        >
          {/* Cover Container */}
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

          {/* Details */}
          <div className="p-6 flex-grow flex flex-col">
            {/* Tech stack tags */}
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

            {/* Title */}
            <h4 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-zinc-200 transition-colors">
              {project.title}
            </h4>

            {/* Excerpt */}
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
                    <GithubIcon className="w-4 h-4" />
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
  );
}
