import React from "react";

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950/80 backdrop-blur-md">
      <div className="relative flex flex-col items-center space-y-4">
        {/* Glow backdrop decorator */}
        <div className="absolute w-40 h-40 bg-violet-600/10 rounded-full blur-2xl pointer-events-none" />
        
        {/* Sleek dual rings spinner */}
        <div className="relative w-16 h-16 shrink-0">
          <div className="absolute inset-0 rounded-full border-4 border-zinc-800" />
          <div className="absolute inset-0 rounded-full border-4 border-t-violet-500 animate-spin" />
        </div>
        
        <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase animate-pulse">
          Loading Zagoour
        </span>
      </div>
    </div>
  );
}
