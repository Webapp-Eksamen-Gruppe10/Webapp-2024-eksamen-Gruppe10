import { z } from "zod";
import {
  dbEventSchema,
  dbEventSchemaWithoutId,
  eventSchema,
  eventSchemaWithoutId,
} from "../helpers/schema";

export type EventWithoutId = z.infer<typeof eventSchemaWithoutId>;
export type DbEventWithoutId = z.infer<typeof dbEventSchemaWithoutId>;
export type DbEvent = z.infer<typeof dbEventSchema>;
export type Event = z.infer<typeof eventSchema>;

// export type Event = {
//   id: string;
//   Event_id: string;
//   title: string;
//   dateTime: Date;
//   location: string;
//   category: string;
//   capacity: number;
//   price: number;
//   description: string;
//   private: boolean;
//   waitinglist: boolean;
// };

// export type DbEvent = {
//   id: string;
//   Event_id: string;
//   title: string;
//   dateTime: Date;
//   location: string;
//   category: string;
//   capacity: number;
//   price: number;
//   description: string;
//   private: boolean;
//   waitinglist: boolean;
// };

// export type EventWithNullableDateTime = Omit<Event, "dateTime"> & {
//   dateTime: Date | null;
// };

// export type CreateEventDto = Pick<
//   Event,
//   | "Event_id"
//   | "title"
//   | "dateTime"
//   | "location"
//   | "category"
//   | "capacity"
//   | "price"
//   | "description"
//   | "private"
//   | "waitinglist"
// >;

// export type UpdateEventDto = Partial<CreateEventDto>;

// export const eventFields: (keyof Event)[] = [
//   "id",
//   "Event_id",
//   "title",
//   "dateTime",
//   "location",
//   "category",
//   "capacity",
//   "price",
//   "description",
//   "private",
//   "waitinglist",
// ];

// export type EventKeys = keyof Event;
