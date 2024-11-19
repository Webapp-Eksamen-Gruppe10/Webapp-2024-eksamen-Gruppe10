import { z } from "zod";

  /*
  export const commentSchema = z.object({
    id: z.string(),
    createdBy: z.object({
        id: z.string(),
        name: z.string(), <--- fjernet dette ettersom user-tabellen ikke er et krav
    }),
    comment: z.string(),
    lesson: z.object({
        slug: z.string(),
    }),
});
*/ 

//sender lessonslug til frontend 
export const commentSchema = z.object({
    id: z.string(),
    createdBy: z.string(),
    comment: z.string(),
    lesson: z.object({
        slug: z.string(),
    }),
});

// lagrer kun lessonId i backend i databasen 
export const commentDbSchema = z.object({
    id: z.string(),
    lessonId: z.string(),
    createdBy: z.string(),
    comment: z.string(),
 
});


export type Comment = z.infer<typeof commentSchema>;
export type CommentDb = z.infer<typeof commentDbSchema>;
