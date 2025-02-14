import { z } from "zod";

export { commentSchema, commentSchemaToDb, commentListSchema, commentListSchemaToDb };

const commentSchema = z.object({
    createdBy: z.object({
        id: z.string(),
        name: z.string()
    }),
    comment: z.string(),
    lesson: z.object({
        slug: z.string()
    })
})

const commentSchemaToDb = z.object({
    createdBy: z.object({
        name: z.string()
    }),
    comment: z.string(),
    lesson: z.object({
        slug: z.string()
    })
})

const commentListSchema = z.array(commentSchema);
const commentListSchemaToDb = z.array(commentSchemaToDb);

export function validateComment(data: unknown) {
    return commentSchema.safeParse(data);
}
  
export function validateCommentList(data: unknown) {
    return commentListSchema.safeParse(data);
}

export function validateCommentToDb(data: unknown) {
    return commentSchemaToDb.safeParse(data);
}
  
export function validateCommentListToDb(data: unknown) {
    return commentListSchemaToDb.safeParse(data);
}

export type Comment = z.infer<typeof commentSchema>;
export type CommentToDb = z.infer<typeof commentSchemaToDb>;