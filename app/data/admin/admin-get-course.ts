import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import "server-only";
import { requireAdmin } from "./require-admin";

export async function adminGetCourse(courseId: string) {
  await requireAdmin();

  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      fileKey: true,
      price: true,
      duration: true,
      level: true,
      status: true,
      slug: true,
      smallDescription: true,
      category: true,
      chapters: {
        select: {
          id: true,
          title: true,
          position: true,
          lessons: {
            select: {
              id: true,
              title: true,
              position: true,
              description: true,
              thumbnailKey: true,
              videoKey: true,
            },
          },
        },
      },
    },
  });

  if (!course) {
    return notFound();
  }

  return course;
}

export type AdminCourseSingularType = Awaited<
  ReturnType<typeof adminGetCourse>
>;
