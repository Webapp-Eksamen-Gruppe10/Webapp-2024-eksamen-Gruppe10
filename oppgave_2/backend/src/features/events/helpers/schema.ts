import { templateSchema } from "@/features/template/helpers/schema";
import { z } from "zod";

const eventSchema = z.object({
  id: z.string(),
  template_id: z.string(),
  title: z.string(),
  dateTime: z.coerce.date(),
  location: z.string(),
  category: z.array(z.string()),
  capacity: z.number(),
  price: z.number(),
  description: z.string(),
  private: z.boolean(),
  waitinglist: z.boolean(),
  participants: z.string().array().optional(),
  template: templateSchema.optional(),
});

const dbEventSchema = z.object({
  id: z.string(),
  template_id: z.string(),
  title: z.string(),
  dateTime: z.coerce.date(),
  location: z.string(),
  category: z.string(),
  capacity: z.number().int(),
  price: z.number(),
  description: z.string(),
  private: z.boolean(),
  waitinglist: z.boolean(),
});

const eventSchemaWithoutId = eventSchema.omit({
  id: true,
});

const dbEventSchemaWithoutId = dbEventSchema.omit({
  id: true,
});

export type Event = z.infer<typeof eventSchema>;
export type DbEvent = z.infer<typeof dbEventSchema>;
export type CreateEventDto = z.infer<typeof eventSchemaWithoutId>;
export type UpdateEventDto = Partial<CreateEventDto>;

export function validateEvent(data: unknown) {
  return eventSchema.safeParse(data);
}

export function validateEventWithoutId(data: unknown) {
  return eventSchemaWithoutId.safeParse(data);
}

export function validateDbEvent(data: unknown) {
  return dbEventSchema.safeParse(data);
}

export function validateDbEventWithoutId(data: unknown) {
  return dbEventSchemaWithoutId.safeParse(data);
}

export function validateEventArray(data: unknown) {
  return eventSchema.array().safeParse(data);
}
