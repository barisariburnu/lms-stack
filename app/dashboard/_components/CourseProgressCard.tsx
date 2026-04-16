"use client";

import Image from "next/image";
import Link from "next/link";
import { EnrolledCourseType } from "@/app/data/user/get-enrolled-courses";
import { useConstructUrl } from "@/hooks/use-construct-url";
import { useCourseProgress } from "@/hooks/use-course-progress";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface CourseProgressCardProps {
  data: EnrolledCourseType;
}

export function CourseProgressCard({ data }: CourseProgressCardProps) {
  const thumbnailUrl = useConstructUrl(data.course.fileKey);

  const { totalLessons, completedLessons, progressPercentage } =
    useCourseProgress({ courseData: data.course });

  return (
    <Card className="group relative py-0 gap-0">
      <Badge className="absolute top-2 right-2 z-10">{data.course.level}</Badge>

      <Image
        src={thumbnailUrl}
        alt={data.course.title}
        className="w-full rounded-t-xl aspect-video h-full object-cover"
        width={600}
        height={400}
      />

      <CardContent className="p-4">
        <Link
          href={`/dashboard/${data.course.slug}`}
          className="font-medium text-lg line-clamp-2 hover:underline group-hover:text-primary transition-colors"
        >
          {data.course.title}
        </Link>

        <p className="text-muted-foreground text-sm mt-2 line-clamp-2 leading-tight">
          {data.course.smallDescription}
        </p>

        <div className="space-y-4 mt-5">
          <div>
            <p className="flex justify-between mb-1 text-sm">Progress:</p>
            <p className="font-medium">{progressPercentage}%</p>
          </div>
          <Progress value={progressPercentage} className="h-1.5" />
          <p className="text-xs text-muted-foreground">
            {completedLessons}/{totalLessons} lessons completed
          </p>
        </div>

        <Link
          href={`/dashboard/${data.course.slug}`}
          className={buttonVariants({
            className: "w-full mt-4",
          })}
        >
          Enroll
        </Link>
      </CardContent>
    </Card>
  );
}
