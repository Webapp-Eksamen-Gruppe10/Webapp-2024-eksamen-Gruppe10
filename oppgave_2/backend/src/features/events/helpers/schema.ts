import { z } from "zod";

export {
  eventSchema,
  dbEventSchema,
  eventSchemaWithoutId,
  dbEventSchemaWithoutId,
  dbEventSchemaWithoutIdAndTemplate_id,
};

const eventSchema = z.object({
  id: z.string(),
  template_id: z.string().nullable(),
  title: z.string(),
  dateTime: z.coerce.date(),
  location: z.string(),
  category: z.string(),
  capacity: z.number(),
  price: z.number(),
  description: z.string(),
  private: z.boolean(),
  waitinglist: z.boolean(),
});

const dbEventSchema = z.object({
  id: z.string(),
  template_id: z.string().nullable(),
  title: z.string(),
  dateTime: z.coerce.date(),
  location: z.string(),
  category: z.string(),
  capacity: z.number(),
  price: z.number(),
  description: z.string(),
  private: z.boolean(),
  waitinglist: z.boolean(),
});

const eventsSchema = z.array(eventSchema);

const eventSchemaWithoutId = eventSchema.omit({
  id: true,
});

const dbEventSchemaWithoutId = dbEventSchema.omit({
  id: true,
});

const dbEventSchemaWithoutIdAndTemplate_id = dbEventSchema.omit({
  id: true,
  template_id: true,
});

export function validateEvent(data: unknown) {
  return eventSchema.safeParse(data);
}

export function validateEventWithoutIdAndTemplate_id(data: unknown) {
  return dbEventSchemaWithoutIdAndTemplate_id.safeParse(data);
}

export function validateEventArray(data: unknown) {
  return eventsSchema.array().safeParse(data);
}

export function validateDbEvent(data: unknown) {
  return dbEventSchema.safeParse(data);
}

export function validateEventWithoutId(data: unknown) {
  return eventSchemaWithoutId.safeParse(data);
}

export function validateDbEventWithoutId(data: unknown) {
  return dbEventSchemaWithoutId.safeParse(data);
}
