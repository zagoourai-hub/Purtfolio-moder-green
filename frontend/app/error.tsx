"use client";

import React, { useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error ke monitoring service jika ada
    console.error("Next.js global error boundary caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-6 py-12 relative overflow-hidden font-sans">
      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-red-950/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md text-center space-y-6">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-red-950/20 border border-red-900/40 text-red-400 flex items-center justify-center">
          <AlertCircle className="w-8 h-8 animate-pulse" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Something went wrong!
          </h2>
          <p className="text-sm text-zinc-400 max-w-xs mx-auto leading-relaxed">
            An unexpected application error occurred. Zagoour has logged this incident.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            onClick={() => reset()}
            className="w-full sm:w-auto bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-200 hover:text-white px-6 py-2.5 rounded-xl font-semibold transition"
          >
            Try Again
          </Button>
          <Button
            onClick={() => (window.location.href = "/")}
            className="w-full sm:w-auto bg-violet-600 hover:bg-violet-500 text-white px-6 py-2.5 rounded-xl font-semibold transition"
          >
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}
