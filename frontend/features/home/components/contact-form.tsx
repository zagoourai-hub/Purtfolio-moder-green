"use client";

import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Send, Loader2, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";

interface ContactFormProps {
  email: string | null;
  location: string | null;
}

export function ContactForm({ email, location }: ContactFormProps) {
  const [name, setName] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !emailInput || !message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post("/api/contact", {
        name,
        email: emailInput,
        subject,
        message,
      });

      if (response.data.success) {
        toast.success("Your message has been sent successfully!");
        setName("");
        setEmailInput("");
        setSubject("");
        setMessage("");
      } else {
        toast.error("Failed to send your message. Please try again.");
      }
    } catch (error: any) {
      console.error("Error sending contact message:", error);
      const errMsg = error.response?.data?.error || "Failed to send message. Please try again later.";
      toast.error(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">
            Connect
          </h2>
          <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Get In Touch
          </h3>
          <div className="h-[2px] w-12 bg-white/20 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto items-start">
          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="bg-zinc-900/40 border border-zinc-900 rounded-2xl p-8 shadow-xl">
              <h4 className="text-xl font-bold text-white mb-6">Contact Info</h4>
              <p className="text-zinc-400 text-sm font-light leading-relaxed mb-8">
                Feel free to reach out if you want to collaborate, have a question, or just want to connect. I will do my best to get back to you as soon as possible!
              </p>

              <div className="space-y-6">
                {email && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-4 h-4 text-zinc-400" />
                    </div>
                    <div>
                      <h5 className="text-xs font-mono uppercase text-zinc-500">Email Me</h5>
                      <a
                        href={`mailto:${email}`}
                        className="text-sm font-semibold text-zinc-200 hover:text-white transition-colors break-all"
                      >
                        {email}
                      </a>
                    </div>
                  </div>
                )}

                {location && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 text-zinc-400" />
                    </div>
                    <div>
                      <h5 className="text-xs font-mono uppercase text-zinc-500">Location</h5>
                      <p className="text-sm font-semibold text-zinc-200">{location}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-zinc-900/40 border border-zinc-900 rounded-2xl p-8 sm:p-10 shadow-xl space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="form-name" className="text-xs font-semibold text-zinc-400">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="form-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isLoading}
                    className="w-full bg-zinc-950/70 border border-zinc-800 focus:border-zinc-600 rounded-xl px-4 py-3 text-sm text-zinc-200 outline-none transition-colors disabled:opacity-50"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="form-email" className="text-xs font-semibold text-zinc-400">
                    Your Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="form-email"
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    disabled={isLoading}
                    className="w-full bg-zinc-950/70 border border-zinc-800 focus:border-zinc-600 rounded-xl px-4 py-3 text-sm text-zinc-200 outline-none transition-colors disabled:opacity-50"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <label htmlFor="form-subject" className="text-xs font-semibold text-zinc-400">
                  Subject
                </label>
                <input
                  id="form-subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  disabled={isLoading}
                  className="w-full bg-zinc-950/70 border border-zinc-800 focus:border-zinc-600 rounded-xl px-4 py-3 text-sm text-zinc-200 outline-none transition-colors disabled:opacity-50"
                  placeholder="Inquiry about new project"
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label htmlFor="form-message" className="text-xs font-semibold text-zinc-400">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="form-message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={isLoading}
                  className="w-full bg-zinc-950/70 border border-zinc-800 focus:border-zinc-600 rounded-xl px-4 py-3 text-sm text-zinc-200 outline-none transition-colors resize-none disabled:opacity-50"
                  placeholder="Tell me more about your requirements..."
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-white text-zinc-950 font-bold hover:bg-zinc-200 transition-all duration-300 disabled:opacity-55 cursor-pointer shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
