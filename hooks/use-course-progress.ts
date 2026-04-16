"use client";

import { useMemo } from "react";
import { CourseSidebarDataType } from "@/app/data/course/get-course-sidebar-data";

interface CourseProgressType {
  courseData: CourseSidebarDataType["course"];
}

interface CourseProgressResultType {
  totalLessons: number;
  completedLessons: number;
  progressPercentage: number;
}

export function useCourseProgress({
  courseData,
}: CourseProgressType): CourseProgressResultType {
  return useMemo(() => {
    let totalLessons = 0;
    let completedLessons = 0;

    courseData.chapters.forEach((chapter) => {
      chapter.lessons.forEach((lesson) => {
        totalLessons++;

        const isCompleted = lesson.lessonProgresses.some(
          (p) => p.lessonId === lesson.id && p.isCompleted,
        );

        if (isCompleted) {
          completedLessons++;
        }
      });
    });

    const progressPercentage =
      totalLessons > 0
        ? Math.round((completedLessons / totalLessons) * 100)
        : 0;

    return {
      totalLessons,
      completedLessons,
      progressPercentage,
    };
  }, [courseData]);
}
