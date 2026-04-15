import { cache } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import "server-only";

export const requireUser = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  if (!user) {
    redirect("/login");
  }

  return user;
});
