"use client";
import TemplateSelector from "../components/TemplateSelector";
import useTemplate from "../hooks/useTemplate";
import { Template } from "../lib/schema";

type  TemplateSelectorPageProps = {
    onSelectTemplateId: (id: string) => void, 
    onSelectTemplate: (template: Template) => void,
    onSkip: () => void
    
}

export default function TemplateSelectorPage({onSelectTemplateId, onSelectTemplate, onSkip}: TemplateSelectorPageProps) {
  const {templateData, add, remove} = useTemplate()
 
  return (
    <TemplateSelector onSelectTemplateId = {onSelectTemplateId} templates={templateData} add={add} finalSelectedTemplate={onSelectTemplate} onSkip={onSkip} deleteTemplate={remove}/>
  );
}
