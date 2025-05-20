import { NextResponse } from "next/server";
// app/api/ai-advice/route.ts
import { getAIHabitAdvice } from "@/app/dashboard/ai-coach";

export async function GET() {
  const advice = await getAIHabitAdvice();
  return NextResponse.json({ advice: advice ?? "No advice found." });
}
