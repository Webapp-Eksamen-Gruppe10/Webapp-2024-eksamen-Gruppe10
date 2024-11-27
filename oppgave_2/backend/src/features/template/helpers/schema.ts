import { z } from "zod";

export { templateSchema, dbTemplateSchema}

const templateSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    weekdays: z.string().array(),
    notSameDay: z.boolean(),
    private: z.boolean(),
    lim_attend: z.boolean(),
    fixed_price: z.boolean(),
    free: z.boolean(),
    waitinglist: z.boolean(),
})

const dbTemplateSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    weekdays: z.string(),
    notSameDay: z.boolean(),
    private: z.boolean(),
    lim_attend: z.boolean(),
    fixed_price: z.boolean(),
    free: z.boolean(),
    waitinglist: z.boolean(),
})

export function validateTemplate(data: unknown) {
    return templateSchema.parse(data)
}

export function validateDbTemplate(data: unknown) {
    return dbTemplateSchema.parse(data)
}



