// app/dashboard/page.tsx
import { auth } from "@clerk/nextjs/server";

export default async function DashboardPage() {
  const { userId } = await auth();
  console.log("User ID:", userId);
  if (!userId) return null;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome to your Habit Tracker 👋</h1>
      <p className="mt-2 text-gray-600">Start building habits that stick.</p>
    </div>
  );
}
