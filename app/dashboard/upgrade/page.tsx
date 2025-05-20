import PricingToggleCTA from "@/components/PlanToggle";
import { auth } from "@clerk/nextjs/server";
import { checkUserSubscription } from "@/lib/subscription";
import { redirect } from "next/navigation";

export default async function UpgradePage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const isSubscribed = await checkUserSubscription(userId);
  if (isSubscribed) {
    redirect("/dashboard");
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 text-center">
      <h1 className="text-3xl font-bold mb-4">🚀 Upgrade to Pro</h1>
      <p className="text-gray-600 mb-8">
        Unlock premium AI coaching, unlimited habit insights, and advanced
        tracking tools to help you stay consistent and motivated.
      </p>

      <PricingToggleCTA />

      {/* Comparison grid */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-6">What’s included in Pro?</h2>
        <div className="grid grid-cols-2 text-left gap-8 text-sm">
          <div>
            <h3 className="text-gray-500 font-medium mb-2">Free Plan</h3>
            <ul className="space-y-2 text-gray-700">
              <li>✔️ 3 AI insights total</li>
              <li>✔️ Habit tracking</li>
              <li>🚫 No charts</li>
              <li>🚫 No smart streaks</li>
              <li>🚫 No unlimited coaching</li>
            </ul>
          </div>
          <div>
            <h3 className="text-gray-900 font-medium mb-2">Pro Plan</h3>
            <ul className="space-y-2 text-gray-900">
              <li>✅ Unlimited AI insights</li>
              <li>✅ Visual habit charts</li>
              <li>✅ Weekly coaching reports</li>
              <li>✅ Smart streak analysis</li>
              <li>✅ Priority support</li>
            </ul>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-16 max-w-2xl mx-auto text-left">
        <h2 className="text-xl font-semibold mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-800">Can I cancel anytime?</h3>
            <p className="text-sm text-gray-600">
              Yes, you can cancel anytime in your billing settings. Your
              subscription will remain active until the end of the billing
              period.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-gray-800">
              What happens to my data if I cancel?
            </h3>
            <p className="text-sm text-gray-600">
              Your habits and history are saved. You just won’t be able to
              access Pro features until you resubscribe.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-gray-800">Do you offer refunds?</h3>
            <p className="text-sm text-gray-600">
              We don’t offer refunds, but you can cancel anytime before the next
              billing cycle.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="mt-16 text-left max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">What Users Are Saying</h2>
        <div className="grid sm:grid-cols-2 gap-6 text-sm text-gray-700">
          <blockquote className="bg-white p-4 border rounded shadow-sm">
            “This app helped me build the gym habit I never could stick to
            before.”
            <footer className="mt-2 text-gray-500 text-xs">– Jordan</footer>
          </blockquote>
          <blockquote className="bg-white p-4 border rounded shadow-sm">
            “The AI coach gave me advice that actually made sense and felt
            personal.”
            <footer className="mt-2 text-gray-500 text-xs">– Priya</footer>
          </blockquote>
          <blockquote className="bg-white p-4 border rounded shadow-sm">
            “Love the streak tracking! Seeing progress is super motivating.”
            <footer className="mt-2 text-gray-500 text-xs">– Mateo</footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
