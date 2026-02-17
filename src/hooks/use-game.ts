"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

export interface WordInfo {
  isFiller: boolean;
  word?: string;
}

export interface GameState {
  id: string | null;
  acronym: string | null;
  words: WordInfo[];
  hint: string | null;
  guesses: string[][];
  results: ("green" | "bright-yellow" | "faded-yellow" | "gray")[][];
  hintUsed: boolean;
  isComplete: boolean;
  isCorrect: boolean;
  isLoading: boolean;
}

export function useGame() {
  const [state, setState] = useState<GameState>({
    id: null,
    acronym: null,
    words: [],
    hint: null,
    guesses: [],
    results: [],
    hintUsed: false,
    isComplete: false,
    isCorrect: false,
    isLoading: true,
  });

  // Load initial data and restore from sessionStorage
  useEffect(() => {
    async function initGame() {
      try {
        const res = await fetch("/api/daily-acronym");
        if (!res.ok) throw new Error("Failed to fetch daily acronym");
        const data = await res.json();

        const savedSession = sessionStorage.getItem(`acronymle-session-${data.id}`);
        if (savedSession) {
          setState({ ...JSON.parse(savedSession), isLoading: false });
        } else {
          setState((prev) => ({
            ...prev,
            id: data.id,
            acronym: data.acronym,
            words: data.words,
            hint: data.hint,
            isLoading: false,
          }));
        }
      } catch {
        toast.error("Error loading game. Please try again later.");
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    }

    initGame();
  }, []);

  // Persist state to sessionStorage
  useEffect(() => {
    if (state.id && !state.isLoading) {
      sessionStorage.setItem(`acronymle-session-${state.id}`, JSON.stringify(state));
    }
  }, [state]);

  const submitGuess = async (guess: string[]) => {
    if (state.isComplete || state.isLoading) return;
    if (guess.some((word) => !word.trim())) {
      toast.error("Please fill in all words.");
      return;
    }

    try {
      const res = await fetch("/api/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: state.id, guess }),
      });

      if (!res.ok) throw new Error("Validation failed");
      const data = await res.json();

      const newGuesses = [...state.guesses, guess];
      const newResults = [...state.results, data.results];
      const isCorrect = data.isCorrect;
      const isComplete = isCorrect || newGuesses.length >= 5;

      setState((prev) => ({
        ...prev,
        guesses: newGuesses,
        results: newResults,
        isCorrect,
        isComplete,
      }));

      return { isCorrect, results: data.results };
    } catch {
      toast.error("Error validating guess. Please try again.");
    }
  };

  const useHint = () => {
    if (state.hintUsed || state.isComplete) return;
    setState((prev) => ({ ...prev, hintUsed: true }));
  };

  return {
    ...state,
    submitGuess,
    useHint,
  };
}
