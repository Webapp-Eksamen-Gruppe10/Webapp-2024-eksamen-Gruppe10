import { z } from "zod";
import { lessonSchema } from "@/features/lessons/lessons.schema";

export const courseSchema = z.object({
    id: z.string(),
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    lessons: z.array(lessonSchema),
    category: z.string(),
    userId: z.string()
})

export const courseDbSchema = z.object({
    id: z.string(),
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    category: z.string(),
    userId: z.string()
})

export type Course = z.infer<typeof courseSchema>;
export type CourseDb = z.infer<typeof courseDbSchema>;