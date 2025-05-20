"use client";

import { useState } from "react";

export default function PricingToggleCTA() {
  const [plan, setPlan] = useState<"monthly" | "annual">("monthly");

  const price = plan === "monthly" ? "$9/month" : "$90/year (2 months free)";
  const stripePriceId =
    plan === "monthly"
      ? process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID
      : process.env.NEXT_PUBLIC_STRIPE_ANNUAL_PRICE_ID;

  return (
    <div className="text-center space-y-6">
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setPlan("monthly")}
          className={`px-4 py-2 rounded hover:cursor-pointer ${
            plan === "monthly"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => setPlan("annual")}
          className={`px-4 py-2 rounded hover:cursor-pointer ${
            plan === "annual"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Annual
        </button>
      </div>

      <form action="/api/stripe/checkout" method="POST">
        <input type="hidden" name="priceId" value={stripePriceId} />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition hover:cursor-pointer"
        >
          Upgrade for {price}
        </button>
      </form>
    </div>
  );
}
