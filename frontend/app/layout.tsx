import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { QueryProvider } from "@/providers/query-provider";
import { MotionConfig } from "motion/react";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zagoour Portfolio CMS",
  description: "Premium Portfolio Website & built-in CMS Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className="min-h-full flex flex-col bg-zinc-950 text-zinc-100 antialiased"
      >
        <SessionProvider>
          <QueryProvider>
            <MotionConfig reducedMotion="user">
              {children}
              <Toaster position="top-right" richColors />
            </MotionConfig>
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
