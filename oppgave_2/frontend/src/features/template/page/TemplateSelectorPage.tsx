"use client";
import TemplateSelector from "../components/TemplateSelector";
import useTemplate from "../hooks/useTemplate";

type  TemplateSelectorPageProps = {
    onSelectTemplate: (template: any) => void,
    onSkip: () => void
}

export default function TemplateSelectorPage({onSelectTemplate, onSkip}: TemplateSelectorPageProps) {
    const {templateData} = useTemplate()


  return (
    <TemplateSelector templates={templateData} />
  );
}
