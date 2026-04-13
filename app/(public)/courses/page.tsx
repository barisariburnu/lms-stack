import { getPublishedCourses } from "@/app/data/public/get-courses";
import { CourseCard } from "./_components/CourseCard";
import { Badge } from "@/components/ui/badge";

export default async function CoursesPage() {
  const courses = await getPublishedCourses();

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
      <div className="flex flex-col items-center text-center space-y-4 mb-12">
        <Badge variant="outline">Explore</Badge>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          All Courses
        </h1>
        <p className="max-w-[700px] text-muted-foreground md:text-lg">
          Find the perfect course to advance your career and improve your skills.
        </p>
      </div>

      {courses.length === 0 ? (
        <div className="text-center py-20 bg-muted/30 rounded-lg">
          <h2 className="text-2xl font-semibold mb-2">No courses available yet</h2>
          <p className="text-muted-foreground">Check back later for new content.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} data={course} />
          ))}
        </div>
      )}
    </div>
  );
}
