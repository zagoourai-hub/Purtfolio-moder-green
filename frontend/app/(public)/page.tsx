import React from "react";
import HeroSection from "@/components/public/HeroSection";
import AboutSection from "@/components/public/AboutSection";
import TimelineSection from "@/components/public/TimelineSection";
import SkillsSection from "@/components/public/SkillsSection";
import ProjectsSection from "@/components/public/ProjectsSection";
import ServicesSection from "@/components/public/ServicesSection";
import TestimonialsSection from "@/components/public/TestimonialsSection";
import ContactSection from "@/components/public/ContactSection";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic'; // Always render dynamically — DB not available at build time

export default async function PublicHomePage() {
  // Parallel fetch of all public section data from DB using Prisma
  const [
    heroData,
    aboutData,
    skills,
    projects,
    services,
    testimonials,
  ] = await Promise.all([
    prisma.heroSection.findFirst(),
    prisma.aboutSection.findFirst(),
    prisma.skill.findMany({
      orderBy: { order: "asc" },
    }),
    prisma.project.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    }),
    prisma.service.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    }),
    prisma.testimonial.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    }),
  ]);

  // Convert dates and decimal types if needed to plain serializable types
  // Note: Prisma models only contain Date strings which are automatically serializable,
  // or strings/numbers.
  const serializedProjects = projects.map(p => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }));

  const serializedHero = heroData ? {
    ...heroData,
    updatedAt: heroData.updatedAt.toISOString(),
  } : null;

  const serializedAbout = aboutData ? {
    ...aboutData,
    updatedAt: aboutData.updatedAt.toISOString(),
  } : null;

  return (
    <div className="flex flex-col w-full overflow-hidden">
      <HeroSection data={serializedHero} />
      <AboutSection data={serializedAbout} />
      <TimelineSection />
      <SkillsSection data={skills} />
      <ProjectsSection data={serializedProjects} />
      <ServicesSection data={services} />
      <TestimonialsSection data={testimonials} />
      <ContactSection email={aboutData?.email} location={aboutData?.location} />
    </div>
  );
}
