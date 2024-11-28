import { z } from "zod";

const templateSchema = z.object({
  id: z.number(),
  name: z.string().max(45),
  description: z.string().max(45),
  templatecol: z.string().max(45),
  weekdays: z.string().max(100),
  notSameDay: z.boolean(),
  private: z.boolean(),
  lim_attend: z.boolean(),
  fixed_price: z.boolean(),
  free: z.boolean(),
  waitinglist: z.boolean(),
});

const templateSchemaToDb = z.object({
  name: z.string().max(45),
  description: z.string().max(45),
  templatecol: z.string().max(45),
  weekdays: z.string().max(100),
  notSameDay: z.boolean(),
  private: z.boolean(),
  lim_attend: z.boolean(),
  fixed_price: z.boolean(),
  free: z.boolean(),
  waitinglist: z.boolean(),
});

const templateListSchema = z.array(templateSchema);
const templateListSchemaToDb = z.array(templateSchemaToDb);

export function validateTemplate(data: unknown) {
  return templateSchema.safeParse(data);
}

export function validateTemplateList(data: unknown) {
  return templateListSchema.safeParse(data);
}

export function validateTemplateToDb(data: unknown) {
  return templateSchemaToDb.safeParse(data);
}

export function validateTemplateListToDb(data: unknown) {
  return templateListSchemaToDb.safeParse(data);
}

export {
  templateSchema,
  templateSchemaToDb,
  templateListSchema,
  templateListSchemaToDb,
};

export type Template = z.infer<typeof templateSchema>;
export type TemplateToDb = z.infer<typeof templateSchemaToDb>;
