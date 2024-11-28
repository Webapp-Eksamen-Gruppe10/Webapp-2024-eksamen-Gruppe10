import { z } from "zod";

const eventSchema = z.object({
  id: z.string(),
  template_id: z.string(),
  title: z.string(),
  datetime: z.coerce.date(),
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
  template_id: z.string(),
  title: z.string(),
  dateime: z.coerce.date(),
  location: z.string(),
  category: z.string(),
  capacity: z.number().int(),
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

// const updateEventSchema = eventSchemaWithoutId.partial();

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
// export function validateUpdateEvent(data: unknown) {
//   return updateEventSchema.safeParse(data);
// }
