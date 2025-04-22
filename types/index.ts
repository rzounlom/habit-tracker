import { Completion, Habit } from "@prisma/client";

export type HabitWithCompletions = Habit & {
  completions: Completion[];
};
