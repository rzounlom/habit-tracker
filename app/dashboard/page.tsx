import HabitList from "@/components/HabitList";
import HabitSkeletonList from "@/components/HabitSkeletonList";
import Link from "next/link";
import { Suspense } from "react";
import SyncUser from "@/components/SyncUser";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) return null;

  const habits = await db.habit.findMany({
    where: { userId },
    include: {
      completions: true, // all completions, not just today's
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <SyncUser />
      <Suspense fallback={<HabitSkeletonList />}>
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg shadow-sm mb-6">
          <h2 className="text-lg font-semibold text-blue-700 mb-2">
            🧠 Try AI Habit Coach
          </h2>
          <p className="text-sm text-blue-800 mb-4">
            Let GPT analyze your weekly patterns and give you personalized tips
            to stay consistent.
          </p>
          <Link
            href="/dashboard/ai-insights"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            View AI Insights
          </Link>
        </div>
        <HabitList habits={habits} />
      </Suspense>
    </>
  );
}
