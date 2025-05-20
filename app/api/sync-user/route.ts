import { auth, currentUser } from "@clerk/nextjs/server";

import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST() {
  const { userId } = await auth();
  const clerkUser = await currentUser();

  if (!userId || !clerkUser)
    return new NextResponse("Unauthorized", { status: 401 });

  await db.user.upsert({
    where: { id: userId },
    update: {},
    create: {
      id: userId,
      email: clerkUser.emailAddresses[0]?.emailAddress || "",
    },
  });

  return NextResponse.json({ ok: true });
}
