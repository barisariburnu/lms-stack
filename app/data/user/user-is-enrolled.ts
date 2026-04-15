import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import "server-only";

export async function checkIfCourseBought(courseId: string): Promise<boolean> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return false;
  }

  const enrollment = await prisma.enrollment.findUnique({
    where: {
      courseId_userId: {
        userId: session.user.id,
        courseId,
      },
    },
    select: {
      status: true,
    },
  });

  return enrollment?.status === "Active" ? true : false;
}
