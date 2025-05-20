import CoachCardWrapper from "@/components/CoachCardWrapper";
import { auth } from "@clerk/nextjs/server";
import { checkUserSubscription } from "@/lib/subscription";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function AIInsightsPage() {
  const { userId } = await auth();
  if (!userId) return redirect("/sign-in");

  const [user, isSubscribed] = await Promise.all([
    db.user.findUnique({ where: { id: userId } }),
    checkUserSubscription(userId),
  ]);

  const hasUsedAllFreeInsights = (user?.aiPromptCount ?? 0) >= 3;

  if (!isSubscribed && hasUsedAllFreeInsights) {
    redirect("/dashboard/upgrade");
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">🧠 Habit AI Coach</h1>
      <CoachCardWrapper
        initialPromptCount={user?.aiPromptCount ?? 0}
        isSubscribed={isSubscribed}
      />
    </div>
  );
}
