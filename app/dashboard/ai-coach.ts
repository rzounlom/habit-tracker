import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { generateHabitPrompt } from "@/lib/utils/prompts";
import { getPast7Days } from "@/lib/utils/dates";
import { openai } from "@/lib/openai";

export async function getAIHabitAdvice(): Promise<string | null> {
  const { userId } = await auth();
  if (!userId) return null;

  const user = await db.user.findUnique({ where: { id: userId } });
  const MAX_FREE_USES = 3;

  if (!user) return null;

  const isSubscribed = await checkUserSubscription(userId); // implement this if using Stripe
  const overLimit = user.aiPromptCount >= MAX_FREE_USES;

  if (!isSubscribed && overLimit) {
    return `⚠️ You've reached your 3 free AI insights.\nUpgrade to Pro to unlock unlimited habit coaching.`;
  }

  // Proceed with prompt generation
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

  const res = await openai.chat.completions.create({
    model: "gpt-4", // or gpt-3.5-turbo
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

  // ✅ Update prompt count if not subscribed
  if (!isSubscribed) {
    await db.user.update({
      where: { id: userId },
      data: {
        aiPromptCount: { increment: 1 },
      },
    });
  }

  return res.choices[0].message.content;
}
