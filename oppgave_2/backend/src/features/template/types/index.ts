import { z } from "zod";
import { dbTemplateSchema, dbTemplateSchemaWithoutId, templateSchema, templateSchemaWithoutId } from "../helpers/schema";

export type TemplateWithoutId = z.infer<typeof templateSchemaWithoutId>;
export type DbTemplateWithoutId = z.infer<typeof dbTemplateSchemaWithoutId>;
export type DbTemplate = z.infer<typeof dbTemplateSchema>;
export type Template = z.infer<typeof templateSchema>;