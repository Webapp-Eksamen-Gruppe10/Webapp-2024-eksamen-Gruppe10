import { Result } from "@/types";
import { Template, TemplateToDb } from "../lib/schema";
import React, { useState } from "react";
import { Event } from "@/features/event/lib/schema";

interface TemplateSelectorProps {
    onSelectTemplateId: (id:string) => void, 
    templates?: Template[];
    add: (data: Template) => Promise<void>,
    updateTemplate: (id: string, data: Template) => Promise<Result<Template>>,
    deleteTemplate: (id: string) => Promise<void>,
    finalSelectedTemplate: (template: Template) => void,
    onSkip: () => void,
    events: Event[]
}

export const defaultTemplate = {
  name: "",
  description: "",
  weekdays: [],
  notSameDay: false,
  private: false,
  lim_attend: false,
  fixed_price: false,
  free: false,
  waitinglist: false,
}

export default function TemplateSelector({ onSelectTemplateId, templates = [], add, finalSelectedTemplate, onSkip, deleteTemplate, updateTemplate, events }: TemplateSelectorProps) {
  const [formData, setFormData] = useState<Template>(defaultTemplate)
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const isEditing = !!selectedTemplate

  const allowedToDeleteUpdate = (templateId: string) => {
    const filtered = events.filter((event) => event.template_id === templateId)
    return filtered.length === 0
  }

  const getCurrentTemplateData = () => {
    return {
      name: formData.name,
      description: formData.description,
      weekdays: formData.weekdays,
      notSameDay: formData.notSameDay,
      private: formData.private,
      lim_attend: formData.lim_attend,
      fixed_price: formData.fixed_price,
      free: formData.free,
      waitinglist: formData.waitinglist,
    };
  }

  const handleWeekdayChange = (day: string, isChecked: boolean) => {
    setFormData((prev) => {
      const updatedWeekdays = isChecked
        ? [...prev.weekdays, day]
        : prev.weekdays.filter((weekday) => weekday !== day);

      return {
        ...prev,
        weekdays: updatedWeekdays,
      };
    });
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value, type} = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [id]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };
  

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if(isEditing){
        const result = await updateTemplate(selectedTemplate.id?? "", getCurrentTemplateData());
        if(!result.success){
          alert("Oppdatering av template ikke vellykket!");
        }else{
          alert("Oppdatering av template vellykket!");
        }
      }else{
        await add(getCurrentTemplateData());
        alert("Lagring av template vellykket!");
      }
      setFormData(defaultTemplate);
      setSelectedTemplate(null);
    } catch (error) {
      console.error("Feil ved opprettelse av Template:", error);
      alert("Det var en feil ved opprettelse av template.");
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto pb-2 border border-gray-300 rounded-lg shadow-md p-6 ">
      {/* Create Template Section */}
      <div className="space-y-6">
        <form onSubmit={handleUpdate}>
          <h2 className="text-2xl font-semibold">Arrangement mal</h2>
          <div>
            {isEditing ? (
              <h3 className="font-medium mb-4">Oppdater mal</h3>
            ) : (
              <h3 className="font-medium mb-4">Lag ny mal</h3>
            )}
            <div className="space-y-4">
              {/* Template Name */}
              <div>
                <label htmlFor="name" className="block font-medium mb-1">
                  Mal navn
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* No Duplicate Events */}
              <div className="flex items-center space-x-2">
                <input
                  id="notSameDay"
                  type="checkbox"
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded"
                  checked={formData.notSameDay}
                  onChange={handleChange}
                />
                <label htmlFor="notSameDay" className="font-medium">
                  Ingen andre kan ha arrangement på samme dag
                </label>
              </div>

              {/* Template Description */}
              <div>
                <label htmlFor="description" className="block font-medium mb-1">
                  Beskrivelse
                </label>
                <textarea
                  id="description"
                  className="w-full border border-gray-300 rounded px-3 py-2 min-h-[100px]"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Weekdays */}
              <div>
                <label className="block font-medium mb-4">
                  Begrenset ukedager
                </label>
                <div className="grid grid-cols-2 gap-4 border border-gray-300 rounded-lg p-4 bg-gray-50 shadow-sm">
                    {["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"].map((day) => (
                      <div key={day} className="flex items-center space-x-2">
                        <input
                          id={`weekday-${day}`}
                          type="checkbox"
                          className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring focus:ring-blue-200"
                          checked={formData.weekdays.includes(day)}
                          onChange={(e) => handleWeekdayChange(day, e.target.checked)}
                          disabled={!!selectedTemplate}
                        />
                        <label htmlFor={`weekday-${day}`} className="font-medium text-gray-800">
                          {day}
                        </label>
                      </div>
                    ))}
                </div>
              </div>

              {/* Additional Options */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    id="private"
                    type="checkbox"
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded"
                    checked={formData.private}
                    onChange={handleChange}
                  />
                  <label htmlFor="private" className="font-medium">
                    Privat arrangement
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    id="lim_attend"
                    type="checkbox"
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded"
                    checked={formData.lim_attend}
                    onChange={handleChange}
                  />
                  <label htmlFor="lim_attend" className="font-medium">
                    Begrenset plass
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    id="fixed_price"
                    type="checkbox"
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded"
                    checked={formData.fixed_price}
                    onChange={handleChange}
                  />
                  <label htmlFor="fixed_price" className="font-medium">
                    Fast pris
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    id="free"
                    type="checkbox"
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded"
                    checked={formData.free}
                    onChange={handleChange}
                  />
                  <label htmlFor="free" className="font-medium">
                    Gratis arrangement
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    id="waitinglist"
                    type="checkbox"
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded"
                    checked={formData.waitinglist}
                    onChange={handleChange}
                  />
                  <label htmlFor="waitinglist" className="font-medium">
                    Aktiver venteliste
                  </label>
                </div>
              </div>
            </div>
            <button
            type="button"
            className="w-full bg-orange-600 text-white px-4 py-2 mt-4 rounded hover:bg-orange-700"
            onClick={() => {
              setFormData(defaultTemplate);
              setSelectedTemplate(null); 
              onSelectTemplateId(""); 
            }}
          >
            Tilbakestill mal
          </button>
            {isEditing && allowedToDeleteUpdate(selectedTemplate.id?? "")? (
              <button className=" w-full bg-blue-600 text-white px-4 py-2 mt-5 mb-4 rounded hover:bg-blue-700">
              Oppdater denne malen
            </button>) : isEditing && !allowedToDeleteUpdate(selectedTemplate.id?? "")? (
            <div >
              <button disabled className=" w-full bg-gray-500 text-white px-4 py-2 mt-5 mb-4 rounded">
                Oppdater denne malen
              </button>
              <p className="">
                Arrangementer bruker denne malen. Kan ikke endres
              </p>
            </div>
            ): (
            <button className=" w-full bg-blue-600 text-white px-4 py-2 mt-5 mb-4 rounded hover:bg-blue-700">
              Lagre denne malen
            </button>)}
          </div>
        </form>
      </div>

      {/* Existing Templates Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Eksisterende mal</h2>
        <div className="min-h-[200px]">
          {templates.length === 0 ? (
            <p className="text-gray-500">Ingen mal laget enda</p>
          ) : (
            <div className="space-y-2">
              {templates.map((template) => (
                <div key={template.id} className="relative group">
                  {/* Template Button */}
                  <button
                    className={`w-full border border-gray-300 rounded px-4 py-2 text-left ${
                      selectedTemplate?.id === template.id ? "bg-gray-300" : "hover:bg-gray-100"
                    }`}
                    onClick={() => {
                      if(template.id !== selectedTemplate?.id){
                        setSelectedTemplate(template);
                        setFormData(template);
                        if(template.id){
                          onSelectTemplateId(template.id)
                        }
                      }else {
                        setFormData(defaultTemplate);
                        setSelectedTemplate(null); 
                        onSelectTemplateId(""); 
                      }
                    }}
                  >
                    {template.name}
                  </button>

                  {/* Delete Template Button */}
                  { allowedToDeleteUpdate(template.id?? "")? (
                    <button
                    className="absolute top-1/2 right-[0%] -translate-y-1/2 bg-red-500 text-white px-7 py-2 h-10 rounded hidden group-hover:block hover:bg-red-600"
                    onClick={() => {
                        if(template.id){
                            deleteTemplate(template.id)
                        }}}
                    >
                    Slett
                  </button>
                  ) : (
                    <button
                    className="absolute top-1/2 right-[0%] -translate-y-1/2 bg-gray-500 text-white px-7 py-2 h-10 rounded hidden group-hover:block hover:bg-gray-600"
                    disabled
                    >
                    Slett
                  </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          className="w-full border border-gray-300 rounded px-4 py-2 bg-gray-50 hover:bg-gray-100"
          onClick={() => {
            setSelectedTemplate(defaultTemplate);
            setFormData(defaultTemplate);
            onSelectTemplateId(""); 
            onSkip();
          }}
        >
          Hopp over valg av mal
        </button>
          {selectedTemplate?.id? (
            <button
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => {
            finalSelectedTemplate(getCurrentTemplateData());
          }}
        >
          Fortsett med valgte alternativer 
        </button>) : ( 
        <button
          disabled
          className="w-full bg-gray-500 text-white px-4 py-2 rounded"
          onClick={() => {
            finalSelectedTemplate(getCurrentTemplateData());
          }}
        >
          Fortsett med valgte alternativer 
        </button>)}
      </div>
    </div>
  );
}
