import { NextResponse } from "next/server";
import acronyms from "@/data/acronyms.json";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const requestedDate = searchParams.get("date");
  
  // Use provided date or fallback to system local date (less likely to be tomorrow than UTC)
  const today = requestedDate || new Date().toLocaleDateString('en-CA');
  const acronymData = acronyms.find((a) => a.date === today);

  if (!acronymData) {
    return NextResponse.json(
      { error: "Acronym not found for " + today },
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
