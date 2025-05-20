import { AddHabitForm } from "./AddHabitForm";
import { CheckIcon } from "@heroicons/react/24/solid";
import { HabitWithCompletions } from "@/types";
import ToggleHabit from "./ToggleHabit";
import { calculateStreak } from "@/lib/utils/streak";
import { getPast7Days } from "@/lib/utils/dates";

interface HabitListProps {
  habits: HabitWithCompletions[];
}

export default async function HabitList({ habits }: HabitListProps) {
  const past7Days = getPast7Days();

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Habits</h1>
      {/* 🔹 Show Add Habit form */}
      <AddHabitForm />

      {/* 🔹 List user's habits */}
      <ul className="space-y-2">
        {habits.length === 0 ? (
          <div className="text-center text-gray-500 italic p-6 border-2 border-dashed rounded-lg bg-gray-50 shadow-inner">
            No habits yet. Add one above to get started 💪
          </div>
        ) : (
          habits.map((habit) => {
            const completedToday = habit.completions.some((c) => {
              const d = new Date(c.date).setHours(0, 0, 0, 0);
              return d === new Date().setHours(0, 0, 0, 0);
            });

            const streak = calculateStreak(
              habit.completions.map((c) => c.date)
            );

            return (
              <li
                key={habit.id}
                className="group flex items-center justify-between gap-4 bg-white border px-4 py-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in"
              >
                <div className="flex items-center gap-3">
                  <ToggleHabit habitId={habit.id} completed={completedToday} />

                  <div className="flex flex-col">
                    <span
                      className={`text-base font-medium ${
                        completedToday
                          ? "text-gray-400 line-through"
                          : "text-gray-800"
                      }`}
                    >
                      {habit.title}
                    </span>

                    <span className="text-xs text-gray-400 group-hover:text-gray-500 transition">
                      {completedToday ? "Completed today" : "Not completed yet"}
                    </span>
                  </div>

                  {/* ✅ Animated checkmark icon */}
                  {completedToday && (
                    <CheckIcon className="w-4 h-4 text-green-500 animate-pop-in ml-1" />
                  )}
                </div>
                {/* Weekly grid */}
                <div className="flex gap-1">
                  {past7Days.map((date, idx) => {
                    const isComplete = habit.completions.some((c) => {
                      const cDate = new Date(c.date).setHours(0, 0, 0, 0);
                      return cDate === date.setHours(0, 0, 0, 0);
                    });

                    return (
                      <div
                        key={idx}
                        className={`w-4 h-4 rounded-sm ${
                          isComplete ? "bg-green-500" : "bg-gray-200"
                        } animate-fade-up`}
                        title={date.toDateString()}
                      />
                    );
                  })}
                </div>

                {/* 🔥 Streak with pulse on update */}
                <div
                  className="text-sm font-semibold text-orange-500 flex items-center gap-1 animate-pulse-once"
                  title="Current streak"
                >
                  🔥 {streak}
                </div>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}
