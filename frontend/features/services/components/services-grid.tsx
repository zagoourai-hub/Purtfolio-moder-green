"use client";

import React from "react";
import { Server, Code, Layers, ShieldCheck, Cpu, Box, Check } from "lucide-react";
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

interface ServicesGridProps {
  services: ServiceItem[];
}

export function ServicesGrid({ services }: ServicesGridProps) {
  if (services.length === 0) {
    return (
      <div className="text-center py-20 bg-zinc-900/10 rounded-2xl border border-zinc-900 max-w-md mx-auto">
        <Box className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
        <h4 className="text-lg font-bold text-white mb-2">No Services Found</h4>
        <p className="text-zinc-500 text-sm font-light">
          There are no services published yet. Please check back later!
        </p>
      </div>
    );
  }

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((service, index) => (
        <motion.div
          key={service.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
          className="group bg-zinc-900/40 border border-zinc-900 hover:border-zinc-800/80 rounded-2xl p-8 flex flex-col justify-between shadow-xl hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:-translate-y-1 transition-all duration-300 relative"
        >
          <div>
            {/* Icon Box */}
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

            {/* Content */}
            <h4 className="text-xl font-bold text-white mb-4 group-hover:text-zinc-200 transition-colors">
              {service.title}
            </h4>
            <p className="text-zinc-400 text-sm font-light leading-relaxed mb-6">
              {service.description}
            </p>

            {/* Checklist highlights */}
            <ul className="space-y-2 mb-8">
              <li className="flex items-center gap-2 text-xs text-zinc-400 font-light">
                <Check className="w-3.5 h-3.5 text-zinc-500" /> Professional Grade
              </li>
              <li className="flex items-center gap-2 text-xs text-zinc-400 font-light">
                <Check className="w-3.5 h-3.5 text-zinc-500" /> High-Performance Delivery
              </li>
              <li className="flex items-center gap-2 text-xs text-zinc-400 font-light">
                <Check className="w-3.5 h-3.5 text-zinc-500" /> Responsive Support
              </li>
            </ul>
          </div>

          {/* Pricing Row */}
          {service.price && (
            <div className="pt-4 border-t border-zinc-900/60 flex items-center justify-between">
              <span className="text-xs text-zinc-500 font-mono">Value starting at</span>
              <span className="text-sm font-bold text-white font-mono bg-zinc-950 px-3 py-1 rounded-lg border border-zinc-800">
                {service.price}
              </span>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
