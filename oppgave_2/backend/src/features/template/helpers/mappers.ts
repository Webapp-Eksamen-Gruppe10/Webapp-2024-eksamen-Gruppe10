import {
  DbTemplate,
  DbTemplateWithoutId,
  Template,
  TemplateWithoutId,
} from "../types";

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
    description: template.description,
    private: template.private,
    waitinglist: template.waitinglist,
    name: template.name,
    notSameDay: template.notSameDay,
    lim_attend: template.lim_attend,
    fixed_price: template.fixed_price,
    free: template.free,
    weekdays: JSON.stringify(template.weekdays),
  };
  return dbTemplate;
};
