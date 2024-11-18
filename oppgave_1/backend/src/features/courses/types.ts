import { z } from "zod";
import { lessonSchema } from "../lessons/lessons.schema";

export const courseSchema = z.object({
    id: z.string().optional(),
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    category: z.string(),
    lessons: z.array(lessonSchema)
})

export const courseDbSchema = z.object({
    id: z.string(),
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    category: z.string()
})

export type Course = z.infer<typeof courseSchema>;
export type CourseDb = z.infer<typeof courseDbSchema>;