"use client";

import { useEffect } from "react";
import { useGame } from "@/hooks/use-game";
import { useStats } from "@/hooks/use-stats";
import { GameHeader } from "@/components/game/game-header";
import { AcronymDisplay } from "@/components/game/acronym-display";
import { GuessGrid } from "@/components/game/guess-grid";
import { GuessInput } from "@/components/game/guess-input";
import { toast } from "sonner";

export default function Home() {
  const game = useGame();
  const { stats, recordGame } = useStats();

  // Record game stats when finished
  useEffect(() => {
    if (game.isComplete && game.id) {
      recordGame(game.id, game.isCorrect, game.guesses.length);
      
      if (game.isCorrect) {
        toast.success("Brilliant! You've decoded the acronym.");
      } else {
        toast.error("Out of attempts! Try again tomorrow.");
      }
    }
  }, [game.isComplete, game.id, game.isCorrect, game.guesses.length, recordGame]);

  if (game.isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-12 w-48 bg-muted rounded-md" />
          <div className="h-4 w-32 bg-muted rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-background">
      <GameHeader />
      
      <div className="flex-1 w-full max-w-2xl mx-auto flex flex-col py-4">
        <AcronymDisplay 
          acronym={game.acronym} 
          wordCount={game.wordCount} 
        />
        
        <GuessGrid 
          guesses={game.guesses} 
          results={game.results} 
          wordCount={game.wordCount} 
        />
        
        {!game.isComplete && (
          <GuessInput 
            wordCount={game.wordCount}
            onSubmit={game.submitGuess}
            onHint={game.useHint}
            hintUsed={game.hintUsed}
            hint={game.hint}
            disabled={game.isComplete}
          />
        )}

        {game.isComplete && (
          <div className="mt-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <p className="text-muted-foreground font-medium mb-4">
              Come back tomorrow for a new challenge!
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
