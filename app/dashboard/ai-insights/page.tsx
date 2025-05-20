import CoachCardWrapper from "@/components/CoachCardWrapper";
import { auth } from "@clerk/nextjs/server";
import { checkUserSubscription } from "@/lib/subscription";
import { redirect } from "next/navigation";

export default async function AIInsightsPage() {
  const { userId } = await auth();

  const isSubscribed = await checkUserSubscription(userId!);

  if (!isSubscribed) {
    redirect("/dashboard/upgrade");
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">🧠 Habit AI Coach</h1>
      <CoachCardWrapper />
    </div>
  );
}
