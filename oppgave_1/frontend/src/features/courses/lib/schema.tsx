import { z } from "zod";
import { lessonListSchema } from "@/features/lesson/lib/schema";

export { courseSchema, courseSchemaToDb, courseListSchema, courseListSchemaToDb };

export const Category = z.enum(['Marketing',
    'Photoshop',
    'Code',
    'Video',
    'Analytics',
    'Web',
    'Design',
    'Empty',])

const courseSchema = z.object({
    id: z.string(),
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    category: Category,
    lessons: lessonListSchema
})

const courseSchemaToDb = z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    category: Category,
    lessons: lessonListSchema
})

const courseListSchema = z.array(courseSchema);
const courseListSchemaToDb = z.array(courseSchemaToDb);

export function validateCourse(data: unknown) {
    return courseSchema.safeParse(data);
}
  
export function validateCourseList(data: unknown) {
    return courseListSchema.safeParse(data);
}

export function validateCourseToDb(data: unknown) {
    return courseSchemaToDb.safeParse(data);
}
  
export function validateCourseListToDb(data: unknown) {
    return courseListSchemaToDb.safeParse(data);
}

export type Course = z.infer<typeof courseSchema>;
export type CourseToDb = z.infer<typeof courseSchemaToDb>;