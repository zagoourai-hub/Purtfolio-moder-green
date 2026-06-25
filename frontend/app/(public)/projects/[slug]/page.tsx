import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Github, ExternalLink, ArrowLeft, Calendar, Tag, Box } from "lucide-react";
import { prisma } from "@/lib/prisma";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic'; // Always render dynamically — DB not available at build time
export const dynamicParams = true; // Render unknown slugs on-demand at request time

// Dynamic SEO metadata based on project details
export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  try {
    const project = await prisma.project.findUnique({
      where: { slug },
    });

    if (!project || !project.published) {
      return {
        title: "Project Not Found",
      };
    }

    const title = `${project.title} | Project Details`;
    const description = project.description.replace(/[#*`_-]/g, "").slice(0, 160);

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "article",
        images: project.coverUrl ? [{ url: project.coverUrl }] : [],
      },
    };
  } catch (error) {
    console.error("Error generating project metadata:", error);
    return {
      title: "Project Details",
    };
  }
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  let project = null;

  try {
    project = await prisma.project.findUnique({
      where: { slug },
    });
  } catch (error) {
    console.error("Database query failed while fetching project detail:", error);
  }

  // Handle 404 if project is missing or unpublished
  if (!project || !project.published) {
    notFound();
  }

  const formattedDate = new Date(project.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-400 hover:text-white transition-colors duration-150 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Projects
          </Link>
        </div>

        {/* Title Header */}
        <header className="mb-10 space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {project.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-zinc-500 font-light">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-zinc-600" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Tag className="w-4 h-4 text-zinc-600" />
              <span>Portfolio Project</span>
            </div>
          </div>
        </header>

        {/* Cover Preview */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-zinc-900 bg-zinc-950 shadow-2xl mb-12 flex items-center justify-center">
          {project.coverUrl ? (
            <Image
              src={project.coverUrl}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-zinc-900 to-zinc-950 flex flex-col items-center justify-center p-6 text-zinc-700">
              <Box className="w-16 h-16 mb-2" />
              <span className="text-xs font-mono tracking-widest uppercase">
                No Preview Image Available
              </span>
            </div>
          )}
        </div>

        {/* Details Grid (Sidebar Info + Long Markdown Content) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-zinc-900/30 border border-zinc-900 rounded-2xl p-8 shadow-xl">
              <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-6">
                Project Overview
              </h2>
              <div className="prose prose-invert prose-zinc max-w-none text-zinc-300 font-light leading-relaxed">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {project.description}
                </ReactMarkdown>
              </div>
            </div>
          </div>

          {/* Sidebar Metadata Column */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Tech Stack & Links */}
            <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-6 shadow-xl space-y-6">
              <div>
                <h3 className="text-sm font-bold text-white mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-xs font-mono bg-zinc-950 text-zinc-300 border border-zinc-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {(project.liveUrl || project.repoUrl) && (
                <div className="pt-6 border-t border-zinc-800/60 space-y-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white text-zinc-950 font-bold hover:bg-zinc-200 transition-all duration-200 text-sm shadow-md"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 font-semibold hover:bg-zinc-800 hover:border-zinc-700 hover:text-white transition-all duration-200 text-sm"
                    >
                      <Github className="w-4 h-4" />
                      Source Repository
                    </a>
                  )}
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
