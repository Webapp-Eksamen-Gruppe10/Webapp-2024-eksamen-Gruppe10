import {z} from "zod"; 


export const lessonSchema = z.object({
    id: z.string().optional(),
    title: z.string(),
    slug: z.string(),
    preAmble: z.string(),
    text: z.array(z.object({
        id: z.string(),
        text: z.string()})),
    courseId: z.string()
})

export const lessonDbSchema = z.object({
    id: z.string(),
    title: z.string(),
    slug: z.string(),
    preAmble: z.string(), 
    text: z.string(),
    courseId: z.string()
})


export type Lesson = z.infer<typeof lessonSchema>;
export type LessonDb = z.infer<typeof lessonDbSchema>;