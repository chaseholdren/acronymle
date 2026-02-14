"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lightbulb, Send } from "lucide-react";

interface GuessInputProps {
  wordCount: number;
  onSubmit: (guess: string[]) => void;
  onHint: () => void;
  hintUsed: boolean;
  hint: string | null;
  disabled: boolean;
}

export function GuessInput({ 
  wordCount, 
  onSubmit, 
  onHint, 
  hintUsed, 
  hint,
  disabled 
}: GuessInputProps) {
  const [values, setValues] = useState<string[]>(Array(wordCount).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (index < wordCount - 1) {
        inputRefs.current[index + 1]?.focus();
      } else {
        handleSubmit();
      }
    } else if (e.key === "Backspace" && !values[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    if (disabled) return;
    onSubmit(values);
    setValues(Array(wordCount).fill(""));
    inputRefs.current[0]?.focus();
  };

  if (wordCount === 0) return null;

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
            className="w-32 h-12 text-center uppercase font-medium"
            placeholder={`Word ${i + 1}`}
            disabled={disabled}
            autoFocus={i === 0}
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
