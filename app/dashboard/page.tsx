import Link from "next/link";
import { getEnrolledCourses } from "@/app/data/user/get-enrolled-courses";
import { PageEmptyState } from "@/components/general/EmptyState";
import { PublicCourseCard } from "../(public)/_components/PublicCourseCard";
import { getAllCourses } from "../data/course/get-all-courses";
import { CourseProgressCard } from "./_components/CourseProgressCard";

export default async function Page() {
  const [allCourses, enrolledCourses] = await Promise.all([
    getAllCourses(),
    getEnrolledCourses(),
  ]);

  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Enrolled Courses</h1>
        <p className="text-muted-foreground">
          Here you can see all the courses you have access to
        </p>
      </div>

      {enrolledCourses.length === 0 ? (
        <PageEmptyState
          title="No Enrolled Courses"
          description="You are not purchased any courses yet."
          buttonText="Browse Courses"
          buttonLink="/courses"
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {enrolledCourses.map((enrollment) => (
            <Link href={`/dashboard/${enrollment.course.slug}`} key={enrollment.course.id}>
              <CourseProgressCard key={enrollment.course.id} data={enrollment} />
            </Link>
          ))}
        </div>
      )}

      <section className="mt-10">
        <div className="mb-5 flex flex-col gap-2">
          <h2 className="text-3xl font-bold">All Courses</h2>
          <p className="text-muted-foreground">
            Here you can see all the courses available for purchase
          </p>
        </div>

        {allCourses.filter(
          (course) =>
            !enrolledCourses.some(
              ({ course: enrolled }) => enrolled.id === course.id,
            ),
        ).length === 0 ? (
          <PageEmptyState
            title="No Courses Available"
            description="There are no courses available for purchase."
            buttonText="Browse Courses"
            buttonLink="/courses"
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {allCourses
              .filter(
                (course) =>
                  !enrolledCourses.some(
                    ({ course: enrolled }) => enrolled.id === course.id,
                  ),
              )
              .map((course) => (
                <PublicCourseCard key={course.id} course={course} />
              ))}
          </div>
        )}
      </section>
    </>
  );
}
