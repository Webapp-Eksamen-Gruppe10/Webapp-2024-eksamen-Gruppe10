import { DbTemplate, DbTemplateWithoutId, Template } from "../types";
import { validateDbTemplate, validateDbTemplateWithoutId, validateTemplate, validateTemplateArray } from "./schema";

export const ToTemplateObject = (dbTemplate : DbTemplate): Template => {
    const template: Template = {
        ...dbTemplate,
        weekdays: JSON.parse(dbTemplate.weekdays)
    }
    return validateTemplate(template);
}

export const ToTemplateArray = (dbTemplates : DbTemplate[]): Template[] => {

    const templates : Template[] = []

    dbTemplates.map((dBtemplate) => {
        templates.push({
            ...dBtemplate,
            weekdays: JSON.parse(dBtemplate.weekdays)
        })
    })

    return validateTemplateArray(templates)
}

export const CreateTemplateToDb = (template : Omit<Template, "id">): DbTemplate => {
    const dbTemplate: DbTemplate = {
        ...template,
        id: crypto.randomUUID(),
        weekdays: JSON.stringify(template.weekdays)
    }
    return validateDbTemplate(dbTemplate)
}

export const UpdateTemplateToDb = (template : Template): DbTemplateWithoutId => {
    const dbTemplate: DbTemplateWithoutId = {
        ...template,
        weekdays: JSON.stringify(template.weekdays)
    }
    return validateDbTemplateWithoutId(dbTemplate)
}