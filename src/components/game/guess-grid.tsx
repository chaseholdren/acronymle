"use client";

import { cn } from "@/lib/utils";
import { WordInfo } from "@/hooks/use-game";

interface GuessGridProps {
  guesses: string[][];
  results: ("green" | "yellow" | "gray")[][];
  words: WordInfo[];
}

export function GuessGrid({ guesses, results, words }: GuessGridProps) {
  const emptyRows = Array.from({ length: Math.max(0, 5 - guesses.length) });

  return (
    <div className="flex flex-col gap-2 w-full max-w-2xl mx-auto px-4">
      {guesses.map((guess, i) => (
        <div key={i} className="flex gap-2 w-full">
          {guess.map((word, j) => (
            <div
              key={j}
              className={cn(
                "flex-1 h-12 flex items-center justify-center rounded-md border text-xs sm:text-sm font-medium uppercase truncate px-1",
                results[i][j] === "green" && "bg-green-500 border-green-600 text-white",
                results[i][j] === "yellow" && "bg-yellow-500 border-yellow-600 text-white",
                results[i][j] === "gray" && "bg-gray-400 border-gray-500 text-white",
                words[j]?.isFiller && "opacity-70"
              )}
            >
              {word}
            </div>
          ))}
        </div>
      ))}
      {emptyRows.map((_, i) => (
        <div key={i} className="flex gap-2 w-full">
          {words.map((w, j) => (
            <div
              key={j}
              className={cn(
                "flex-1 h-12 flex items-center justify-center rounded-md border text-xs sm:text-sm font-medium uppercase truncate px-1 opacity-20",
                w.isFiller ? "border-solid bg-muted text-muted-foreground" : "border-2 border-dashed border-muted-foreground/30"
              )}
            >
              {w.isFiller ? w.word : ""}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
