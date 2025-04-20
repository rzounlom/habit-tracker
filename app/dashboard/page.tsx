// app/dashboard/page.tsx
import { AddHabitForm } from "@/components/AddHabitForm";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) return null;

  const habits = await db.habit.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Habits</h1>

      {/* 🔹 Show Add Habit form */}
      <AddHabitForm />

      {/* 🔹 List user's habits */}
      <ul className="space-y-2">
        {habits.length === 0 ? (
          <div className="text-center text-gray-500 italic p-4 border border-dashed rounded bg-gray-50">
            No habits yet. Add one to get started!
          </div>
        ) : (
          habits.map((habit) => (
            <li
              key={habit.id}
              className="bg-white border px-4 py-2 rounded shadow-sm animate-fade-in"
            >
              {habit.title}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
