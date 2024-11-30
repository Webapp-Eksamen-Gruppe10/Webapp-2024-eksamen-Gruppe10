"use client";
import TemplateSelector from "../components/TemplateSelector";
import useTemplate from "../hooks/useTemplate";

type  TemplateSelectorPageProps = {
    onSelectTemplate: (template: any) => void,
    onSkip: () => void
}

export default function TemplateSelectorPage({onSelectTemplate, onSkip}: TemplateSelectorPageProps) {
  const {templateData, add, remove} = useTemplate()

  return (
    <TemplateSelector templates={templateData} add={add} finalSelectedTemplate={onSelectTemplate} onSkip={onSkip} deleteTemplate={remove} />
  );
}
