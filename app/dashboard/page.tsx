import HabitList from "@/components/HabitList";
import HabitSkeletonList from "@/components/HabitSkeletonList";
import { Suspense } from "react";
// app/dashboard/page.tsx
// import { AddHabitForm } from "@/components/AddHabitForm";
// import { CheckIcon } from "@heroicons/react/24/solid"; // if using Heroicons
// import ToggleHabit from "@/components/ToggleHabit";
import { auth } from "@clerk/nextjs/server";
// import { calculateStreak } from "@/lib/utils/streak";
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
    <Suspense fallback={<HabitSkeletonList />}>
      <HabitList habits={habits} />
    </Suspense>
  );
}
