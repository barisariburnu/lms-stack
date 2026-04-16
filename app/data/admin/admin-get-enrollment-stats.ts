import { prisma } from "@/lib/db";
import "server-only";
import { requireAdmin } from "./require-admin";

export async function adminGetEnrollmentStats(): Promise<
  {
    date: string;
    enrollments: number;
  }[]
> {
  await requireAdmin();

  const thirtyDaysAgo = new Date();

  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const enrollmentStats = await prisma.enrollment.findMany({
    where: {
      createdAt: {
        gte: thirtyDaysAgo,
      },
    },
    select: {
      createdAt: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const last30Days: { date: string; enrollments: number }[] = [];

  for (let index = 29; index >= 0; index--) {
    const date = new Date();

    date.setDate(date.getDate() - index);

    last30Days.push({
      date: date.toISOString().split("T")[0],
      enrollments: 0,
    });
  }

  enrollmentStats.forEach((enrollment) => {
    const date = enrollment.createdAt.toISOString().split("T")[0];
    const dayIndex = last30Days.findIndex((day) => day.date === date);

    if (dayIndex !== -1) {
      last30Days[dayIndex].enrollments++;
    }
  });

  return last30Days;
}
