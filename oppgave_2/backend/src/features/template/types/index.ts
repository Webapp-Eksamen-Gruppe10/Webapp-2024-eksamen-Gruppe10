import { z } from "zod";
import { dbTemplateSchema, templateSchema, templateSchemaWithoutId } from "../helpers/schema";

export type TemplateWithoutId = z.infer<typeof templateSchemaWithoutId>;
export type DbTemplate = z.infer<typeof dbTemplateSchema>;
export type Template = z.infer<typeof templateSchema>;