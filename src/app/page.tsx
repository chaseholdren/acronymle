"use client";

import { useState, useEffect } from "react";
import { useGame } from "@/hooks/use-game";
import { useStats } from "@/hooks/use-stats";
import { GameHeader } from "@/components/game/game-header";
import { AcronymDisplay } from "@/components/game/acronym-display";
import { GuessGrid } from "@/components/game/guess-grid";
import { GuessInput } from "@/components/game/guess-input";
import { ResultsModal } from "@/components/game/results-modal";
import { HelpModal } from "@/components/game/help-modal";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { BarChart3 } from "lucide-react";

export default function Home() {
  const game = useGame();
  const { stats, recordGame } = useStats();
  const [showResults, setShowResults] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [hasShownAutoResults, setHasShownAutoResults] = useState(false);

  // Show help on first visit
  useEffect(() => {
    const hasPlayed = localStorage.getItem("acronymle-has-played");
    if (!hasPlayed) {
      setTimeout(() => {
        setShowHelp(true);
      }, 0);
      localStorage.setItem("acronymle-has-played", "true");
    }
  }, []);

  // Record game stats when finished
  useEffect(() => {
    if (game.isComplete && game.id && !hasShownAutoResults) {
      recordGame(game.id, game.isCorrect, game.guesses.length);
      
      // Delay opening modal for dramatic effect
      const timer = setTimeout(() => {
        setShowResults(true);
        setHasShownAutoResults(true);
      }, 1500);

      if (game.isCorrect) {
        toast.success("Brilliant! You've decoded the acronym.");
      } else {
        toast.error("Out of attempts! Try again tomorrow.");
      }

      return () => clearTimeout(timer);
    }
  }, [game.isComplete, game.id, game.isCorrect, game.guesses.length, recordGame, hasShownAutoResults]);

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
      <GameHeader 
        onShowStats={() => setShowResults(true)} 
        onShowHelp={() => setShowHelp(true)}
      />
      
      <div className="flex-1 w-full max-w-2xl mx-auto flex flex-col py-4">
        <AcronymDisplay 
          acronym={game.acronym} 
          words={game.words} 
        />
        
        <GuessGrid 
          guesses={game.guesses} 
          results={game.results} 
          words={game.words} 
        />
        
        {!game.isComplete && (
          <>
            <div className="mt-8 text-center text-sm font-medium text-muted-foreground">
              {5 - game.guesses.length} {5 - game.guesses.length === 1 ? "attempt" : "attempts"} remaining
            </div>
            <GuessInput 
              key={game.guesses.length}
              words={game.words}
              guesses={game.guesses}
              results={game.results}
              onSubmit={game.submitGuess}
              onHint={game.useHint}
              hintUsed={game.hintUsed}
              hint={game.hint}
              disabled={game.isComplete}
            />
          </>
        )}

        {game.isComplete && (
          <div className="mt-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <p className="text-muted-foreground font-medium mb-4">
              Come back tomorrow for a new challenge!
            </p>
            <Button onClick={() => setShowResults(true)} size="lg" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              View Results
            </Button>
          </div>
        )}
      </div>

      <ResultsModal 
        isOpen={showResults}
        onClose={() => setShowResults(false)}
        stats={stats}
        guesses={game.guesses}
        results={game.results}
        isCorrect={game.isCorrect}
        hintUsed={game.hintUsed}
      />

      <HelpModal 
        isOpen={showHelp}
        onClose={() => setShowHelp(false)}
      />
    </main>
  );
}
