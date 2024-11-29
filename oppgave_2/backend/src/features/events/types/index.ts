import { z } from "zod";
import {
  dbEventSchema,
  dbEventSchemaWithoutId,
  dbEventSchemaWithoutIdAndTemplate_id,
  eventSchema,
  eventSchemaWithoutId,
} from "../helpers/schema";

export type EventWithoutId = z.infer<typeof eventSchemaWithoutId>;
export type DbEventWithoutId = z.infer<typeof dbEventSchemaWithoutId>;
export type DbEventWithoutIdAndTemplateId = z.infer<
  typeof dbEventSchemaWithoutIdAndTemplate_id
>;
export type DbEvent = z.infer<typeof dbEventSchema>;
export type Event = z.infer<typeof eventSchema>;
