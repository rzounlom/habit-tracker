interface CoachCardProps {
  advice: string | null;
}

export default function CoachCard({ advice }: CoachCardProps) {
  // 👉 While loading, show shimmer
  if (!advice) {
    return (
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg shadow-sm mb-6 animate-pulse space-y-2">
        <div className="h-4 w-1/3 bg-blue-200 rounded"></div>
        <div className="h-3 w-full bg-blue-100 rounded"></div>
        <div className="h-3 w-11/12 bg-blue-100 rounded"></div>
        <div className="h-3 w-5/6 bg-blue-100 rounded"></div>
        <div className="h-3 w-2/3 bg-blue-100 rounded"></div>
      </div>
    );
  }

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

  // ✅ Normal advice display
  return (
    <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg shadow-sm mb-6 animate-fade-in">
      <h2 className="text-lg font-semibold text-blue-700 mb-2">
        🧠 AI Habit Coach
      </h2>
      <p className="text-sm text-blue-800 whitespace-pre-line leading-relaxed">
        {advice}
      </p>
    </div>
  );
}
