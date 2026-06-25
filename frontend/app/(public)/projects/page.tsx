import React from "react";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ProjectList } from "@/features/projects/components/project-list";

export const dynamic = 'force-dynamic'; // Always render dynamically — DB not available at build time

export async function generateMetadata(): Promise<Metadata> {
  let title = "Projects Portfolio | Alex Zagoour";
  let description = "Explore my portfolio of custom-built web apps, API architectures, and open source repositories.";

  try {
    const settingsList = await prisma.siteSetting.findMany();
    const settings = settingsList.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {} as Record<string, string>);

    if (settings.site_title) {
      title = `Projects — ${settings.site_title}`;
    }
    if (settings.site_description) {
      description = settings.site_description;
    }
  } catch (e) {
    console.error("Failed to query settings for metadata on /projects", e);
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
  };
}

export default async function ProjectsPage() {
  let projects: any[] = [];

  try {
    projects = await prisma.project.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });
  } catch (error) {
    console.error("Failed to load projects from DB:", error);
  }

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <h1 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-3 animate-pulse">
            Portfolio
          </h1>
          <h2 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
            My Creative Works
          </h2>
          <div className="h-[2px] w-12 bg-white/20 my-5" />
          <p className="text-zinc-400 text-lg font-light leading-relaxed">
            A curated list of web applications, client solutions, and tools that I have engineered. Filtered by production readiness.
          </p>
        </div>

        {/* Project Grid */}
        <ProjectList projects={projects} />
      </div>
    </section>
  );
}
