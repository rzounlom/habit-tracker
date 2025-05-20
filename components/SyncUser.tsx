"use client";

import { useEffect } from "react";

export default function SyncUser() {
  useEffect(() => {
    fetch("/api/sync-user", { method: "POST" });
  }, []);

  return null; // no UI needed
}
