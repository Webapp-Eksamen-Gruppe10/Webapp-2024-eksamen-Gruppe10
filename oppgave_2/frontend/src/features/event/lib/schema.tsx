import { z } from "zod";

/*
    id: event.id,
    template_id: event.template_id,
    title: event.title,
    datetime: event.datetime ? new Date(event.datetime) : null,
    location: event.location,
    category: event.category,
    capacity: event.capacity,
    price: event.price,
    description: event.description,
    private: event.private,
    waitinglist: event.waitinglist,
*/
const eventSchema = z.object({
  id: z.string().uuid(),
  template_id: z.coerce.number(),
  title: z.string().max(50),
  datetime: z.string().datetime({ offset: true }),
  location: z.string().max(45),
  category: z.string().max(45),
  capacity: z.string().max(45),
  price: z.number(),
  description: z.string().max(150),
  private: z.boolean(),
  waitinglist: z.boolean(),

});


const eventSchemaToDb = z.object({
  capacity: z.string().max(45),
  title: z.string().max(50),
  datetime: z.string().datetime({ offset: true }),
  location: z.string().max(45),
  category: z.string().max(45),
  price: z.number(),
  description: z.string().max(150),
  private: z.boolean(),
  waitinglist: z.boolean(),
  template_id: z.coerce.number(),
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
