import { z } from "zod";

export { lessonSchema, lessonListSchema };

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

const lessonListSchema = z.array(lessonSchema);

export function validateLesson(data: unknown) {
    return lessonSchema.safeParse(data);
}
  
export function validateLessonList(data: unknown) {
    return lessonListSchema.safeParse(data);
}


export type Lesson = z.infer<typeof lessonSchema>;