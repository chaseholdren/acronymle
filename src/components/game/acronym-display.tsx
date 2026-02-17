"use client";

import { WordInfo } from "@/hooks/use-game";

interface AcronymDisplayProps {
  acronym: string | null;
  words: WordInfo[];
}

export function AcronymDisplay({ acronym, words }: AcronymDisplayProps) {
  if (!acronym) return null;

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <div className="flex gap-2">
        {acronym.split("").map((letter, i) => (
          <div
            key={i}
            className="w-12 h-16 flex items-center justify-center border-2 border-primary rounded-md text-3xl font-bold bg-primary/5"
          >
            {letter}
          </div>
        ))}
      </div>
      <div className="flex gap-1">
        {words.map((_, i) => (
          <div key={i} className="h-1 w-8 bg-muted rounded-full" />
        ))}
      </div>
    </div>
  );
}
