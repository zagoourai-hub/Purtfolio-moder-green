import React from "react";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100 selection:bg-zinc-100 selection:text-zinc-950 font-sans">
      <Navbar />
      {/* Spacer to push content down because of fixed navbar */}
      <main className="flex-grow pt-24">
        {children}
      </main>
      <Footer />
    </div>
  );
}
