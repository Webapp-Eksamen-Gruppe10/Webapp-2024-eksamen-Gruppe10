import { z } from "zod";

export const Category = z.enum([
  "Konsert",
  "Workshop",
  "Konferanse",
  "Festival",
  "Teater",
  "Sport",
  "Trening",
  "Kunstutstilling",
  "Webinar",
  "Lansering",
]);

export {
  eventSchema,
  dbEventSchema,
  eventSchemaWithoutIdCurrentCap,
  dbEventSchemaWithoutIdCurrentCap,
  dbEventSchemaWithoutIdAndTemplate_id,
  dbEventSchemaWithoutId,
};

const eventSchema = z.object({
  id: z.string(),
  template_id: z.string().nullable().optional(),
  title: z.string(),
  startsAt: z.coerce.date(),
  location: z.string(),
  category: Category,
  capacity: z.number().nullable(),
  currentCapacity: z.number(),
  price: z.number(),
  description: z.string(),
  private: z.boolean(),
  waitinglist: z.boolean(),
});

const dbEventSchema = z.object({
  id: z.string(),
  template_id: z.string().nullable().optional(),
  title: z.string(),
  startsAt: z.coerce.date(),
  location: z.string(),
  category: z.string(),
  capacity: z.number().nullable(),
  currentCapacity: z.number(),
  price: z.number(),
  description: z.string(),
  private: z.boolean(),
  waitinglist: z.boolean(),
});

const eventsSchema = z.array(eventSchema);

const eventSchemaWithoutIdCurrentCap = eventSchema.omit({
  id: true,
  currentCapacity: true,
});

const dbEventSchemaWithoutIdCurrentCap = dbEventSchema.omit({
  id: true,
  currentCapacity: true,
});

const dbEventSchemaWithoutIdAndTemplate_id = dbEventSchema.omit({
  id: true,
  template_id: true,
});

const dbEventSchemaWithoutId = dbEventSchema.omit({
  id: true,
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

export function validateEventWithoutIdCurrentCap(data: unknown) {
  return eventSchemaWithoutIdCurrentCap.safeParse(data);
}

export function validateDbEventWithoutIdCurrentCap(data: unknown) {
  return dbEventSchemaWithoutIdCurrentCap.safeParse(data);
}

export function validateDbEventWithoutId(data: unknown) {
  return dbEventSchemaWithoutId.safeParse(data);
}
