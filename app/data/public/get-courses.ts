import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function getPublishedCourses() {
  const data = await prisma.course.findMany({
    where: {
      status: "Published",
    },
    select: {
      id: true,
      title: true,
      smallDescription: true,
      price: true,
      duration: true,
      level: true,
      fileKey: true,
      slug: true,
      category: true,
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export type PublicCourseType = Prisma.PromiseReturnType<typeof getPublishedCourses>[number];
