import React from "react";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ServicesGrid } from "@/features/services/components/services-grid";

export const dynamic = 'force-dynamic'; // Always render dynamically — DB not available at build time

export async function generateMetadata(): Promise<Metadata> {
  let title = "Professional Services | Alex Zagoour";
  let description = "Discover the professional engineering services I offer: Web Development, API Architecture, and UI Animations.";

  try {
    const settingsList = await prisma.siteSetting.findMany();
    const settings = settingsList.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {} as Record<string, string>);

    if (settings.site_title) {
      title = `Services — ${settings.site_title}`;
    }
    if (settings.site_description) {
      description = settings.site_description;
    }
  } catch (e) {
    console.error("Failed to query settings for metadata on /services", e);
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

export default async function ServicesPage() {
  let services: any[] = [];

  try {
    services = await prisma.service.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });
  } catch (error) {
    console.error("Failed to load services from DB:", error);
  }

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <h1 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-3 animate-pulse">
            Services
          </h1>
          <h2 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
            My Professional Offerings
          </h2>
          <div className="h-[2px] w-12 bg-white/20 my-5" />
          <p className="text-zinc-400 text-lg font-light leading-relaxed">
            I offer custom fullstack development, software consulting, and styling integrations tailored to help your products scale.
          </p>
        </div>

        {/* Services Grid */}
        <ServicesGrid services={services} />
      </div>
    </section>
  );
}
