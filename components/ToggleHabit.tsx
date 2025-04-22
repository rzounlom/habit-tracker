"use client";

import { SaveButton } from "./Buttons";
import { toast } from "sonner";
import { toggleHabit } from "@/app/dashboard/actions";
import { useTransition } from "react";

export default function ToggleHabit({
  habitId,
  completed,
}: {
  habitId: string;
  completed: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  const handleTrasition = () =>
    startTransition(async () => {
      const res = await toggleHabit(habitId);
      if (!res.success && res.error) {
        toast.error(res.error);
      }
    });

  return (
    <SaveButton
      onClick={() => handleTrasition()}
      disabled={isPending}
      className={`w-5 h-5 border-2 rounded-full ${
        completed ? "bg-green-500 border-green-600" : "border-gray-400"
      } transition-all hover:cursor-pointer`}
      type="button"
    >
      {completed ? "Completed today" : "Mark as complete"}
    </SaveButton>
  );
}
