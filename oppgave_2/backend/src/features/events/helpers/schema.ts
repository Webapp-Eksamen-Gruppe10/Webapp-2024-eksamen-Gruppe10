import { templateSchema } from "@/features/template/helpers/schema";
import { z } from "zod";

const eventSchema = z.object({
  id: z.string(),
  template_id: z.string(),
  title: z.string(),
  dateTime: z.date(),
  location: z.string(),
  category: z.string().array(),
  capacity: z.number(),
  price: z.number(),
  description: z.string(),
  private: z.boolean(),
  waitinglist: z.boolean(),
  participants: z.string().array().optional(),
  template: templateSchema.optional(),
});

const dbTemplateSchema = z.object({
  id: z.string(),
  template_id: z.string(),
  title: z.string(),
  dateTime: z.date(),
  location: z.string(),
  category: z.string(),
  capacity: z.number().int(),
  price: z.number(),
  description: z.string(),
  private: z.boolean(),
  waitinglist: z.boolean(),
  // Participants and template are handled via relations
});

const eventSchemaWithoutId = eventSchema.omit({
  id: true,
});

const dbTemplateSchemaWithoutId = dbTemplateSchema.omit({
  id: true,
});

export function validateEvent(data: unknown) {
  return eventSchema.safeParse(data);
}

export function validateEventWithoutId(data: unknown) {
  return eventSchemaWithoutId.safeParse(data);
}

export function validateDbEvent(data: unknown) {
  return dbTemplateSchema.safeParse(data);
}

export function validateDbEventWithoutId(data: unknown) {
  return dbTemplateSchemaWithoutId.safeParse(data);
}

export function validateEventArray(data: unknown) {
  return eventSchema.array().safeParse(data);
}
