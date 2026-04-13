import { z } from "zod";
import { description } from "@/components/sidebar/chart-area-interactive";

export const courseLevels = ["Beginner", "Intermediate", "Advanced"] as const;
export const courseStatuses = ["Draft", "Published", "Archived"] as const;
export const courseCategories = [
  "Web Development",
  "Mobile Development",
  "Data Science",
  "Machine Learning",
  "Artificial Intelligence",
  "UI/UX Design",
  "Digital Marketing",
  "Business",
  "Finance",
  "Health",
  "Fitness",
  "Music",
  "Photography",
  "Videography",
  "Travel",
  "Food",
  "Fashion",
  "Education",
  "Other",
] as const;

export const courseSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(100, { message: "Title must be at most 100 characters long" }),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters long" })
    .max(1000, {
      message: "Description must be at most 1000 characters long",
    }),
  fileKey: z
    .string()
    .min(1, { message: "File key is required" })
    .max(100, { message: "File key must be at most 100 characters long" }),
  price: z.coerce
    .number()
    .min(1, { message: "Price must be at least 1" })
    .max(10000, { message: "Price must be at most 10000" }),
  duration: z.coerce
    .number()
    .min(1, { message: "Duration must be at least 1" })
    .max(500, { message: "Duration must be at most 500" }),
  level: z
    .enum(courseLevels, { message: "Level is required" })
    .refine((value) => courseLevels.includes(value), {
      message: "Invalid level",
    }),
  category: z
    .enum(courseCategories, { message: "Category is required" })
    .refine((value) => courseCategories.includes(value), {
      message: "Invalid category",
    }),
  smallDescription: z
    .string()
    .min(3, { message: "Small description must be at least 3 characters long" })
    .max(200, {
      message: "Small description must be at most 200 characters long",
    }),
  slug: z
    .string()
    .min(3, { message: "Slug must be at least 3 characters long" })
    .max(100, { message: "Slug must be at most 100 characters long" }),
  status: z
    .enum(courseStatuses, { message: "Status is required" })
    .refine((value) => courseStatuses.includes(value), {
      message: "Invalid status",
    }),
});

export const chapterSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Chapter name must be at least 3 characters long" }),
  courseId: z.string().uuid({ message: "Invalid course ID" }),
});

export const lessonSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Lesson name must be at least 3 characters long" }),
  chapterId: z.string().uuid({ message: "Invalid chapter ID" }),
  courseId: z.string().uuid({ message: "Invalid course ID" }),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters long" })
    .optional(),
  thumnailKey: z.string().optional(),
  videoKey: z.string().optional(),
});

export type CourseSchemaType = z.infer<typeof courseSchema>;
export type ChapterSchemaType = z.infer<typeof chapterSchema>;
export type LessonSchemaType = z.infer<typeof lessonSchema>;
