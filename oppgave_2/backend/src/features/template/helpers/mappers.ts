import { DbTemplate, Template } from "../types";

export const ToTemplate = (dbTemplate : DbTemplate): Template => {
    const template: Template = {
        ...dbTemplate,
        weekdays: JSON.parse(dbTemplate.weekdays)
    }
    return template;
}

export const CreateTemplateToDb = (template : Omit<Template, "id">): DbTemplate => {
    const dbTemplate: DbTemplate = {
        ...template,
        id: crypto.randomUUID(),
        weekdays: JSON.stringify(template.weekdays)
    }
    return dbTemplate
}

export const UpdateTemplateToDb = (template : Template): DbTemplate => {
    const dbTemplate: DbTemplate = {
        ...template,
        weekdays: JSON.stringify(template.weekdays)
    }
    return dbTemplate
}