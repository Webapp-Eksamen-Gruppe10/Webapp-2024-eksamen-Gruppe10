import { z } from "zod";

// todo: fix zod validation.
export const commentSchema = z.object({
    id: z.string(),
    createdBy: z.object({
        id: z.string(),
        name: z.string(),
    }),
    comment: z.string(),
    lesson: z.object({
        slug: z.string(),
    }),
});