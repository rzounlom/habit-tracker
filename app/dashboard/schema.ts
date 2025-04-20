// app/dashboard/schema.ts
import { z } from "zod";

export const habitSchema = z.object({
  title: z
    .string()
    .min(2, "Habit must be at least 2 characters")
    .max(100, "Habit must be under 100 characters"),
});

export type HabitInput = z.infer<typeof habitSchema>;
