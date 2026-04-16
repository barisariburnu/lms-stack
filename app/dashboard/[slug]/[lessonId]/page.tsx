import { Suspense } from "react";
import { getLessonContent } from "@/app/data/course/get-lesson-content";
import { CourseContent } from "./_components/CourseContent";
import { LessonSkeleton } from "./_components/LessonSkeleton";

interface LessonContentPageProps {
  params: Promise<{ lessonId: string }>;
}

export default async function LessonContentPage({
  params,
}: LessonContentPageProps) {
  const { lessonId } = await params;

  return (
    <Suspense fallback={<LessonSkeleton />}>
      <LessonContentLoader lessonId={lessonId} />
    </Suspense>
  );
}

async function LessonContentLoader({ lessonId }: { lessonId: string }) {
  const lesson = await getLessonContent(lessonId);
  return <CourseContent data={lesson} />;
}
