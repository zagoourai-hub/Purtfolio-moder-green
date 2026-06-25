"use client";

import React from "react";
import Image from "next/image";
import { Star, Quote, User } from "lucide-react";
import { motion } from "framer-motion";

interface TestimonialItem {
  id: string;
  clientName: string;
  clientRole: string | null;
  company: string | null;
  avatarUrl: string | null;
  content: string;
  rating: number;
  featured: boolean;
  published: boolean;
  order: number;
}

interface TestimonialsListProps {
  data: TestimonialItem[];
}

export function TestimonialsList({ data }: TestimonialsListProps) {
  const testimonials = data
    .filter((t) => t.published)
    .sort((a, b) => a.order - b.order);

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" className="py-20 bg-zinc-950/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">
            Reviews
          </h2>
          <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Client Testimonials
          </h3>
          <div className="h-[2px] w-12 bg-white/20 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-zinc-900/40 border border-zinc-900 hover:border-zinc-800/60 rounded-2xl p-8 sm:p-10 shadow-xl flex flex-col relative group"
            >
              {/* Quote icon watermark */}
              <Quote className="absolute top-6 right-6 w-12 h-12 text-zinc-800/30 group-hover:text-zinc-800/40 transition-colors pointer-events-none" />

              {/* Rating Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < testimonial.rating
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-zinc-700"
                    }`}
                  />
                ))}
              </div>

              {/* Testimonial content */}
              <p className="text-zinc-300 text-base font-light italic leading-relaxed mb-8 flex-grow">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4 pt-6 border-t border-zinc-900/60">
                <div className="w-11 h-11 rounded-full bg-zinc-950 border border-zinc-800 relative overflow-hidden flex items-center justify-center">
                  {testimonial.avatarUrl ? (
                    <Image
                      src={testimonial.avatarUrl}
                      alt={testimonial.clientName}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <User className="w-5 h-5 text-zinc-600" />
                  )}
                </div>
                <div>
                  <h5 className="font-bold text-white text-sm">
                    {testimonial.clientName}
                  </h5>
                  <p className="text-xs text-zinc-500 font-light mt-0.5">
                    {testimonial.clientRole && testimonial.clientRole}
                    {testimonial.clientRole && testimonial.company && " at "}
                    {testimonial.company && (
                      <span className="text-zinc-400 font-normal">
                        {testimonial.company}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
