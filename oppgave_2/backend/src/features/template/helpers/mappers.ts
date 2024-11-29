import {
  DbTemplate,
  DbTemplateWithoutId,
  Template,
  TemplateWithoutId,
} from "../types";
import {
  validateDbTemplate,
  validateDbTemplateWithoutId,
  validateTemplate,
  validateTemplateArray,
} from "./schema";

export const ToTemplateObject = (dbTemplate: DbTemplate): Template => {
  const template: Template = {
    ...dbTemplate,
    weekdays: JSON.parse(dbTemplate.weekdays),
  };
  return template;
};

export const ToTemplateArray = (dbTemplates: DbTemplate[]): Template[] => {
  const templates: Template[] = [];

  dbTemplates.map((dBtemplate) => {
    templates.push({
      ...dBtemplate,
      weekdays: JSON.parse(dBtemplate.weekdays),
    });
  });

  return templates;
};

export const CreateTemplateToDb = (template: TemplateWithoutId): DbTemplate => {
  const dbTemplate: DbTemplate = {
    ...template,
    id: crypto.randomUUID(),
    weekdays: JSON.stringify(template.weekdays),
  };
  return dbTemplate;
};

export const UpdateTemplateToDb = (template: Template): DbTemplateWithoutId => {
  const dbTemplate: DbTemplateWithoutId = {
    ...template,
    weekdays: JSON.stringify(template.weekdays),
  };
  return dbTemplate;
};
