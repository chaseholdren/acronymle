"use client";

import { Info, BarChart3, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export function GameHeader() {
  return (
    <header className="flex flex-col items-center w-full max-w-2xl mx-auto py-6 border-b">
      <div className="w-full flex justify-between items-center px-4 mb-4">
        <Button variant="ghost" size="icon">
          <Info className="h-6 w-6" />
        </Button>
        <h1 className="text-4xl font-bold tracking-tighter">ACRONYMLE</h1>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon">
            <BarChart3 className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-6 w-6" />
          </Button>
        </div>
      </div>
      <div className="w-full h-32 bg-muted flex items-center justify-center rounded-lg overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 opacity-50" />
        <span className="text-muted-foreground text-sm z-10 font-medium uppercase tracking-widest">
          Daily Acronym Decoder
        </span>
      </div>
    </header>
  );
}
