"use client";

import React from "react";
import { motion } from "framer-motion";

interface SkillItem {
  id: string;
  name: string;
  category: string;
  iconUrl: string | null;
  level: number;
  order: number;
}

interface SkillsProps {
  data: SkillItem[];
}

export function Skills({ data }: SkillsProps) {
  // Group skills by category
  const categories = data.reduce((acc, curr) => {
    if (!acc[curr.category]) {
      acc[curr.category] = [];
    }
    acc[curr.category].push(curr);
    return acc;
  }, {} as Record<string, SkillItem[]>);

  // Sort items inside categories by order
  Object.keys(categories).forEach((cat) => {
    categories[cat].sort((a, b) => a.order - b.order);
  });

  const categoryKeys = Object.keys(categories);

  if (categoryKeys.length === 0) {
    return null;
  }

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">
            Expertise
          </h2>
          <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Technical Skills
          </h3>
          <div className="h-[2px] w-12 bg-white/20 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {categoryKeys.map((category, catIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: catIndex * 0.1 }}
              className="bg-zinc-900/40 border border-zinc-900 rounded-2xl p-6 sm:p-8 shadow-xl"
            >
              <h4 className="text-lg font-bold text-white mb-6 border-b border-zinc-800/80 pb-3 flex items-center justify-between">
                <span>{category}</span>
                <span className="text-xs font-mono font-light text-zinc-500">
                  {categories[category].length} Skills
                </span>
              </h4>

              <div className="space-y-5">
                {categories[category].map((skill) => (
                  <div key={skill.id} className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-zinc-200 font-medium font-sans">
                        {skill.name}
                      </span>
                      <span className="text-zinc-400 font-mono text-xs">
                        {skill.level}%
                      </span>
                    </div>
                    {/* Progress track */}
                    <div className="h-1.5 w-full bg-zinc-950 rounded-full overflow-hidden border border-zinc-800/30">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                        className="h-full bg-gradient-to-r from-zinc-400 via-zinc-200 to-white rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
