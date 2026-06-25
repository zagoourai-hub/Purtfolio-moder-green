"use client";

import React from "react";
import Sidebar from "@/components/cms/Sidebar";
import Topbar from "@/components/cms/Topbar";
import { useSidebarStore } from "@/stores/use-sidebar-store";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen } = useSidebarStore();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex font-sans">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div
        className={cn(
          "flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out",
          isOpen ? "pl-64" : "pl-20"
        )}
      >
        {/* Top Header Bar */}
        <Topbar />

        {/* Dynamic Content */}
        <main className="flex-1 p-6 lg:p-8 bg-zinc-950 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
