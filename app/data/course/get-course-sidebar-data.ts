import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import "server-only";
import { requireUser } from "../user/require-user";

export async function getCourseSidebarData(slug: string) {
  const user = await requireUser();

  const course = await prisma.course.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      title: true,
      duration: true,
      level: true,
      category: true,
      slug: true,
      chapters: {
        orderBy: {
          position: "asc",
        },
        select: {
          id: true,
          title: true,
          position: true,
          lessons: {
            orderBy: {
              position: "asc",
            },
            select: {
              id: true,
              title: true,
              position: true,
              description: true,
              lessonProgresses: {
                where: {
                  userId: user.id,
                },
                select: {
                  id: true,
                  isCompleted: true,
                  lessonId: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!course) {
    return notFound();
  }

  const enrollment = await prisma.enrollment.findUnique({
    where: {
      courseId_userId: {
        userId: user.id,
        courseId: course.id,
      },
    },
  });

  if (!enrollment || enrollment.status !== "Active") {
    return notFound();
  }

  return { course };
}

export type CourseSidebarDataType = Awaited<
  ReturnType<typeof getCourseSidebarData>
>;
