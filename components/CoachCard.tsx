"use client";

interface CoachCardProps {
  advice: string | null;
}

export default function CoachCard({ advice }: CoachCardProps) {
  if (!advice) {
    return (
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg shadow-sm mb-6 animate-pulse">
        <p className="text-blue-700 text-sm">Loading insights...</p>
      </div>
    );
  }

  // Check if advice is actually a "locked" message
  const isLocked = advice.startsWith("⚠️");

  if (isLocked) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg shadow-sm mb-6">
        <h2 className="text-sm font-semibold text-yellow-700 mb-2">
          🚧 Habit Coach Locked
        </h2>
        <p className="text-sm text-yellow-700 whitespace-pre-line mb-4">
          {advice}
        </p>
        <a
          href="/dashboard/upgrade"
          className="inline-block px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
        >
          Upgrade to Pro
        </a>
      </div>
    );
  }

  // Normal advice flow
  return (
    <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg shadow-sm mb-6">
      <h2 className="text-lg font-semibold text-blue-700 mb-2">
        🧠 AI Habit Coach
      </h2>
      <p className="text-sm text-blue-800 whitespace-pre-line leading-relaxed">
        {advice}
      </p>
    </div>
  );
}
