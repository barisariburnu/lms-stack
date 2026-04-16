import { getCourseSidebarData } from "@/app/data/course/get-course-sidebar-data";
import { CourseSidebar } from "../_components/CourseSidebar";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export default async function Layout({ children, params }: LayoutProps) {
  const { slug } = await params;
  const courseData = await getCourseSidebarData(slug);

  return (
    <div className="flex flex-1">
      <div className="w-80 shrink-0 border-r border-border">
        <CourseSidebar course={courseData.course} />
      </div>
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
