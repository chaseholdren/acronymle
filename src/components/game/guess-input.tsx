"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lightbulb, Send } from "lucide-react";

import { WordInfo } from "@/hooks/use-game";

interface GuessInputProps {
  words: WordInfo[];
  onSubmit: (guess: string[]) => void;
  onHint: () => void;
  hintUsed: boolean;
  hint: string | null;
  disabled: boolean;
}

export function GuessInput({ 
  words, 
  onSubmit, 
  onHint, 
  hintUsed, 
  hint,
  disabled 
}: GuessInputProps) {
  const [values, setValues] = useState<string[]>(
    words.map(w => w.isFiller ? (w.word || "") : "")
  );
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (words[index].isFiller) return;
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      let nextIndex = index + 1;
      while (nextIndex < words.length && words[nextIndex].isFiller) {
        nextIndex++;
      }
      
      if (nextIndex < words.length) {
        inputRefs.current[nextIndex]?.focus();
      } else {
        handleSubmit();
      }
    } else if (e.key === "Backspace" && !values[index] && index > 0) {
      let prevIndex = index - 1;
      while (prevIndex >= 0 && words[prevIndex].isFiller) {
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
    setValues(words.map(w => w.isFiller ? (w.word || "") : ""));
    
    // Find first non-filler index to focus
    const firstInputIdx = words.findIndex(w => !w.isFiller);
    if (firstInputIdx !== -1) {
      inputRefs.current[firstInputIdx]?.focus();
    }
  };

  if (words.length === 0) return null;

  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl mx-auto px-4 mt-8 pb-12">
      <div className="flex flex-wrap gap-2 justify-center">
        {values.map((val, i) => (
          <Input
            key={i}
            ref={(el) => { inputRefs.current[i] = el; }}
            value={val}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className={`w-32 h-12 text-center uppercase font-medium ${
              words[i].isFiller ? "bg-muted text-muted-foreground opacity-50" : ""
            }`}
            placeholder={words[i].isFiller ? "" : `Word ${i + 1}`}
            disabled={disabled || words[i].isFiller}
            autoFocus={!words[i].isFiller && words.slice(0, i).every(w => w.isFiller)}
          />
        ))}
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
