import { z } from "zod";
import {
  dbEventSchema,
  dbEventSchemaWithoutIdCurrentCap,
  dbEventSchemaWithoutIdAndTemplate_id,
  eventSchema,
  eventSchemaWithoutIdCurrentCap,
  Category,
} from "../helpers/schema";

export type EventWithoutId = z.infer<typeof eventSchemaWithoutIdCurrentCap>;
export type DbEventWithoutId = z.infer<typeof dbEventSchemaWithoutIdCurrentCap>;
export type DbEventWithoutIdAndTemplateId = z.infer<
  typeof dbEventSchemaWithoutIdAndTemplate_id
>;
export type DbEvent = z.infer<typeof dbEventSchema>;
export type Event = z.infer<typeof eventSchema>;

export type CategoryEnum = z.infer<typeof Category>;
