"use client";

import React, { useState } from "react";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { leadService } from "@/services/lead.service";

interface ContactSectionProps {
  email?: string | null;
  location?: string | null;
}

export default function ContactSection({ email, location }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      newErrors.name = "Nama wajib diisi";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email wajib diisi";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email tidak valid";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Pesan wajib diisi";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Mohon lengkapi formulir Anda.");
      return;
    }

    setIsLoading(true);

    try {
      await leadService.submitLead({
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
      });

      toast.success("Pesan Anda telah berhasil dikirim!");
      setFormData({
        name: "",
        email: "",
        message: "",
      });
      setErrors({});
    } catch (error: any) {
      console.error(error);
      toast.error("Gagal mengirim pesan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-28 bg-zinc-950 border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Huge Title, Subtitle & Form */}
          <motion.div
            className="lg:col-span-7 flex flex-col"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Huge dynamic title in lime-green/yellow */}
            <h2 className="text-4xl sm:text-5xl font-sans font-black tracking-tighter text-yellow-300 leading-tight mb-3">
              PUNYA IDE KEREN?
              <br />
              YUK, WUJUDKAN BERSAMA!
            </h2>
            <p className="text-zinc-400 text-sm font-sans mb-10 max-w-lg">
              Ceritakan project kamu dan kita bikin sesuatu yang berdampak bareng.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Nama Kamu */}
                <div className="space-y-2">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    placeholder="Nama Kamu"
                    className={`w-full rounded-none border ${
                      errors.name ? "border-red-500" : "border-zinc-900 focus:border-yellow-300"
                    } bg-zinc-950 px-5 py-4 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-all`}
                  />
                  {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
                </div>

                {/* Email Kamu */}
                <div className="space-y-2">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    placeholder="Email Kamu"
                    className={`w-full rounded-none border ${
                      errors.email ? "border-red-500" : "border-zinc-900 focus:border-yellow-300"
                    } bg-zinc-950 px-5 py-4 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-all`}
                  />
                  {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
                </div>
              </div>

              {/* Ceritakan Project Kamu */}
              <div className="space-y-2">
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  placeholder="Ceritakan Project Kamu"
                  className={`w-full rounded-none border ${
                    errors.message ? "border-red-500" : "border-zinc-900 focus:border-yellow-300"
                  } bg-zinc-950 px-5 py-4 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-all resize-none`}
                />
                {errors.message && <span className="text-xs text-red-500">{errors.message}</span>}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-yellow-300 hover:bg-yellow-400 disabled:bg-zinc-800 text-zinc-950 disabled:text-zinc-600 text-sm font-extrabold tracking-wider transition-colors cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Mengirim...
                    </>
                  ) : (
                    <>
                      Kirim Pesan
                      <ArrowUpRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>

          {/* Right Column: Availability Banner with Doodle Arrow */}
          <motion.div
            className="lg:col-span-5 flex flex-col items-center lg:items-start justify-center h-full pt-10 lg:pt-20 lg:pl-10"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="relative border border-dashed border-zinc-800 bg-zinc-950/40 p-8 text-center max-w-sm w-full group hover:border-yellow-300/20 transition-all duration-300">
              <span className="text-zinc-500 font-mono text-xs tracking-widest uppercase block mb-4">
                SEDANG TERSEDIA UNTUK
              </span>
              
              {/* Stylized handwritten graffiti text */}
              <h3 className="font-handwritten text-5xl sm:text-6xl font-bold tracking-tight text-yellow-300 leading-[0.95] select-none drop-shadow-[0_0_16px_rgba(208,240,0,0.3)] -rotate-3">
                PROYEK
                <br />
                KEREN
                <br />
                BERIKUTNYA!
              </h3>
              
              {/* Curvy arrow sketch SVG */}
              <svg
                width="60"
                height="60"
                viewBox="0 0 60 60"
                fill="none"
                className="absolute bottom-[-55px] right-[20px] text-zinc-500 scale-x-[-1] rotate-[-50deg] pointer-events-none"
              >
                <path
                  d="M10 10 C 25 20, 30 35, 45 40 C 47 41, 52 38, 55 35"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M48 30 L55 35 L50 42"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
