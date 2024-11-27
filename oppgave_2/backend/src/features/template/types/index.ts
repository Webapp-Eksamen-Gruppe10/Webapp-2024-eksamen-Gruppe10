import { z } from "zod";
import { dbTemplateSchema, templateSchema } from "../helpers/schema";

export type DbTemplate = z.infer<typeof dbTemplateSchema>;
export type Template = z.infer<typeof templateSchema>;