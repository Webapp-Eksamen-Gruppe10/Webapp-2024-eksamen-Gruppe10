"use client"; 
import { useState } from "react";
import AdminCreateEventPage from "@/features/event/page/AdminCreateEventPage";
import TemplateSelectorPage from "@/features/template/page/TemplateSelectorPage";
import { Template } from "@/features/template/lib/schema";
import { defaultTemplate } from "@/features/template/components/TemplateSelector";

export default function NewEventPage() {

  const [currentStep, setCurrentStep] = useState(1); 
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(defaultTemplate); 
  const [templateId, setTemplateId] = useState<string>(""); 
  const steps = ["Velg mal", "Opprett arrangement"];


  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSkipTemplate = () => {
    setCurrentStep(2); 
  };

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
    setCurrentStep(2); 
  };

  const handleTemplateIdSelect = (id: string) => {
    setTemplateId(id);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Breadcrumb navigation */}
      <div className="flex  mb-6">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div
              className={`px-6 py-2 rounded-full text-sm font-semibold ${
                currentStep === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {step}
            </div>
            {index < steps.length - 1 && (
              <div className="w-8 h-[2px] bg-gray-400 mx-2"></div>
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div>
        {currentStep === 1 && (
          <TemplateSelectorPage
            onSelectTemplateId={handleTemplateIdSelect}
            onSelectTemplate={handleTemplateSelect}
            onSkip={handleSkipTemplate}
          />
        )}

        {currentStep === 2 && (
          <AdminCreateEventPage
            selectedTemplateId={templateId}
            selectedTemplate={selectedTemplate}
          />
        )}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between mt-6">
        {currentStep > 1 && (
          <button
            className="px-6 py-3 bg-gray-200 text-sm font-semibold rounded hover:bg-gray-300 transition"
            onClick={handlePreviousStep}
          >
            Tilbake
          </button>
        )}
      </div>
    </div>
  );
}
