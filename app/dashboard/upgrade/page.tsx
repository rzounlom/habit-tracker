import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { checkUserSubscription } from "@/lib/subscription";

export default async function UpgradePage() {
  const { userId } = await auth();
  const isSubscribed = userId ? await checkUserSubscription(userId) : false;

  return (
    <div className="max-w-xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">🚀 Upgrade to Pro</h1>
      <p className="text-gray-600 mb-6">
        Unlock unlimited AI habit insights, personalized coaching, and advanced
        habit analytics.
      </p>

      {isSubscribed ? (
        <div className="text-green-600 font-semibold">
          You&apos;re already subscribed 🎉
        </div>
      ) : (
        <form action="/api/stripe/checkout" method="POST">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-all"
          >
            Upgrade to Pro
          </button>
        </form>
      )}

      <Link
        href="/dashboard"
        className="block mt-4 text-sm text-blue-500 hover:underline"
      >
        ← Back to Dashboard
      </Link>
    </div>
  );
}
