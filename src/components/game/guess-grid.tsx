"use client";

import { cn } from "@/lib/utils";

interface GuessGridProps {
  guesses: string[][];
  results: ("green" | "yellow" | "gray")[][];
  wordCount: number;
}

export function GuessGrid({ guesses, results, wordCount }: GuessGridProps) {
  const emptyRows = Array.from({ length: Math.max(0, 5 - guesses.length) });

  return (
    <div className="flex flex-col gap-2 w-full max-w-2xl mx-auto px-4">
      {guesses.map((guess, i) => (
        <div key={i} className="flex gap-2 w-full">
          {guess.slice(0, wordCount).map((word, j) => (
            <div
              key={j}
              className={cn(
                "flex-1 h-12 flex items-center justify-center rounded-md border text-sm font-medium uppercase truncate px-1",
                results[i][j] === "green" && "bg-green-500 border-green-600 text-white",
                results[i][j] === "yellow" && "bg-yellow-500 border-yellow-600 text-white",
                results[i][j] === "gray" && "bg-gray-400 border-gray-500 text-white"
              )}
            >
              {word}
            </div>
          ))}
        </div>
      ))}
      {emptyRows.map((_, i) => (
        <div key={i} className="flex gap-2 w-full opacity-20">
          {Array.from({ length: wordCount }).map((_, j) => (
            <div
              key={j}
              className="flex-1 h-12 border-2 border-dashed border-muted-foreground/30 rounded-md"
            />
          ))}
        </div>
      ))}
    </div>
  );
}
