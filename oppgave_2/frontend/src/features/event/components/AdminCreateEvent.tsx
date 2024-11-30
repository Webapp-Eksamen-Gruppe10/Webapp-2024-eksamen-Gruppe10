import { Template } from "@/features/template/lib/schema";
import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import nb from "date-fns/locale/nb"; 

registerLocale("nb", nb);

type AdminCreateEventFormProps = {
  selectedTemplate: Template,
}

export default function AdminCreateEventForm({selectedTemplate}: AdminCreateEventFormProps) {
  const [date, setDate] = useState<Date | null>(null);

  // Tillatte ukedager fra template (forventes som ["monday", "wednesday", ...])
  const allowedWeekdays = selectedTemplate.weekdays.map((day) =>
    day.toLowerCase()
  );


  const isDayAllowed = (date: Date) => {
    const days = ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"];
    const weekday = days[date.getDay()];
    return allowedWeekdays.includes(weekday);
  };
  
  console.log("VALGT TEMPLATE: ", selectedTemplate)
    return (

      <div className="w-full max-w-lg border border-gray-300 rounded-lg shadow-md p-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Opprett nytt arrangement</h2>
        </div>
        <form className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Arrangementsnavn
            </label>
            <input
              id="name"
              type="text"
              required
              className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
              value={selectedTemplate?.name}
            />
          </div>
  
          <div className="space-y-2">
            <label htmlFor="datetime" className="block text-sm font-medium text-gray-700">
              Dato & Tid
            </label>
            <DatePicker
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
                  ? "text-green-700 bg-green-100 hover:bg-green-200" // Tillatte dager
                  : "text-red-700 bg-red-100 hover:bg-red-200" // Ikke-tillatte dager
              }
              filterDate={isDayAllowed} // Blokker datoer som ikke er tillatt
            />
       
          </div>
  
          <div className="space-y-2">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Sted
            </label>
            <input
              id="location"
              type="text"
              required
              className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
  
          <div className="space-y-2">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Kategori
            </label>
            <input
              id="category"
              type="text"
              required
              className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
            />
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
              value={selectedTemplate?.description}
            ></textarea>
          </div>
  
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                id="private"
                type="checkbox"
                className="w-5 h-5 border-gray-300 rounded text-blue-600 focus:ring focus:ring-blue-500"
                checked={selectedTemplate?.private}
              />
              <label htmlFor="private" className="text-sm font-medium text-gray-700">
                Privat arrangement
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                id="waitlist"
                type="checkbox"
                className="w-5 h-5 border-gray-300 rounded text-blue-600 focus:ring focus:ring-blue-500"
                checked={selectedTemplate?.waitinglist}
              />
              <label htmlFor="waitlist" className="text-sm font-medium text-gray-700">
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
  