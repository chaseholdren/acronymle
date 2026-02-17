import { NextResponse } from "next/server";
import acronyms from "@/data/acronyms.json";
import { normalizeWord } from "@/lib/utils";
import levenshtein from "js-levenshtein";

type Result = "green" | "bright-yellow" | "faded-yellow" | "gray";

export async function POST(request: Request) {
  try {
    const { date, guess } = await request.json();

    if (!date || !Array.isArray(guess)) {
      return NextResponse.json(
        { error: "Invalid request payload" },
        { status: 400 }
      );
    }

    const acronymData = acronyms.find((a) => a.date === date);

    if (!acronymData) {
      return NextResponse.json(
        { error: "Acronym not found for the specified date" },
        { status: 404 }
      );
    }

    const targetPhrase = acronymData.phrase;
    const normalizedTarget = targetPhrase.map(normalizeWord);
    const normalizedGuess = guess.map(normalizeWord);

    const results: Result[] = new Array(normalizedTarget.length).fill("gray");
    
    const targetUsed = new Array(normalizedTarget.length).fill(false);
    const guessUsed = new Array(normalizedTarget.length).fill(false);

    // First pass: Green (Exact matches)
    for (let i = 0; i < normalizedTarget.length; i++) {
      if (normalizedGuess[i] === normalizedTarget[i]) {
        results[i] = "green";
        targetUsed[i] = true;
        guessUsed[i] = true;
      }
    }

    // Second pass: Yellow (handle exact-but-wrong-position, and fuzzy typos)
    for (let i = 0; i < normalizedTarget.length; i++) {
      if (guessUsed[i]) continue;

      let bestMatch: { result: Result; distance: number; index: number } = {
        result: "gray",
        distance: Infinity,
        index: -1,
      };

      for (let j = 0; j < normalizedTarget.length; j++) {
        if (targetUsed[j]) continue;

        // Case 1: Exact match, wrong position
        if (normalizedGuess[i] === normalizedTarget[j]) {
          if (bestMatch.distance > 0) { // Prioritize this over fuzzy matches
            bestMatch = { result: "bright-yellow", distance: 0, index: j };
          }
        }
        
        // Case 2: Fuzzy match
        const distance = levenshtein(normalizedGuess[i], normalizedTarget[j]);
        if (distance < bestMatch.distance) {
          if (distance === 1) {
            bestMatch = { result: "bright-yellow", distance: 1, index: j };
          } else if (distance === 2) {
            bestMatch = { result: "faded-yellow", distance: 2, index: j };
          }
        }
      }

      if (bestMatch.index !== -1) {
        results[i] = bestMatch.result;
        targetUsed[bestMatch.index] = true;
      }
    }

    const isCorrect = results.every((r) => r === "green");

    return NextResponse.json({
      results,
      isCorrect,
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
