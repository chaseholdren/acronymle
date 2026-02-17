import { NextResponse } from "next/server";
import acronyms from "@/data/acronyms.json";

export async function GET() {
  // Use UTC date to determine the daily acronym
  const today = new Date().toISOString().split("T")[0];
  const acronymData = acronyms.find((a) => a.date === today);

  if (!acronymData) {
    return NextResponse.json(
      { error: "Acronym not found for today" },
      { status: 404 }
    );
  }

  // Determine which words are fillers
  const acronym = acronymData.acronym;
  const phrase = acronymData.phrase;
  let acronymPtr = 0;
  
  const words = phrase.map((word) => {
    const isMatch = acronymPtr < acronym.length && 
                   word[0].toUpperCase() === acronym[acronymPtr].toUpperCase();
    if (isMatch) {
      acronymPtr++;
      return { isFiller: false };
    } else {
      return { isFiller: true, word: word };
    }
  });

  return NextResponse.json({
    id: acronymData.id,
    acronym: acronymData.acronym,
    words: words,
    hint: acronymData.category,
  });
}
