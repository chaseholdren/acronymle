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

  return NextResponse.json({
    id: acronymData.id,
    acronym: acronymData.acronym,
    wordCount: acronymData.phrase.length,
    hint: acronymData.category,
  });
}
