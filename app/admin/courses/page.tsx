import Link from "next/link";
import { adminGetCourses } from "@/app/data/admin/admin-get-courses";
import { PageEmptyState } from "@/components/general/EmptyState";
import { buttonVariants } from "@/components/ui/button";
import { AdminCourseCard } from "./_components/AdminCourseCard";

export default async function Page() {
  const courses = await adminGetCourses();

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Courses</h1>
        <Link className={buttonVariants()} href="/admin/courses/create">
          Create Course
        </Link>
      </div>
      {courses.length === 0 ? (
        <PageEmptyState
          title="No courses found"
          description="Create your first course to get started"
          buttonText="Create Course"
          buttonLink="/admin/courses/create"
        />
      ) : (
        <div className="grid grid-cols-1 sm-grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-7">
          {courses.map((course) => (
            <AdminCourseCard key={course.id} data={course} />
          ))}
        </div>
      )}
    </>
  );
}
