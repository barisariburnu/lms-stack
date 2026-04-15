import { prisma } from "@/lib/db";
import "server-only";
import { requireAdmin } from "./require-admin";

export async function adminGetRecentCourses() {
  await requireAdmin();

  const courses = await prisma.course.findMany({
    take: 2,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      smallDescription: true,
      duration: true,
      level: true,
      status: true,
      price: true,
      fileKey: true,
      slug: true,
    },
  });

  return courses;
}
