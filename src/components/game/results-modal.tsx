"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { UserStats } from "@/hooks/use-stats";
import { toast } from "sonner";

interface ResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: UserStats;
  guesses: string[][];
  results: ("green" | "yellow" | "gray")[][];
  isCorrect: boolean;
  hintUsed: boolean;
  acronym: string | null;
}

export function ResultsModal({
  isOpen,
  onClose,
  stats,
  results,
  isCorrect,
  hintUsed,
  acronym,
}: ResultsModalProps) {
  const shareResults = () => {
    const emojiGrid = results
      .map((row) =>
        row
          .map((res) => (res === "green" ? "🟩" : res === "yellow" ? "🟨" : "⬛"))
          .join("")
      )
      .join("
");

    const score = isCorrect ? results.length : "X";
    const hintMarker = hintUsed ? " 💡" : "";
    const text = `Acronymle ${score}/5${hintMarker}

${emojiGrid}

Play at: acronymle.vercel.app`;

    navigator.clipboard.writeText(text);
    toast.success("Results copied to clipboard!");
  };

  const maxFreq = Math.max(...Object.values(stats.guessDistribution), 1);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">STATISTICS</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-4 gap-4 text-center py-4">
          <div>
            <div className="text-3xl font-bold">{stats.totalGames}</div>
            <div className="text-xs uppercase">Played</div>
          </div>
          <div>
            <div className="text-3xl font-bold">
              {stats.totalGames > 0 ? Math.round((stats.wins / stats.totalGames) * 100) : 0}
            </div>
            <div className="text-xs uppercase">Win %</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{stats.currentStreak}</div>
            <div className="text-xs uppercase">Current Streak</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{stats.maxStreak}</div>
            <div className="text-xs uppercase">Max Streak</div>
          </div>
        </div>

        <div className="py-4">
          <h3 className="text-sm font-bold uppercase mb-2">Guess Distribution</h3>
          <div className="flex flex-col gap-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="flex items-center gap-2">
                <span className="text-xs font-bold w-3">{num}</span>
                <div className="flex-1 h-5 bg-muted rounded-sm overflow-hidden">
                  <div 
                    className="h-full bg-primary flex items-center justify-end px-2 transition-all duration-500"
                    style={{ 
                      width: `${(stats.guessDistribution[num] / maxFreq) * 100}%`,
                      minWidth: stats.guessDistribution[num] > 0 ? "2rem" : "0"
                    }}
                  >
                    <span className="text-[10px] text-primary-foreground font-bold">
                      {stats.guessDistribution[num]}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center pt-4 border-t">
          <Button onClick={shareResults} className="w-full py-6 text-lg gap-2">
            <Share2 className="h-5 w-5" />
            SHARE
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
