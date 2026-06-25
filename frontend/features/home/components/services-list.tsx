"use client";

import React from "react";
import { Server, Code, Layers, ShieldCheck, Cpu } from "lucide-react";
import { motion } from "framer-motion";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconUrl: string | null;
  price: string | null;
  order: number;
  published: boolean;
}

interface ServicesListProps {
  data: ServiceItem[];
}

export function ServicesList({ data }: ServicesListProps) {
  const services = data
    .filter((s) => s.published)
    .sort((a, b) => a.order - b.order);

  if (services.length === 0) {
    return null;
  }

  // Helper to resolve an icon if iconUrl is missing
  const getIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes("api") || t.includes("backend") || t.includes("database")) {
      return <Server className="w-6 h-6 text-white" />;
    }
    if (t.includes("animation") || t.includes("ui") || t.includes("motion") || t.includes("frontend")) {
      return <Layers className="w-6 h-6 text-white" />;
    }
    if (t.includes("security") || t.includes("auth")) {
      return <ShieldCheck className="w-6 h-6 text-white" />;
    }
    if (t.includes("ai") || t.includes("model") || t.includes("machine")) {
      return <Cpu className="w-6 h-6 text-white" />;
    }
    return <Code className="w-6 h-6 text-white" />;
  };

  return (
    <section id="services" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">
            Services
          </h2>
          <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            What I Offer
          </h3>
          <div className="h-[2px] w-12 bg-white/20 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              className="group bg-zinc-900/40 border border-zinc-900 hover:border-zinc-800/80 rounded-2xl p-8 flex flex-col shadow-xl hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:-translate-y-1 transition-all duration-300 relative"
            >
              {/* Icon Container */}
              <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-200 shadow-md">
                {service.iconUrl ? (
                  <img
                    src={service.iconUrl}
                    alt={service.title}
                    className="w-6 h-6 object-contain"
                  />
                ) : (
                  getIcon(service.title)
                )}
              </div>

              {/* Title & Description */}
              <h4 className="text-xl font-bold text-white mb-3 group-hover:text-zinc-200 transition-colors">
                {service.title}
              </h4>
              <p className="text-zinc-400 text-sm font-light leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Price badge (Optional) */}
              {service.price && (
                <div className="mt-auto pt-4 border-t border-zinc-900/60 flex items-center justify-between">
                  <span className="text-xs text-zinc-500 font-mono">Starting price</span>
                  <span className="text-sm font-bold text-white font-mono bg-zinc-900 px-3 py-1 rounded-lg border border-zinc-800">
                    {service.price}
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
