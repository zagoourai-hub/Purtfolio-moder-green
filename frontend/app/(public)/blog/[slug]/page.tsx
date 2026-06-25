import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Calendar, Clock, BookOpen, User } from "lucide-react";
import { prisma } from "@/lib/prisma";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic'; // Always render dynamically — DB not available at build time
export const dynamicParams = true;

// Dynamic SEO metadata based on blog post details
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug },
    });

    if (!post || !post.published) {
      return {
        title: "Article Not Found",
      };
    }

    const title = `${post.title} | Blog`;
    const description = post.excerpt;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "article",
        publishedTime: post.publishedAt?.toISOString() || post.createdAt.toISOString(),
        authors: ["Alex Zagoour"],
        images: post.coverUrl ? [{ url: post.coverUrl }] : [],
      },
    };
  } catch (error) {
    console.error("Error generating blog metadata:", error);
    return {
      title: "Blog Details",
    };
  }
}

export default async function BlogPostDetailPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  let post = null;

  try {
    post = await prisma.blogPost.findUnique({
      where: { slug },
    });
  } catch (error) {
    console.error("Database query failed while fetching blog post detail:", error);
  }

  // Handle 404 if blog post is missing or unpublished
  if (!post || !post.published) {
    notFound();
  }

  const formattedDate = new Date(post.publishedAt || post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Calculate reading time
  const wordsPerMinute = 200;
  const wordCount = post.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  return (
    <article className="py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-400 hover:text-white transition-colors duration-150 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Blog
          </Link>
        </div>

        {/* Title Header */}
        <header className="mb-10 space-y-6">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-zinc-500 font-mono">
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{readingTime} min read</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="w-3.5 h-3.5" />
              <span>Written by Alex</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-zinc-400 text-base sm:text-lg font-light leading-relaxed border-l-2 border-zinc-800 pl-4">
            {post.excerpt}
          </p>
        </header>

        {/* Cover Preview */}
        <div className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden border border-zinc-900 bg-zinc-950 shadow-2xl mb-12 flex items-center justify-center">
          {post.coverUrl ? (
            <Image
              src={post.coverUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-zinc-900 to-zinc-950 flex flex-col items-center justify-center p-6 text-zinc-700">
              <BookOpen className="w-16 h-16 mb-2" />
              <span className="text-xs font-mono tracking-widest uppercase">
                No Cover Image Available
              </span>
            </div>
          )}
        </div>

        {/* Markdown Content */}
        <div className="bg-zinc-900/30 border border-zinc-900 rounded-2xl p-8 sm:p-10 shadow-xl">
          <div className="prose prose-invert prose-zinc max-w-none text-zinc-300 font-light leading-relaxed">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>
        </div>

        {/* Tags footer */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-8 pt-6 border-t border-zinc-900 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-md text-xs font-mono bg-zinc-900 text-zinc-400 border border-zinc-800"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
