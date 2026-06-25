"use client";

import React from "react";
import { Laptop, PenTool, Award, LineChart } from "lucide-react";
import { motion } from "motion/react";
import { Service } from "@/services/service.service";

interface ServicesSectionProps {
  data: Service[];
}

export default function ServicesSection({ data }: ServicesSectionProps) {
  // Use DB services or fall back to Indonesian services matching design reference
  const servicesToRender = React.useMemo(() => {
    const dbServices = data.filter((s) => s.published);

    const mockServices = [
      {
        id: "serv-1",
        title: "Web Development",
        description: "Membangun website cepat, scalable, dan modern.",
        icon: <Laptop className="w-5 h-5 text-yellow-300" />,
      },
      {
        id: "serv-2",
        title: "UI/UX Design",
        description: "Merancang antarmuka yang intuitif dan berfokus pada pengguna.",
        icon: <PenTool className="w-5 h-5 text-yellow-300" />,
      },
      {
        id: "serv-3",
        title: "Branding",
        description: "Membuat identitas brand yang kuat dan menonjol.",
        icon: <Award className="w-5 h-5 text-yellow-300" />,
      },
      {
        id: "serv-4",
        title: "SEO Optimization",
        description: "Meningkatkan visibilitas dan peringkat di mesin pencari.",
        icon: <LineChart className="w-5 h-5 text-yellow-300" />,
      },
    ];

    if (dbServices.length > 0) {
      // Map DB services to mock matching layout if needed
      return dbServices.map((s, idx) => {
        let icon = mockServices[idx % 4].icon;
        const title = s.title.toLowerCase();
        if (title.includes("web") || title.includes("dev")) {
          icon = <Laptop className="w-5 h-5 text-yellow-300" />;
        } else if (title.includes("design") || title.includes("ui")) {
          icon = <PenTool className="w-5 h-5 text-yellow-300" />;
        } else if (title.includes("brand")) {
          icon = <Award className="w-5 h-5 text-yellow-300" />;
        } else if (title.includes("seo") || title.includes("marketing")) {
          icon = <LineChart className="w-5 h-5 text-yellow-300" />;
        }
        return {
          id: s.id,
          title: s.title,
          description: s.description,
          icon,
        };
      });
    }

    return mockServices;
  }, [data]);

  return (
    <section id="services" className="py-28 bg-zinc-950 border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col items-start mb-16">
          <span className="text-yellow-300 font-mono text-sm tracking-widest font-extrabold uppercase">
            LAYANAN SAYA
          </span>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesToRender.map((service, index) => (
            <motion.div
              key={service.id}
              className="flex flex-col border border-zinc-900 bg-zinc-950 p-8 hover:border-yellow-300/35 transition-all duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Yellow outline icon box */}
              <div className="w-10 h-10 flex items-center justify-center border border-zinc-900 bg-zinc-950 text-yellow-300 mb-8 group-hover:border-yellow-300/30 transition-colors">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-black text-zinc-100 tracking-tight font-sans mb-3 group-hover:text-yellow-300 transition-colors">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-zinc-400 font-sans leading-relaxed flex-grow">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
