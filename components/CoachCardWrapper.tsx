"use client";

import { useEffect, useState } from "react";

import CoachCard from "./CoachCard";

interface CoachCardWrapperProps {
  initialPromptCount: number;
  isSubscribed: boolean;
}

export default function CoachCardWrapper({
  initialPromptCount,
  isSubscribed,
}: CoachCardWrapperProps) {
  const [advice, setAdvice] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [promptCount, setPromptCount] = useState(initialPromptCount);

  const fetchAdvice = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai-advice");
      const data = await res.json();
      setAdvice(data.advice);

      if (!isSubscribed) {
        setPromptCount((prev) => prev + 1);
      }
    } catch (err) {
      console.error("Failed to fetch AI advice:", err);
      setAdvice("⚠️ Failed to load insights. Try again later.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  const canRegenerate = isSubscribed || promptCount < 5;

  return (
    <div className="space-y-4 relative">
      {/* sticky header and button */}
      <div className="sticky top-0 z-10 bg-white pb-2 pt-1">
        <div className="flex items-center justify-between gap-4 border-b border-gray-200 pb-2">
          <div>
            {!isSubscribed ? (
              <span className="text-sm text-gray-600">
                You’ve used {promptCount} of 5 free insights
              </span>
            ) : (
              <span className="text-sm text-green-600 font-medium">
                ✅ Unlimited insights (Pro)
              </span>
            )}
          </div>

          {canRegenerate && (
            <button
              onClick={() => {
                setRefreshing(true);
                fetchAdvice();
              }}
              disabled={refreshing}
              className={`flex items-center gap-2 px-4 py-2 rounded text-white transition-all duration-300 ease-in-out ${
                refreshing
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
              }`}
            >
              {refreshing && (
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
              )}
              {refreshing ? "Regenerating..." : "Regenerate Advice"}
            </button>
          )}
        </div>
      </div>

      {/* AI output */}
      <CoachCard advice={loading ? null : advice} />
    </div>
  );
}
