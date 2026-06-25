import bcrypt from "bcryptjs";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // 1. Seed Admin
  const adminEmail = "admin@porto.com";
  const existingAdmin = await prisma.admin.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("password123", 12);
    await prisma.admin.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
      },
    });
    console.log("✅ Admin user seeded: admin@porto.com / password123");
  } else {
    console.log("ℹ️ Admin user already exists");
  }

  // 2. Seed HeroSection
  const heroCount = await prisma.heroSection.count();
  if (heroCount === 0) {
    await prisma.heroSection.create({
      data: {
        greeting: "Hi, I'm",
        name: "Alex Zagoour",
        tagline: "Building premium digital experiences that make an impact.",
        description: "I am a fullstack engineer and product designer specialized in Next.js, Node.js, and high-fidelity UI animations. I help businesses build sleek websites and scalable SaaS apps.",
        ctaLabel: "Let's Talk",
        ctaUrl: "#contact",
        avatarUrl: null,
      },
    });
    console.log("✅ Hero section seeded");
  }

  // 3. Seed AboutSection
  const aboutCount = await prisma.aboutSection.count();
  if (aboutCount === 0) {
    await prisma.aboutSection.create({
      data: {
        bio: `I am a **Senior Fullstack Developer** based in Jakarta, Indonesia. With over 6 years of experience, I build robust web architectures and beautiful interactive user interfaces.

### Core Philosophy
I believe that code quality and design aesthetics should go hand in hand. A beautiful UI without a solid backend is just a shell, and a powerful backend without intuitive design is a missed opportunity.

### Experience
* **Lead Developer** at Zagoour Labs (2023 - Present)
* **Frontend Engineer** at Tech Corp (2020 - 2023)
* **Freelance Web Designer** (2018 - 2020)`,
        photoUrl: null,
        location: "Jakarta, Indonesia",
        email: "alex@zagoour.com",
        resumeUrl: "#",
      },
    });
    console.log("✅ About section seeded");
  }

  // 4. Seed Skills
  const skillCount = await prisma.skill.count();
  if (skillCount === 0) {
    const skills = [
      { name: "React / Next.js", category: "Frontend", level: 95, order: 1 },
      { name: "TypeScript", category: "Frontend", level: 90, order: 2 },
      { name: "Tailwind CSS", category: "Frontend", level: 95, order: 3 },
      { name: "Framer Motion", category: "Frontend", level: 85, order: 4 },
      { name: "Node.js / Express", category: "Backend", level: 88, order: 5 },
      { name: "NestJS", category: "Backend", level: 80, order: 6 },
      { name: "Prisma & PostgreSQL", category: "Backend", level: 85, order: 7 },
      { name: "Docker & VPS Deploy", category: "DevOps", level: 75, order: 8 },
    ];

    for (const skill of skills) {
      await prisma.skill.create({ data: skill });
    }
    console.log(`✅ ${skills.length} Skills seeded`);
  }

  // 5. Seed Projects
  const projectCount = await prisma.project.count();
  if (projectCount === 0) {
    const projects = [
      {
        title: "E-Commerce SaaS Dashboard",
        slug: "ecommerce-saas-dashboard",
        description: `A fully featured admin console to manage e-commerce analytics, product listings, orders, and customer queries.
        
### Key Features
* Dynamic interactive sales charts
* Real-time inventory tracking
* Advanced product filters and bulk editing`,
        coverUrl: null,
        techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
        liveUrl: "https://demo.zagoour.com/saas",
        repoUrl: "https://github.com/zagoour/saas-dashboard",
        featured: true,
        published: true,
        order: 1,
      },
      {
        title: "AI Writing Assistant",
        slug: "ai-writing-assistant",
        description: `An interactive web editor integrated with Gemini API to help creators brainstorm topics, generate SEO-friendly outlines, and rewrite copy.
        
### Technologies Used
* Next.js 16 with AI SDK
* Tailwind CSS glassmorphism styling
* Zustand for local editor states`,
        coverUrl: null,
        techStack: ["Next.js", "Gemini API", "Zustand", "Tailwind CSS"],
        liveUrl: "https://demo.zagoour.com/ai-writer",
        repoUrl: "https://github.com/zagoour/ai-writer",
        featured: true,
        published: true,
        order: 2,
      },
    ];

    for (const project of projects) {
      await prisma.project.create({ data: project });
    }
    console.log(`✅ ${projects.length} Projects seeded`);
  }

  // 6. Seed Services
  const serviceCount = await prisma.service.count();
  if (serviceCount === 0) {
    const services = [
      {
        title: "Web Application Development",
        description: "Building fast, SEO-optimized websites and web apps using Next.js 16, TypeScript, and modern styling solutions.",
        price: "From $1,500",
        order: 1,
        published: true,
      },
      {
        title: "API Design & Backend Architecture",
        description: "Designing secure RESTful and GraphQL APIs with robust authentication (NextAuth, JWT) and PostgreSQL database integrations.",
        price: "From $2,000",
        order: 2,
        published: true,
      },
      {
        title: "UI Animation & Micro-interactions",
        description: "Crafting beautiful layouts and high-performance interactive interfaces using Framer Motion (Motion) to wow your users.",
        price: "From $800",
        order: 3,
        published: true,
      },
    ];

    for (const s of services) {
      await prisma.service.create({ data: s });
    }
    console.log(`✅ ${services.length} Services seeded`);
  }

  // 7. Seed Testimonials
  const testimonialCount = await prisma.testimonial.count();
  if (testimonialCount === 0) {
    const testimonials = [
      {
        clientName: "Jane Doe",
        clientRole: "CTO",
        company: "Innovate Ltd",
        avatarUrl: null,
        content: "Alex is an outstanding engineer. He delivered our Next.js migration on schedule, and our website speed increased by 40%. The UI animations are incredibly smooth!",
        rating: 5,
        featured: true,
        published: true,
        order: 1,
      },
      {
        clientName: "John Smith",
        clientRole: "Founder",
        company: "SaaS Launch",
        avatarUrl: null,
        content: "Outstanding communication and top-tier code quality. The CMS panel makes it extremely easy for my marketing team to update copy and projects without developer intervention.",
        rating: 5,
        featured: true,
        published: true,
        order: 2,
      },
    ];

    for (const t of testimonials) {
      await prisma.testimonial.create({ data: t });
    }
    console.log(`✅ ${testimonials.length} Testimonials seeded`);
  }

  // 8. Seed SiteSettings
  const settingCount = await prisma.siteSetting.count();
  if (settingCount === 0) {
    const settings = [
      { key: "site_title", value: "Alex Zagoour — Portfolio" },
      { key: "site_description", value: "Premium portfolio template built with Next.js 16, Tailwind CSS v4, and Prisma v7." },
      { key: "og_image", value: "" },
      { key: "social_github", value: "https://github.com" },
      { key: "social_linkedin", value: "https://linkedin.com" },
      { key: "social_twitter", value: "https://twitter.com" },
      { key: "google_analytics_id", value: "UA-XXXXX-Y" },
    ];

    for (const setting of settings) {
      await prisma.siteSetting.create({ data: setting });
    }
    console.log(`✅ ${settings.length} Site Settings seeded`);
  }

  console.log("Seeding complete! 🌱");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
