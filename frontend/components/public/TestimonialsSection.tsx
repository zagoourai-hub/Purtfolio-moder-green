"use client";

import React from "react";
import Image from "next/image";
import { Star, User, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { Testimonial } from "@/services/testimonial.service";

interface TestimonialsSectionProps {
  data: Testimonial[];
}

export default function TestimonialsSection({ data }: TestimonialsSectionProps) {
  // Use DB data or fall back to Indonesian design reference testimonials
  const testimonialsToRender = React.useMemo(() => {
    const dbTestimonials = data.filter((t) => t.published);

    const mockTestimonials = [
      {
        id: "testi-1",
        clientName: "John Doe",
        clientRole: "CEO",
        company: "StartupX",
        content: "Hasil kerjanya melampaui ekspektasi. Website kami jadi lebih cepat dan pengguna jauh lebih puas.",
        rating: 5,
        avatarUrl: null,
      },
      {
        id: "testi-2",
        clientName: "Sarah Miller",
        clientRole: "Marketing Manager",
        company: "MarketCorp",
        content: "Komunikasi lancar, responsif, dan sangat paham kebutuhan project. Highly recommended!",
        rating: 5,
        avatarUrl: null,
      },
      {
        id: "testi-3",
        clientName: "Michael Brown",
        clientRole: "Founder",
        company: "Brandify",
        content: "Desainnya clean dan modern, hasilnya keren banget. Pasti kerja bareng lagi.",
        rating: 5,
        avatarUrl: null,
      },
    ];

    if (dbTestimonials.length > 0) {
      // Map DB testimonials
      return dbTestimonials.map((t, idx) => ({
        id: t.id,
        clientName: t.clientName,
        clientRole: t.clientRole || mockTestimonials[idx % 3].clientRole,
        company: t.company || mockTestimonials[idx % 3].company,
        content: t.content,
        rating: t.rating,
        avatarUrl: t.avatarUrl,
      }));
    }

    return mockTestimonials;
  }, [data]);

  const renderStars = (rating: number) => {
    const stars = [];
    const maxStars = 5;
    for (let i = 1; i <= maxStars; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-4 h-4 ${
            i <= rating ? "text-yellow-300 fill-yellow-300" : "text-zinc-800"
          }`}
        />
      );
    }
    return stars;
  };

  return (
    <section id="testimonials" className="py-28 bg-zinc-950 border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Heading with Slider Controls */}
        <div className="flex items-center justify-between mb-16">
          <span className="text-yellow-300 font-mono text-sm tracking-widest font-extrabold uppercase">
            APA KATA KLIEN
          </span>
          
          {/* Dummy slider controls matching design reference */}
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 flex items-center justify-center border border-zinc-900 bg-zinc-950 text-zinc-400 hover:text-yellow-300 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center border border-zinc-900 bg-zinc-950 text-zinc-400 hover:text-yellow-300 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonialsToRender.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="flex flex-col border border-zinc-900 bg-zinc-950 p-8 hover:border-yellow-300/35 transition-all duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Star Rating */}
              <div className="flex items-center gap-1.5 mb-6">
                {renderStars(testimonial.rating)}
              </div>

              {/* Content Statement */}
              <blockquote className="text-zinc-300 text-sm font-sans leading-relaxed mb-8 flex-grow">
                &ldquo;{testimonial.content}&rdquo;
              </blockquote>

              {/* Client Info */}
              <div className="flex items-center gap-3 pt-6 border-t border-zinc-900">
                <div className="relative w-9 h-9 rounded-full overflow-hidden bg-zinc-900 border border-zinc-800 shrink-0 flex items-center justify-center text-zinc-500">
                  {testimonial.avatarUrl ? (
                    <Image
                      src={testimonial.avatarUrl}
                      alt={testimonial.clientName}
                      fill
                      sizes="36px"
                      className="object-cover"
                    />
                  ) : (
                    <User className="w-4 h-4 text-zinc-650" />
                  )}
                </div>

                <div>
                  <h4 className="text-sm font-bold text-zinc-200 font-sans tracking-tight">
                    {testimonial.clientName}
                  </h4>
                  <span className="text-xs text-zinc-500 font-sans block">
                    {testimonial.clientRole}, {testimonial.company}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
