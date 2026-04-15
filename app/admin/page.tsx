import { Suspense } from "react";
import Link from "next/link";
import { PageEmptyState } from "@/components/general/EmptyState";
import { ChartAreaInteractive } from "@/components/sidebar/chart-area-interactive";
import { SectionCards } from "@/components/sidebar/section-cards";
import { buttonVariants } from "@/components/ui/button";
import { adminGetEnrollmentStats } from "../data/admin/admin-get-enrollment-stats";
import { adminGetRecentCourses } from "../data/admin/admin-get-recent-courses";
import {
  AdminCourseCard,
  AdminCourseCardSkeleton,
} from "./courses/_components/AdminCourseCard";

export default async function Page() {
  const enrollmentData = await adminGetEnrollmentStats();

  return (
    <>
      <SectionCards />
      <ChartAreaInteractive data={enrollmentData} />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent Courses</h2>
          <Link
            className={buttonVariants({ variant: "outline" })}
            href="/admin/courses"
          >
            View All Courses
          </Link>
        </div>

        <Suspense fallback={<RenderRecentCoursesSkeleton />}>
          <RenderRecentCourses />
        </Suspense>
      </div>
    </>
  );
}

async function RenderRecentCourses() {
  const courses = await adminGetRecentCourses();

  if (courses.length === 0) {
    <PageEmptyState
      buttonText="Create New Course"
      description="You dont have any courses. Create some to see them here"
      title="You dont have any course yet!"
      buttonLink="/admin/courses/create"
    />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {courses.map((course) => (
        <AdminCourseCard key={course.id} data={course} />
      ))}
    </div>
  );
}

async function RenderRecentCoursesSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Array.from({ length: 2 }).map((_, index) => (
        <AdminCourseCardSkeleton key={index} />
      ))}
    </div>
  );
}
