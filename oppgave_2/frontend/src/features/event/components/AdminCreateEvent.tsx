"use client"; 
import { Template } from "@/features/template/lib/schema";
import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {nb} from "date-fns/locale/nb"; 
import { Category, EventToDb, Event } from "../lib/schema";


registerLocale("nb", nb);

type AdminCreateEventFormProps = {
  selectedTemplateId: string, 
  selectedTemplate: Template,
  add: (data: Partial<Event>) => Promise<void>, 
};

export default function AdminCreateEventForm({ selectedTemplateId, selectedTemplate, add }: AdminCreateEventFormProps) {
  const [date, setDate] = useState<Date|null>(new Date());
  const [formData, setFormData] = useState({
    name:selectedTemplate?.name || "", 
    location: "",
    category: "",
    capacity: "",
    price: "",
    description: selectedTemplate?.description || "",
    private: selectedTemplate?.private || false,
    waitinglist: selectedTemplate?.waitinglist || false,
  });

  const allowedWeekdays = selectedTemplate.weekdays.map((day) =>
    day.toLowerCase()
  );

  const isDayAllowed = (date: Date) => {
    const days = ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"];
    const weekday = days[date.getDay()];
    return allowedWeekdays.includes(weekday);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value, type } = e.target;
    
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
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!date) {
      alert("Vennligst velg en gyldig dato.");
      return;
    }

    const data: EventToDb = {
      template_id: selectedTemplateId || null,
      title: formData.name,
      createdAt: date.toISOString(),
      location: formData.location, 
      category: Category.parse(formData.category),
      capacity: Number.parseInt(formData.capacity),
      price: parseFloat(formData.price),
      description: formData.description,
      private: formData.private,
      waitinglist: formData.waitinglist,
    };
  
    
    try {
      await add(data);
      alert("Arrangementet ble opprettet!");
    } catch (error) {
      console.error("Feil under opprettelse:", error);
      alert("Noe gikk galt under opprettelse av arrangementet.");
    }
  };
  
  

  return (
      <div className="max-w-lg border border-gray-300 rounded-lg shadow-md p-6 ">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Opprett nytt arrangement</h2>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Arrangementsnavn
            </label>
            <input
              id="name"
              type="text"
              required
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
              value={formData.name}
            />
          </div>

          <div className="space-y-2">
          <label htmlFor="dato" className="block text-sm font-medium text-gray-700">  
            Dato
            </label>
              {selectedTemplateId.length > 0 ? (
                <DatePicker
                  id="dato"
                  required
                  selected={date}
                  onChange={(newDate) => setDate(newDate)}
                  locale="nb"
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={30}
                  dateFormat="Pp"
                  className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                  dayClassName={(date) =>
                    isDayAllowed(date)
                      ? "text-green-700 bg-green-100 hover:bg-green-200"
                      : "text-red-700 bg-red-100 hover:bg-red-200"
                  }
                  filterDate={isDayAllowed}
                />
              ) : (
                <DatePicker
                  id="dato"
                  required
                  selected={date}
                  onChange={(newDate) => setDate(newDate)}
                  locale="nb"
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={30}
                  dateFormat="Pp"
                  className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                />
              )}
       
          </div>

          <div className="space-y-2">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Sted
            </label>
            <input
              id="location"
              type="text"
              required
              value={formData.location}
              className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <select
              id="category"
              required
              className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
              value={formData.category}
              onChange={handleChange}
            >
              <option disabled value="">
                Velg kategori
              </option>
              {Object.values(Category.Values).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">
                Kapasitet
              </label>
              <input
                id="capacity"
                type="number"
                required
                className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Pris
              </label>
              <input
                id="price"
                type="number"
                required
                className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Beskrivelse
            </label>
            <textarea
              id="description"
              required
              className="block w-full border border-gray-300 rounded-md px-3 py-2 min-h-[100px] focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
              onChange={handleChange}
              value={formData.description}
            ></textarea>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                id="private"
                type="checkbox"
                className="w-5 h-5 border-gray-300 rounded text-blue-600 focus:ring focus:ring-blue-500"
                onChange={handleChange}
                checked={formData.private}
              />
              <label htmlFor="private" className="text-sm font-medium text-gray-700">
                Privat arrangement
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                id="waitinglist"
                type="checkbox"
                className="w-5 h-5 border-gray-300 rounded text-blue-600 focus:ring focus:ring-blue-500"
                onChange={handleChange}
                checked={formData.waitinglist}
              />
              <label htmlFor="waitinglist" className="text-sm font-medium text-gray-700">
                Aktiver venteliste
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
          >
            Opprett arrangement
          </button>
        </form>
      </div>
  );
}
