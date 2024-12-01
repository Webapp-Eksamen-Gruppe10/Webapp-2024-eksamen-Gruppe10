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
])

const eventSchema = z.object({
  id: z.string(),
  template_id: z.string().nullable(),
  title: z.string(),
  createdAt: z.string().datetime(),
  location: z.string(),
  category: Category,
  capacity: z.number().nullable(),
  currentCapacity: z.number(),
  price: z.number(),
  description: z.string().max(150),
  private: z.boolean(),
  waitinglist: z.boolean(),

});


const eventSchemaToDb = z.object({
  template_id: z.string().nullable(),
  title: z.string(),
  createdAt: z.string().datetime(),
  location: z.string(),
  category: Category,
  capacity: z.number().nullable(),
  currentCapacity: z.number().optional(),
  price: z.number(),
  description: z.string().max(150),
  private: z.boolean(),
  waitinglist: z.boolean(),

});


const eventListSchema = z.array(eventSchema);
const eventListSchemaToDb = z.array(eventSchemaToDb);

export function validateEvent(data: unknown) {
  return eventSchema.safeParse(data);
}

export function validateEventList(data: unknown) {
  return eventListSchema.safeParse(data);
}

export function validateEventToDb(data: unknown) {
  return eventSchemaToDb.safeParse(data);
}

export function validateEventListToDb(data: unknown) {
  return eventListSchemaToDb.safeParse(data);
}

export {
  eventSchema,
  eventSchemaToDb,
  eventListSchema,
  eventListSchemaToDb,
};

export type Event = z.infer<typeof eventSchema>;
export type EventToDb = z.infer<typeof eventSchemaToDb>;
