import { z } from "zod";

export {
  templateSchema,
  dbTemplateSchema,
  templateSchemaWithoutId,
  dbTemplateSchemaWithoutId,
};

const templateSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  weekdays: z.string().array(),
  notSameDay: z.boolean(),
  private: z.boolean(),
  lim_attend: z.boolean(),
  fixed_price: z.boolean(),
  free: z.boolean(),
  waitinglist: z.boolean(),
});

const dbTemplateSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  weekdays: z.string(),
  notSameDay: z.boolean(),
  private: z.boolean(),
  lim_attend: z.boolean(),
  fixed_price: z.boolean(),
  free: z.boolean(),
  waitinglist: z.boolean(),
});

const templatesSchema = z.array(templateSchema);

const templateSchemaWithoutId = templateSchema.omit({
  id: true,
});

const dbTemplateSchemaWithoutId = dbTemplateSchema.omit({
  id: true,
});

export function validateTemplate(data: unknown) {
  return templateSchema.safeParse(data);
}

export function validateTemplateArray(data: unknown) {
  return templatesSchema.safeParse(data);
}

export function validateDbTemplate(data: unknown) {
  return dbTemplateSchema.safeParse(data);
}

export function validateTemplateWithoutId(data: unknown) {
  return templateSchemaWithoutId.safeParse(data);
}

export function validateDbTemplateWithoutId(data: unknown) {
  return dbTemplateSchemaWithoutId.safeParse(data);
}
