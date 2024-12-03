import { z } from "zod";
import {
  dbEventSchema,
  dbEventSchemaWithoutIdCurrentCap,
  dbEventSchemaWithoutIdAndTemplate_id,
  eventSchema,
  eventSchemaWithoutIdCurrentCap,
  Category,
  dbEventSchemaWithoutId,
} from "../helpers/schema";

export type EventWithoutId = z.infer<typeof eventSchemaWithoutIdCurrentCap>;
export type DbEventWithoutId = z.infer<typeof dbEventSchemaWithoutId>;
export type DbEventWithoutIdAndTemplateId = z.infer<
  typeof dbEventSchemaWithoutIdAndTemplate_id
>;
export type DbEventWithoutIdCurrentCap = z.infer<
  typeof dbEventSchemaWithoutIdCurrentCap
>;

export type DbEvent = z.infer<typeof dbEventSchema>;
export type Event = z.infer<typeof eventSchema>;

export type CategoryEnum = z.infer<typeof Category>;
