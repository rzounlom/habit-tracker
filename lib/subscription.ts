import { db } from "@/lib/db";

export async function getUserSubscriptionPlan(userId: string) {
  const subscription = await db.subscription.findUnique({
    where: { userId },
  });

  if (!subscription) {
    return { isSubscribed: false, plan: "Free" };
  }

  return {
    isSubscribed:
      subscription.status === "active" || subscription.status === "trialing",
    plan: subscription.plan,
  };
}

export async function checkUserSubscription(userId: string): Promise<boolean> {
  const subscription = await db.subscription.findUnique({
    where: { userId },
  });

  if (!subscription) {
    return false; // No subscription record
  }

  return subscription.status === "active" || subscription.status === "trialing";
}
