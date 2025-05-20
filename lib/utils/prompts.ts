import { db } from "@/lib/db";

export function generateHabitPrompt(
  habits: {
    title: string;
    days: boolean[];
  }[]
) {
  const habitDataString = JSON.stringify(habits, null, 2);

  return `
  You are a motivational habit coach. Analyze this user's past 7 days of habit completion data and give helpful, friendly feedback and suggestions.
  
  Each habit shows 7 days of recent completion data, with \`true\` = completed and \`false\` = missed.
  
  Respond in a positive, uplifting tone. Identify patterns, trends, and areas for improvement, and give 1–2 actionable suggestions for each habit.
  
  Here is the user's habit data:
  
  ${habitDataString}
  
  Please generate your response in plain text with line breaks between insights.
  `.trim();
}
