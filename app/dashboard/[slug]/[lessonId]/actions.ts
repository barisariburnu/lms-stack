"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/app/data/user/require-user";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";

export async function markLessonAsCompleted(
  lessonId: string,
  slug: string,
): Promise<ApiResponse> {
  const user = await requireUser();

  try {
    await prisma.lessonProgress.upsert({
      where: {
        lessonId_userId: {
          lessonId,
          userId: user.id,
        },
      },
      create: {
        lessonId,
        userId: user.id,
        isCompleted: true,
      },
      update: {
        isCompleted: true,
      },
    });

    revalidatePath(`/dashboard/${slug}`);

    return {
      status: "success",
      message: "Lesson marked as completed",
    };
  } catch {
    return {
      status: "error",
      message: "Failed to mark lesson as completed",
    };
  }
}
