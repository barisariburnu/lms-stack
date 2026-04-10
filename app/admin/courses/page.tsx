import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";

export default function Page() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Courses</h1>
        <Link className={buttonVariants()} href="/admin/courses/create">
          Create Course
        </Link>
      </div>
      <div className="mt-6">
        <h1>No courses yet</h1>
      </div>
    </>
  );
}
