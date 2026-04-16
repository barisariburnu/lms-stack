import { redirect } from "next/navigation";
import { getCourseSidebarData } from "@/app/data/course/get-course-sidebar-data";

interface CoursePageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = await getCourseSidebarData(slug);
  const firstChapter = course.course.chapters[0];
  const firstLesson = firstChapter?.lessons[0];

  if (firstLesson) {
    redirect(`/dashboard/${slug}/${firstLesson.id}`);
  }

  return (
    <div className="flex items-center justify-center h-full text-center">
      <h2 className="text-2xl font-bold mb-2">No lessons available</h2>
      <p className="text-muted-foreground">
        This course does not have any lessons yet
      </p>
    </div>
  );
}
