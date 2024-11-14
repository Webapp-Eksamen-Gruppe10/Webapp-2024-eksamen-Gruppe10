import { z } from "zod";

export { commentSchema, commentsSchema };

const commentSchema = z.object({
    id: z.string(),
    lessonId: z.string(),
    createdBy: z.string(),
    comment: z.string()
})

const commentsSchema = z.array(commentSchema);

export function validateComment(data: unknown) {
    return commentSchema.safeParse(data);
  }
  
  export function validateComments(data: unknown) {
    return commentsSchema.safeParse(data);
  }