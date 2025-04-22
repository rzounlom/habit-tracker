"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { habitSchema } from "./schema";
import { revalidatePath } from "next/cache";

export interface AddHabbitFormState {
  success: boolean;
  error: string;
  timestamp: number;
}

export async function addHabit(
  formState: AddHabbitFormState,
  formData: FormData
): Promise<AddHabbitFormState> {
  const { userId } = await auth();
  if (!userId) {
    console.error("userId is undefined during habit creation");
    return { success: false, error: "Unauthorized", timestamp: Date.now() };
  }

  const rawTitle = formData.get("title");
  const result = habitSchema.safeParse({ title: rawTitle });

  if (!result.success) {
    const errorMsg =
      result.error.flatten().fieldErrors.title?.[0] ?? "Invalid input";
    return { success: false, error: errorMsg, timestamp: Date.now() };
  }

  const { title } = result.data;

  if (!title || !userId) {
    return { success: false, error: "Missing data", timestamp: Date.now() };
  }

  try {
    await db.habit.create({
      data: {
        title: title,
        userId,
      },
    });

    revalidatePath("/dashboard");
    return { success: true, error: "", timestamp: Date.now() };
  } catch (error) {
    console.error("Error adding habit:", error);
    return {
      success: false,
      error: "Failed to create habit",
      timestamp: Date.now(),
    };
  }
}

export interface ToggleHabitFormState {
  success: boolean;
  error?: string;
  timestamp: number;
}

export async function toggleHabit(
  habitId: string
): Promise<ToggleHabitFormState> {
  const { userId } = await auth();
  if (!userId) {
    console.error("toggleHabit: Unauthorized access");
    return {
      success: false,
      error: "You must be logged in to toggle habits.",
      timestamp: Date.now(),
    };
  }

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existing = await db.completion.findFirst({
      where: {
        userId,
        habitId,
        date: today,
      },
    });

    if (existing) {
      await db.completion.delete({ where: { id: existing.id } });
    } else {
      await db.completion.create({
        data: {
          userId,
          habitId,
          date: today,
        },
      });
    }

    revalidatePath("/dashboard");

    return { success: true, error: "", timestamp: Date.now() };
  } catch (error) {
    console.error("toggleHabit: Failed to toggle habit", error);
    return {
      success: false,
      error:
        "Something went wrong while updating your habit. Please try again.",
      timestamp: Date.now(),
    };
  }
}
