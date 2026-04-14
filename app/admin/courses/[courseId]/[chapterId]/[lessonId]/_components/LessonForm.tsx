"use client";

import { useTransition } from "react";
import Link from "next/link";
import { AdminLessonType } from "@/app/data/admin/admin-get-lesson";
import { tryCatch } from "@/hooks/try-catch";
import { LessonSchemaType, lessonSchema } from "@/lib/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Uploader } from "@/components/file-uploader/uploader";
import { RichTextEditor } from "@/components/rich-text-editor/editor";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateLesson } from "../actions";

interface LessonFormProps {
  lesson: AdminLessonType;
  chapterId: string;
  courseId: string;
}

export function LessonForm({ lesson, chapterId, courseId }: LessonFormProps) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<LessonSchemaType>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      name: lesson.title,
      chapterId: chapterId,
      courseId: courseId,
      description: lesson.description ?? undefined,
      videoKey: lesson.videoKey ?? undefined,
      thumbnailKey: lesson.thumbnailKey ?? undefined,
    },
  });

  const onSubmit = async (data: LessonSchemaType) => {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        updateLesson(data, lesson.id),
      );

      if (error) {
        toast.error("An unexpected error occurred. Please try again later.");
      }

      if (result?.status === "success") {
        toast.success(result.message);
      } else if (result?.status === "error") {
        toast.error(result.message);
      }
    });
  };

  return (
    <div>
      <Link
        className={buttonVariants({ variant: "outline", className: "mb-6" })}
        href={`/admin/courses/${courseId}/${chapterId}`}
      >
        <ArrowLeft className="size-4" />
        <span>Back to Chapter</span>
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>Lesson Details</CardTitle>
          <CardDescription>Fill in the details for the lesson</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lesson Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Lesson Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lesson Description</FormLabel>
                    <FormControl>
                      <RichTextEditor content={field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="thumbnailKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thumbnail File</FormLabel>
                    <FormControl>
                      <Uploader
                        value={field.value}
                        onChange={field.onChange}
                        fileTypeAccepted="image"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="videoKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Video File</FormLabel>
                    <FormControl>
                      <Uploader
                        value={field.value}
                        onChange={field.onChange}
                        fileTypeAccepted="video"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending}>
                {isPending ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
