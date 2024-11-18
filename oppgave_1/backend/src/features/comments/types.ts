import { z } from "zod";

// todo: fix zod validation.
/*  {
    id: '1',
    createdBy: { id: '2', name: 'Sara Olsen' },
    comment:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
    lesson: { slug: 'variabler' },
  },*/
  
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

export const commentDbSchema = z.object({
    id: z.string(),
    createdBy: z.string(),
    comment: z.string(),
    lesson: z.string(),
});