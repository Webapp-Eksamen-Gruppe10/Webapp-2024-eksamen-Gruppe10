import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { nb } from "date-fns/locale/nb";
import { Template } from "@/features/template/lib/schema";
import { useEffect } from "react";
import { Event } from "./schema";

registerLocale("nb", nb);

export const showPriceCorrectly = (price: number) => {
  return price === 0 ? "Gratis" : price;
};


// Denne funksjonen fungerte når den kun var brukt i AdminCreateEvent.tsx
// Brukte chatGPT til å gjøre nødvendige endringer for at den også kunne brukes i AdminEvents.tsx
// src: https://chatgpt.com/share/674e0e5a-ca10-8013-bd70-4e7134e0c647
export const showCorrectDatepicker = (
  selectedTemplateId: string | null,
  date: Date | null,
  setDate: React.Dispatch<React.SetStateAction<Date | null>>,
  weekdays: string[],
  template: Template,
  eventData: Event[], 

) => {


  
  if(template.notSameDay){

    useEffect(() => {
      eventData.map((event) => {
      if (event.template_id) {
        const events = eventData.find(
          (event) => template.id === event.template_id
        );
        if (events) {
          console.log("EVENTS MED SAMME MAL:", events)
        }
      }
    }, [template]);
  })
}
  const allowedWeekdays = weekdays.map((day) => day.toLowerCase());

  const isDayAllowed = (date: Date) => {
    const days = ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"];
    const weekday = days[date.getDay()];
    return allowedWeekdays.includes(weekday);
  };

  return (
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
  );
};
