import React from "react";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { InteractiveBlogList } from "@/features/blog/components/interactive-blog-list";

export const dynamic = 'force-dynamic'; // Always render dynamically — DB not available at build time

export async function generateMetadata(): Promise<Metadata> {
  let title = "Blog Articles | Alex Zagoour";
  let description = "Read my written thoughts on frontend architecture, software design, styling solutions, and tech engineering.";

  try {
    const settingsList = await prisma.siteSetting.findMany();
    const settings = settingsList.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {} as Record<string, string>);

    if (settings.site_title) {
      title = `Blog — ${settings.site_title}`;
    }
    if (settings.site_description) {
      description = settings.site_description;
    }
  } catch (e) {
    console.error("Failed to query settings for metadata on /blog", e);
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

export default async function BlogPage() {
  let posts: any[] = [];

  try {
    posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: [
        { publishedAt: "desc" },
        { createdAt: "desc" },
      ],
    });
  } catch (error) {
    console.error("Failed to load blog posts from DB:", error);
  }

  // Cast dates to string to prevent serialization errors between Server and Client Components
  const serializedPosts = posts.map((post) => ({
    ...post,
    publishedAt: post.publishedAt ? post.publishedAt.toISOString() : null,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  }));

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <h1 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-3 animate-pulse">
            Journal
          </h1>
          <h2 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
            Latest Publications
          </h2>
          <div className="h-[2px] w-12 bg-white/20 my-5" />
          <p className="text-zinc-400 text-lg font-light leading-relaxed">
            Thoughts, technical tutorials, and insights about next-gen web frameworks, database patterns, and beautiful design details.
          </p>
        </div>

        {/* Blog Post Grid & Tag Filter (Interactive client-side) */}
        <InteractiveBlogList posts={serializedPosts} />
      </div>
    </section>
  );
}
