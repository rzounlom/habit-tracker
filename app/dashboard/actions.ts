"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { habitSchema } from "./schema";
import { revalidatePath } from "next/cache";

export interface AddHabbitFormState {
  success: boolean;
  error: string;
  timestamp?: number;
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
    return { success: false, error: errorMsg };
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
