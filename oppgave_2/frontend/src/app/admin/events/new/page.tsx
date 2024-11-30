"use client"; 
import { useState } from "react";
import AdminCreateEventPage from "@/features/event/page/AdminCreateEventPage";
import TemplateSelectorPage from "@/features/template/page/TemplateSelectorPage";
import useTemplate from "@/features/template/hooks/useTemplate";
import { Template } from "@/features/template/lib/schema";

export default function NewEventPage() {

  const [currentStep, setCurrentStep] = useState(1); 
  const [selectedTemplate, setSelectedTemplate] = useState<Template| null>(null); 

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };


  const handleSkipTemplate = () => {
    setCurrentStep(2); 
  };

  const handleTemplateSelect = (template:Template) => {
    setSelectedTemplate(template);
    setCurrentStep(2); 
  };

  return (
    <div>
      {currentStep === 1 && (
        <TemplateSelectorPage
          onSelectTemplate={handleTemplateSelect}
          onSkip={handleSkipTemplate}
        />
      )}

      {currentStep === 2 && (
        <AdminCreateEventPage selectedTemplate={selectedTemplate} />
      )}
    </div>
  );
}
