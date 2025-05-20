"use client";

import { useEffect, useState } from "react";

import CoachCard from "./CoachCard";

export default function CoachCardWrapper() {
  const [advice, setAdvice] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdvice = async () => {
      try {
        const res = await fetch("/api/ai-advice");
        const data = await res.json();
        setAdvice(data.advice);
      } catch (err) {
        console.error("Failed to fetch AI advice:", err);
        setAdvice("⚠️ Failed to load insights. Try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdvice();
  }, []);

  return <CoachCard advice={loading ? null : advice} />;
}
