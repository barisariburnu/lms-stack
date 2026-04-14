import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireAdmin } from "./require-admin";

export async function adminGetLesson(lessonId: string) {
  await requireAdmin();

  const lesson = await prisma.lesson.findUnique({
    where: {
      id: lessonId,
    },
    select: {
      id: true,
      videoKey: true,
      thumbnailKey: true,
      description: true,
      title: true,
      position: true,
    },
  });

  if (!lesson) {
    return notFound();
  }

  return lesson;
}

export type AdminLessonType = Awaited<ReturnType<typeof adminGetLesson>>;
