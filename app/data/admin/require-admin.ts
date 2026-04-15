import { cache } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import "server-only";

export const requireAdmin = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    return redirect("/unauthorized");
  }

  return session;
});
