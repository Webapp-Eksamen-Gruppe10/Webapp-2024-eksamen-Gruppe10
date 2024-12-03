"use client";
import { Event } from "@/features/event/lib/schema";
import TemplateSelector from "../components/TemplateSelector";
import useTemplate from "../hooks/useTemplate";
import { Template } from "../lib/schema";

type  TemplateSelectorPageProps = {
    onSelectTemplateId: (id: string) => void, 
    onSelectTemplate: (template: Template) => void,
    onSkip: () => void,
    eventData: Event[]
    
}

export default function TemplateSelectorPage({onSelectTemplateId, onSelectTemplate, onSkip, eventData}: TemplateSelectorPageProps) {
  const {templateData, add, remove, update} = useTemplate()
 
  return (
    <TemplateSelector events={eventData} updateTemplate={update} onSelectTemplateId = {onSelectTemplateId} templates={templateData} add={add} finalSelectedTemplate={onSelectTemplate} onSkip={onSkip} deleteTemplate={remove}/>
  );
}
