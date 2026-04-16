"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/app/data/admin/require-admin";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { LessonSchemaType, lessonSchema } from "@/lib/zod-schemas";

export async function updateLesson(
  data: LessonSchemaType,
  lessonId: string,
): Promise<ApiResponse> {
  await requireAdmin();

  try {
    const result = lessonSchema.safeParse(data);

    if (!result.success) {
      return { status: "error", message: "Invalid data" };
    }

    await prisma.lesson.update({
      where: {
        id: lessonId,
      },
      data: {
        title: data.name,
        description: data.description,
        videoKey: data.videoKey,
        thumbnailKey: data.thumbnailKey,
      },
    });

    revalidatePath(
      `/admin/courses/${data.courseId}/${data.chapterId}/${lessonId}`,
    );

    return { status: "success", message: "Lesson updated successfully" };
  } catch {
    return { status: "error", message: "Failed to update lesson" };
  }
}
