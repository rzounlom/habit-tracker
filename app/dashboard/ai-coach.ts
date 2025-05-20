"use server";

import { auth } from "@clerk/nextjs/server";
import { checkUserSubscription } from "@/lib/subscription"; // the helper you just built
import { db } from "@/lib/db";
import { generateHabitPrompt } from "@/lib/utils/prompts";
import { getPast7Days } from "@/lib/utils/dates";
import { openai } from "@/lib/openai"; // if you extracted it

export async function getAIHabitAdvice(): Promise<string | null> {
  const { userId } = await auth();
  console.log("✅ getAIHabitAdvice called for userId:", userId);

  if (!userId) return null;

  const user = await db.user.findUnique({ where: { id: userId } });
  const MAX_FREE_USES = 3;

  console.log("✅ getAIHabitAdvice called for user:", user);
  if (!user) return null;

  const isSubscribed = await checkUserSubscription(userId);
  const overLimit = user.aiPromptCount >= MAX_FREE_USES;

  // 🚫 Gating: If over free limit and NOT subscribed
  if (!isSubscribed && overLimit) {
    return `⚠️ You've reached your 3 free AI insights.\nUpgrade to Pro to unlock unlimited coaching.`;
  }

  // 🔍 Fetch habits + completions
  const habits = await db.habit.findMany({
    where: { userId },
    include: { completions: true },
  });

  const days = getPast7Days();
  const formattedHabits = habits.map((habit) => ({
    title: habit.title,
    days: days.map((d) =>
      habit.completions.some(
        (c) => new Date(c.date).setHours(0, 0, 0, 0) === d.setHours(0, 0, 0, 0)
      )
    ),
  }));

  const prompt = generateHabitPrompt(formattedHabits);

  try {
    // 🧠 Call OpenAI
    const res = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are a motivational habit coach helping users build routines.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    console.log("AI response:", {
      res,
      content: res.choices[0].message.content,
    });

    // ✅ Update prompt count if free user
    if (!isSubscribed) {
      await db.user.update({
        where: { id: userId },
        data: {
          aiPromptCount: { increment: 1 },
        },
      });
    }

    console.log("✅ AI response content:", res.choices[0].message.content);

    return res.choices[0].message.content;
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    return "⚠️ Failed to load insights. Try again later.";
  }
}
