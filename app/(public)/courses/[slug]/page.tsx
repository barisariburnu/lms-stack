import Image from "next/image";
import { getCourse } from "@/app/data/course/get-course";
import { env } from "@/lib/env";
import {
  Book,
  ChartBar,
  ChartBarIcon,
  Check,
  ChevronDown,
  Clock,
  ClockIcon,
  GroupIcon,
  Play,
} from "lucide-react";
import { RenderDescription } from "@/components/rich-text-editor/render-description";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";

type Params = {
  params: {
    slug: string;
  };
};

export default async function Page({ params }: Params) {
  const { slug } = params;
  const course = await getCourse(slug);

  return (
    <div className="grid grid-cols-1 gap-8 lg-grid-cols-3 mt-5">
      <div className="order-1 lg:col-span-2">
        <div className="relative aspect-video w-full overflow-hidden shadow-lg rounded-xl">
          <Image
            src={`https://${env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES}.s3.${env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${course.fileKey}`}
            alt={course.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
        </div>
        <div className="mt-8 space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">
              {course.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed line-clamp-2">
              {course.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Badge className="flex items-center gap-1 px-3 py-1">
              <ChartBarIcon className="size-4" />
              <span>{course.level}</span>
            </Badge>
            <Badge className="flex items-center gap-1 px-3 py-1">
              <GroupIcon className="size-4" />
              <span>{course.category}</span>
            </Badge>
            <Badge className="flex items-center gap-1 px-3 py-1">
              <ClockIcon className="size-4" />
              <span>{course.duration}</span>
            </Badge>
          </div>

          <Separator className="my-8" />

          <div className="space-y-6">
            <h2 className="text-3xl font-semibold tracking-tight">
              What you'll learn
            </h2>

            <RenderDescription json={JSON.parse(course.description)} />
          </div>
        </div>

        <div className="mt-12 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold tracking-tight">
              Course Content
            </h2>
            <div>
              {course.chapters.length} Chapters |{" "}
              {course.chapters.reduce(
                (total, chapter) => total + chapter.lessons.length,
                0,
              ) || 0}{" "}
              Lessons
            </div>
          </div>
          <div className="space-y-4">
            {course.chapters.map((chapter, index) => (
              <Collapsible key={chapter.id} defaultOpen={index === 0}>
                <Card className="p-0 overflow-hidden border-2 transition-all duration-200 hover:shadow-md gap-0">
                  <CollapsibleTrigger asChild>
                    <div>
                      <CardContent className="p-6 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <p className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                              {index + 1}
                            </p>
                            <div>
                              <h3 className="text-xl font-semibold text-left">
                                {chapter.title}
                              </h3>
                              <p className="text-muted-foreground text-sm mt-1 text-left">
                                {chapter.lessons.length} Lesson
                                {chapter.lessons.length > 1 ? "s" : ""}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className="text-xs">
                              {chapter.lessons.length} Lesson
                              {chapter.lessons.length > 1 ? "s" : ""}
                            </Badge>

                            <ChevronDown className="size-5 text-muted-foreground" />
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="border-5 bg-muted/20">
                      <div className="p-6 pt-4 space-y-3">
                        {chapter.lessons.map((lesson, lessonIndex) => (
                          <div
                            key={lesson.id}
                            className="flex items-center gap-4 rounded-lg p-3 hover:bg-accent transition-colors"
                          >
                            <div className="flex items-center size-8 rounded-full bg-background border-2 border-primary/20">
                              <Play className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-sm">
                                {lesson.title}
                              </p>
                              <p className="text-muted-foreground text-xs mt-1">
                                Lesson {lessonIndex + 1}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            ))}
          </div>
        </div>
      </div>

      <div className="order-2 lg:col-span-1">
        <div className="sticky top-20">
          <Card className="py-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <span className="text-lg font-medium">Price:</span>
                <span className="text-2xl font-bold text-primary">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(course.price)}
                </span>
              </div>

              <div className="mb-6 space-y-3 rounded-lg bg-muted p-4">
                <h4 className="font-medium">What you will get: </h4>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center size-8 justify-center rounded-full bg-primary/10 text-primary">
                      <Clock className="size-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Course Duration</p>
                      <p className="text-xs text-muted-foreground">
                        {course.duration} hours
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center size-8 justify-center rounded-full bg-primary/10 text-primary">
                      <ChartBar className="size-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Difficulty Level</p>
                      <p className="text-xs text-muted-foreground">
                        {course.level}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center size-8 justify-center rounded-full bg-primary/10 text-primary">
                      <GroupIcon className="size-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Category</p>
                      <p className="text-xs text-muted-foreground">
                        {course.category}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center size-8 justify-center rounded-full bg-primary/10 text-primary">
                      <Book className="size-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Total Lessons</p>
                      <p className="text-xs text-muted-foreground">
                        {course.chapters.reduce(
                          (total, chapter) => total + chapter.lessons.length,
                          0,
                        ) || 0}{" "}
                        Lessons
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6 space-y-3">
                <h4>This course includes:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <div className="rounded-full p-1 bg-green-500/10 text-green-500">
                      <Check className="size-3" />
                    </div>
                    <p>Full lifetime access</p>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="rounded-full p-1 bg-green-500/10 text-green-500">
                      <Check className="size-3" />
                    </div>
                    <p>Access on mobile and desktop</p>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="rounded-full p-1 bg-green-500/10 text-green-500">
                      <Check className="size-3" />
                    </div>
                    <p>Certificate of completion</p>
                  </li>
                </ul>
              </div>

              <Button className="w-full">Enroll Now!</Button>
              <p className="text-xs text-muted-foreground text-center mt-3">
                30-Day Money-Back Guarantee
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
