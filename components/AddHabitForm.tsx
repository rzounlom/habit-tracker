"use client";

import { useActionState, useEffect } from "react";

import { SaveButton } from "./Buttons";
import { addHabit } from "@/app/dashboard/actions";
import { toast } from "sonner";

const initialState = { success: false, error: "", timestamp: 0 };

export function AddHabitForm() {
  const [formState, formAction] = useActionState(addHabit, initialState);

  // Show toast based on result
  useEffect(() => {
    if (formState.success) {
      toast.success("Habit added!");
    }

    if (formState.error) {
      toast.error(formState.error);
    }
  }, [formState]);

  return (
    <form action={formAction} className="flex gap-2 mb-6">
      <input
        type="text"
        name="title"
        placeholder="e.g. Meditate"
        className="flex-1 border px-4 py-2 rounded"
        required
      />
      <SaveButton />
    </form>
  );
}
