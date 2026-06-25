import React from "react";
import Link from "next/link";
import { Github, Linkedin, Twitter, Globe } from "lucide-react";

interface FooterProps {
  siteTitle?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
}

export function Footer({
  siteTitle = "Alex Zagoour",
  githubUrl = "https://github.com",
  linkedinUrl = "https://linkedin.com",
  twitterUrl = "https://twitter.com",
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Github className="w-4 h-4" />, href: githubUrl, label: "GitHub" },
    { icon: <Linkedin className="w-4 h-4" />, href: linkedinUrl, label: "LinkedIn" },
    { icon: <Twitter className="w-4 h-4" />, href: twitterUrl, label: "Twitter" },
  ].filter((item) => item.href && item.href !== "");

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & copyright */}
          <div className="text-center md:text-left">
            <Link
              href="/"
              className="font-sans font-bold text-lg tracking-tight text-white inline-flex items-center gap-1.5"
            >
              <span className="w-6 h-6 rounded bg-white text-zinc-950 flex items-center justify-center font-extrabold text-xs">
                Z
              </span>
              <span>{siteTitle.replace(" — Portfolio", "")}</span>
            </Link>
            <p className="mt-2 text-xs text-zinc-500 font-light">
              &copy; {currentYear} Zagoour Labs. All rights reserved.
            </p>
          </div>

          {/* Quick links */}
          <div className="flex items-center justify-center gap-6">
            <Link href="/" className="text-xs text-zinc-400 hover:text-white transition-colors duration-200">
              Home
            </Link>
            <Link href="/projects" className="text-xs text-zinc-400 hover:text-white transition-colors duration-200">
              Projects
            </Link>
            <Link href="/blog" className="text-xs text-zinc-400 hover:text-white transition-colors duration-200">
              Blog
            </Link>
            <Link href="/services" className="text-xs text-zinc-400 hover:text-white transition-colors duration-200">
              Services
            </Link>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 hover:bg-zinc-800 flex items-center justify-center transition-all duration-200"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
