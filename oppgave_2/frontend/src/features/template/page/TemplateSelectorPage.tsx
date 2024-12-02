"use client";
import TemplateSelector from "../components/TemplateSelector";
import useTemplate from "../hooks/useTemplate";
import { Template } from "../lib/schema";

type  TemplateSelectorPageProps = {
    onSelectTemplateId: (id: string) => void, 
    onSelectTemplate: (template: Template) => void,
    onSkip: () => void,
    allowedToDeleteUpdate: boolean
    
}

export default function TemplateSelectorPage({onSelectTemplateId, onSelectTemplate, onSkip, allowedToDeleteUpdate}: TemplateSelectorPageProps) {
  const {templateData, add, remove, update} = useTemplate()
 
  return (
    <TemplateSelector allowedToDeleteOrUpdate={allowedToDeleteUpdate} updateTemplate={update} onSelectTemplateId = {onSelectTemplateId} templates={templateData} add={add} finalSelectedTemplate={onSelectTemplate} onSkip={onSkip} deleteTemplate={remove}/>
  );
}
