import Image from "next/image";
import Link from "next/link";
import { PublicCourseType } from "@/app/data/course/get-all-courses";
import { useConstructUrl } from "@/hooks/use-construct-url";
import { School, TimerIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface PublicCourseCardProps {
  course: PublicCourseType;
}

export function PublicCourseCard({ course }: PublicCourseCardProps) {
  const thumbnailUrl = useConstructUrl(course.fileKey);

  return (
    <Card className="group relative py-0 gap-0">
      <Badge className="absolute top-2 right-2 z-10">{course.level}</Badge>

      <Image
        src={thumbnailUrl}
        alt={course.title}
        className="w-full rounded-t-xl aspect-video h-full object-cover"
        width={600}
        height={400}
      />

      <CardContent className="p-4">
        <Link
          href={`/courses/${course.slug}`}
          className="font-medium text-lg line-clamp-2 hover:underline group-hover:text-primary transition-colors"
        >
          {course.title}
        </Link>

        <p className="text-muted-foreground text-sm mt-2 line-clamp-2 leading-tight">
          {course.smallDescription}
        </p>

        <div className="flex items-center gap-x-5">
          <div className="flex items-center gap-x-2">
            <TimerIcon className="size-6 p-1 rounded-md text-primary bg-primary/10" />
            <p className="text-sm text-muted-foreground">{course.duration}h</p>
          </div>
          <div className="flex items-center gap-x-2">
            <School className="size-6 p-1 rounded-md text-primary bg-primary/10" />
            <p className="text-sm text-muted-foreground">{course.category}</p>
          </div>
        </div>

        <Link
          href={`/courses/${course.slug}`}
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

export function PublicCourseCardSkeleton() {
  return (
    <Card className="group relative py-0 gap-0">
      <div className="absolute top-2 right-2 z-10 flex items-center">
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      <div className="w-full relative h-fit">
        <Skeleton className="w-full rounded-t-xl aspect-video" />
      </div>
      <CardContent className="p-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4" />
        </div>
        <div className="mt-4 flex items-center gap-x-5">
          <div className="flex items-center gap-x-2">
            <Skeleton className="size-6 p-1 rounded-md" />
            <Skeleton className="w-8 h-4" />
          </div>
          <div className="flex items-center gap-x-2">
            <Skeleton className="size-6 p-1 rounded-md" />
            <Skeleton className="w-8 h-4" />
          </div>
        </div>
        <Skeleton className="w-full h-10 mt-4 rounded-md" />
      </CardContent>
    </Card>
  );
}
