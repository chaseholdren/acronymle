"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lightbulb, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { WordInfo } from "@/hooks/use-game";

interface GuessInputProps {
  words: WordInfo[];
  guesses: string[][];
  results: ("green" | "bright-yellow" | "faded-yellow" | "gray")[][];
  onSubmit: (guess: string[]) => void;
  onHint: () => void;
  hintUsed: boolean;
  hint: string | null;
  disabled: boolean;
}

export function GuessInput({ 
  words, 
  guesses,
  results,
  onSubmit, 
  onHint, 
  hintUsed, 
  hint,
  disabled 
}: GuessInputProps) {
  // Helper to get pre-filled value for an index
  const getPrefilledValue = (index: number) => {
    if (words[index].isFiller) return words[index].word || "";
    
    // Check if this word was correctly guessed in any previous attempt
    for (let i = 0; i < results.length; i++) {
      if (results[i][index] === "green") {
        return guesses[i][index];
      }
    }
    return "";
  };

  const isAlreadyCorrect = (index: number) => {
    return results.some(row => row[index] === "green");
  };

  const [values, setValues] = useState<string[]>(
    words.map((_, i) => getPrefilledValue(i))
  );
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (words[index].isFiller || isAlreadyCorrect(index)) return;
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      let nextIndex = index + 1;
      while (nextIndex < words.length && (words[nextIndex].isFiller || isAlreadyCorrect(nextIndex))) {
        nextIndex++;
      }
      
      if (nextIndex < words.length) {
        inputRefs.current[nextIndex]?.focus();
      } else {
        handleSubmit();
      }
    } else if (e.key === "Backspace" && !values[index] && index > 0) {
      let prevIndex = index - 1;
      while (prevIndex >= 0 && (words[prevIndex].isFiller || isAlreadyCorrect(prevIndex))) {
        prevIndex--;
      }
      
      if (prevIndex >= 0) {
        inputRefs.current[prevIndex]?.focus();
      }
    }
  };

  const handleSubmit = () => {
    if (disabled || values.some(v => !v.trim())) return;
    onSubmit(values);
  };

  if (words.length === 0) return null;

  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl mx-auto px-4 mt-8 pb-12">
      <div className="flex flex-wrap gap-2 justify-center">
        {values.map((val, i) => {
          const filler = words[i].isFiller;
          const correct = isAlreadyCorrect(i);
          return (
            <Input
              key={i}
              ref={(el) => { inputRefs.current[i] = el; }}
              value={val}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className={cn(
                "w-32 h-12 text-center uppercase font-medium",
                filler && "bg-muted text-muted-foreground opacity-50",
                correct && "bg-green-50/50 border-green-200 text-green-700"
              )}
              placeholder={filler ? "" : `Word ${i + 1}`}
              disabled={disabled || filler || correct}
              autoFocus={!filler && !correct && words.slice(0, i).every((_w, idx) => words[idx].isFiller || isAlreadyCorrect(idx))}
            />
          );
        })}
      </div>
      
      <div className="flex justify-center gap-4 items-center mt-2">
        <Button 
          variant="outline" 
          size="lg" 
          onClick={onHint} 
          disabled={hintUsed || disabled}
          className="gap-2"
        >
          <Lightbulb className="h-4 w-4" />
          {hintUsed ? `Category: ${hint}` : "Get Hint"}
        </Button>
        <Button 
          size="lg" 
          onClick={handleSubmit} 
          disabled={disabled || values.some(v => !v.trim())}
          className="gap-2"
        >
          <Send className="h-4 w-4" />
          Submit Guess
        </Button>
      </div>
    </div>
  );
}
