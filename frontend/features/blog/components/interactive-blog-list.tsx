"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Tag, BookOpen, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BlogPostItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverUrl: string | null;
  tags: string[];
  published: boolean;
  publishedAt: Date | string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

interface InteractiveBlogListProps {
  posts: BlogPostItem[];
}

export function InteractiveBlogList({ posts }: InteractiveBlogListProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract all unique tags
  const allTags = Array.from(
    new Set(posts.flatMap((post) => post.tags || []))
  ).sort();

  // Filter posts based on selectedTag
  const filteredPosts = selectedTag
    ? posts.filter((post) => post.tags?.includes(selectedTag))
    : posts;

  // Helper to format date
  const formatDate = (dateValue: any) => {
    if (!dateValue) return "";
    return new Date(dateValue).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Helper for reading time estimation
  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  return (
    <div className="space-y-10">
      {/* Tags Filter Header */}
      {allTags.length > 0 && (
        <div className="bg-zinc-900/30 border border-zinc-900 rounded-2xl p-5 shadow-lg">
          <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-4 flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5" />
            Filter by Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200 cursor-pointer ${
                selectedTag === null
                  ? "bg-white text-zinc-950 border-white shadow-md shadow-white/10"
                  : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700"
              }`}
            >
              All Posts
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200 cursor-pointer ${
                  selectedTag === tag
                    ? "bg-white text-zinc-950 border-white shadow-md shadow-white/10"
                    : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700"
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Grid Posts */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-20 bg-zinc-900/10 rounded-2xl border border-zinc-900 max-w-md mx-auto">
          <BookOpen className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
          <h4 className="text-lg font-bold text-white mb-2">No Posts Found</h4>
          <p className="text-zinc-500 text-sm font-light">
            There are no blog posts found matching the filter or published yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post) => (
              <motion.article
                key={post.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="group bg-zinc-900/40 border border-zinc-900 hover:border-zinc-800/80 rounded-2xl overflow-hidden flex flex-col shadow-xl hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-all duration-300 relative"
              >
                {/* Cover Image Container */}
                <Link
                  href={`/blog/${post.slug}`}
                  className="relative w-full aspect-[2/1] bg-zinc-950 border-b border-zinc-900 overflow-hidden flex items-center justify-center"
                >
                  {post.coverUrl ? (
                    <Image
                      src={post.coverUrl}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-102 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-zinc-900 to-zinc-950 flex flex-col items-center justify-center p-6 text-zinc-700">
                      <BookOpen className="w-12 h-12 mb-2 group-hover:scale-110 transition-transform duration-300" />
                      <span className="text-[10px] font-mono tracking-widest uppercase">
                        No Cover Image
                      </span>
                    </div>
                  )}
                </Link>

                {/* Details Content */}
                <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between">
                  <div>
                    {/* Header line metadata */}
                    <div className="flex items-center gap-x-4 text-xs text-zinc-500 font-mono mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{getReadingTime(post.content)}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <Link href={`/blog/${post.slug}`} className="block group">
                      <h4 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-zinc-200 leading-tight transition-colors">
                        {post.title}
                      </h4>
                    </Link>

                    {/* Excerpt */}
                    <p className="text-zinc-400 text-sm font-light leading-relaxed mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Tags & Action */}
                  <div className="mt-auto pt-6 border-t border-zinc-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {/* Inline tag badges */}
                    <div className="flex flex-wrap gap-1">
                      {post.tags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-950 text-zinc-400 border border-zinc-900 hover:text-white hover:border-zinc-700 transition-colors"
                        >
                          #{tag}
                        </button>
                      ))}
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-xs font-semibold text-white hover:underline flex-shrink-0"
                    >
                      Read Post &rarr;
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
