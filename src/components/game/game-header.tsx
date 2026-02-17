"use client";

import { Info, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GameHeaderProps {
  onShowStats?: () => void;
  onShowHelp?: () => void;
}

export function GameHeader({ onShowStats, onShowHelp }: GameHeaderProps) {
  return (
    <header className="flex flex-col items-center w-full max-w-2xl mx-auto py-6 border-b">
      <div className="w-full flex justify-between items-center px-4 mb-4">
        <Button variant="ghost" size="icon" onClick={onShowHelp}>
          <Info className="h-6 w-6" />
        </Button>
        <h1 className="text-4xl font-bold tracking-tighter">ACRONYMLE</h1>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={onShowStats}>
            <BarChart3 className="h-6 w-6" />
          </Button>
        </div>
      </div>
      <div className="w-full h-32 bg-slate-900 flex items-center justify-center rounded-lg overflow-hidden relative shadow-inner">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(50,50,255,0.2),transparent)] animate-pulse" />
        <div className="absolute top-2 left-4 text-white/10 text-4xl font-bold select-none rotate-12">A</div>
        <div className="absolute bottom-4 right-10 text-white/10 text-6xl font-bold select-none -rotate-12">Z</div>
        <div className="absolute top-6 right-20 text-white/5 text-3xl font-bold select-none rotate-45">M</div>
        <div className="absolute bottom-2 left-20 text-white/5 text-5xl font-bold select-none -rotate-45">K</div>
        
        <div className="flex flex-col items-center z-10">
          <span className="text-white text-lg font-bold tracking-[0.3em] uppercase drop-shadow-md">
            DAILY DECODER
          </span>
          <div className="h-1 w-24 bg-primary mt-1 rounded-full animate-bounce" />
        </div>
      </div>
    </header>
  );
}
