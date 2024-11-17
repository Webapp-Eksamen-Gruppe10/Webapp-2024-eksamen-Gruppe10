import { z } from "zod";

export { lessonSchema, lessonSchemaToDb, lessonListSchema, lessonListSchemaToDb };

const lessonSchema = z.object({
    id: z.string(),
    title: z.string(),
    slug: z.string(),
    preAmble: z.string(),
    text: z.array(z.object({
        id: z.string(),
        text: z.string()
    }))
})

const lessonSchemaToDb = z.object({
    title: z.string(),
    slug: z.string(),
    preAmble: z.string(),
    text: z.array(z.object({
        text: z.string()
    }))
})

const lessonListSchema = z.array(lessonSchema);
const lessonListSchemaToDb = z.array(lessonSchemaToDb);

export function validateLesson(data: unknown) {
    return lessonSchema.safeParse(data);
}
  
export function validateLessonList(data: unknown) {
    return lessonListSchema.safeParse(data);
}

export function validateLessonToDb(data: unknown) {
    return lessonSchemaToDb.safeParse(data);
}
  
export function validateLessonListToDb(data: unknown) {
    return lessonListSchemaToDb.safeParse(data);
}

export type Lesson = z.infer<typeof lessonSchema>;
export type LessonToDb = z.infer<typeof lessonSchemaToDb>;