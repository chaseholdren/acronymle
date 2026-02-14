import { NextResponse } from "next/server";
import acronyms from "@/data/acronyms.json";
import { normalizeWord } from "@/lib/utils";

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

    const results: ("green" | "yellow" | "gray")[] = new Array(normalizedTarget.length).fill("gray");
    
    // To handle Yellow logic correctly, we need to track which words from target are already "used"
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

    // Second pass: Yellow (Present but wrong position)
    for (let i = 0; i < normalizedTarget.length; i++) {
      if (guessUsed[i]) continue;

      for (let j = 0; j < normalizedTarget.length; j++) {
        if (!targetUsed[j] && normalizedGuess[i] === normalizedTarget[j]) {
          results[i] = "yellow";
          targetUsed[j] = true;
          break;
        }
      }
    }

    const isCorrect = results.every((r) => r === "green");

    return NextResponse.json({
      results,
      isCorrect,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
