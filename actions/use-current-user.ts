"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";

export const useCurrentUser = async () => {
  const session = await auth();
  const currentUser = await db.user.findFirst({
    where: {
      id: session?.user?.id,
    },
  });
  console.log("current user ", currentUser);

  return currentUser;
};
