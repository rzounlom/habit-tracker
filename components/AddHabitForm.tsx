"use client";

import { useActionState, useEffect, useRef } from "react";

import { SaveButton } from "./Buttons";
import { addHabit } from "@/app/dashboard/actions";
import { toast } from "sonner";

const initialState = { success: false, error: "", timestamp: 0 };

export function AddHabitForm() {
  const [formState, formAction] = useActionState(addHabit, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  // Toast + reset input on success
  useEffect(() => {
    if (formState.success) {
      toast.success("Habit added!");
      formRef.current?.reset();
    }

    if (formState.error) {
      toast.error(formState.error);
    }
  }, [formState]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="flex flex-col sm:flex-row items-center gap-3 bg-white border px-4 py-4 rounded-lg shadow-sm mb-6"
    >
      <input
        type="text"
        name="title"
        placeholder="e.g. Meditate, Workout, Read"
        className="w-full sm:w-auto flex-1 border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
        required
      />
      <SaveButton type="submit" />
    </form>
  );
}
