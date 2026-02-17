"use client";

import { cn } from "@/lib/utils";
import { WordInfo } from "@/hooks/use-game";

interface GuessGridProps {
  guesses: string[][];
  results: ("green" | "bright-yellow" | "faded-yellow" | "gray")[][];
  words: WordInfo[];
}

export function GuessGrid({ guesses, results, words }: GuessGridProps) {
  if (guesses.length === 0) return null;

  return (
    <div className="flex flex-col gap-2 w-full max-w-2xl mx-auto px-4 mt-4">
      {guesses.map((guess, i) => (
        <div key={i} className="flex gap-2 w-full">
          {guess.map((word, j) => {
            const result = results[i][j];
            const isBrightYellow = result === "bright-yellow";
            const isFadedYellow = result === "faded-yellow";

            let tooltip = "";
            if (isBrightYellow) tooltip = "Very Close! (Correct word in the wrong spot, or 1 letter off)";
            if (isFadedYellow) tooltip = "Sorta Close (2 letters off)";

            return (
              <div
                key={j}
                title={tooltip}
                className={cn(
                  "flex-1 h-12 flex items-center justify-center rounded-md border text-xs sm:text-sm font-medium uppercase truncate px-1",
                  result === "green" && "bg-green-500 border-green-600 text-white",
                  isBrightYellow && "bg-yellow-400 border-yellow-500 text-white",
                  isFadedYellow && "bg-yellow-400/50 border-yellow-500/50 text-white",
                  result === "gray" && "bg-gray-400 border-gray-500 text-white",
                  words[j]?.isFiller && "opacity-70"
                )}
              >
                {word}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
