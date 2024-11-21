import { z } from "zod";
import { lessonListSchema } from "@/features/lesson/lib/schema";

export { courseSchema, courseSchemaToDb, courseListSchema, courseListSchemaToDb };

export const Category = z.enum(['marketing',
    'photoshop',
    'code',
    'video',
    'analytics',
    'web',
    'design',
    'programmering'
])

export const courseCreateSteps = [
    { id: '1', name: 'Kurs' },
    { id: '2', name: 'Leksjoner' },
  ]

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