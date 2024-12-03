import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { nb } from "date-fns/locale/nb";
import { Template } from "@/features/template/lib/schema";
import { useEffect, useState } from "react";
import { Event } from "./schema";
import useEvent from "../hooks/useEvent";
import { toDate } from "date-fns/fp";

registerLocale("nb", nb);


//ChatGPT ble brukt for hjelp med casting av datotyper og feilsøking 
//ChatGPT klarte ikke å finne feilen, men etter feilsøking selv fant vi løsningen :) 
export const showPriceCorrectly = (price: number) => {
  return price === 0 ? "Gratis" : price;
};

const isStartDateAllowed = (date: Date, startsAtDates: string[]): boolean => {
  const isoDate = date.toISOString().split("T")[0]; 
  const startsAtDatesWithoutTime = startsAtDates.map((startDate) => startDate.split("T")[0]);

  const prevDate = new Date(date);
  prevDate.setDate(prevDate.getDate() + 1); 
  const prevIsoDate = prevDate.toISOString().split("T")[0];

  if (startsAtDatesWithoutTime.includes(prevIsoDate)) {
    console.log(`Blocked because previous date is in startsAtDates: ${prevIsoDate}`);
    return false;
  }

  return true; 
};


const isDayAllowed = (
  date: Date,
  allowedWeekdays: string[],
  startsAtDates: string[],
  selectedTemplateId: string | null
): boolean => {
  if (!isStartDateAllowed(date, startsAtDates)) {
    return false; 
  }

  if (!selectedTemplateId) {
    return true; 
  }

  const days = ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"];
  const weekday = days[date.getDay()];

  return allowedWeekdays.includes(weekday); 
};

export const showCorrectDatepicker = (
  selectedTemplateId: string | null,
  date: Date | null,
  setDate: React.Dispatch<React.SetStateAction<Date | null>>,
  weekdays: string[],
  template: Template
) => {
  const [startsAtDates, setStartsAtDates] = useState<string[]>([]);
  const { eventData } = useEvent();

  useEffect(() => {
    if (template.notSameDay) {
      console.log("Laster events med samme mal...");

      const events = eventData.filter((event) => event.template_id === selectedTemplateId);

      if (events.length > 0) {
        const newDates = events.map((event) => event.startsAt);
        setStartsAtDates(newDates);
        console.log("Blokkerte datoer:", newDates);
      }
    }
  }, [template, eventData, selectedTemplateId]);

  const allowedWeekdays = weekdays.map((day) => day.toLowerCase());

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
        isDayAllowed(date, allowedWeekdays, startsAtDates, selectedTemplateId)
          ? "text-green-700 bg-green-100 hover:bg-green-200"
          : "text-red-700 bg-red-100 hover:bg-red-200"
      }
      filterDate={(date) =>
        isDayAllowed(date, allowedWeekdays, startsAtDates, selectedTemplateId)
      }
    />
  );
};
