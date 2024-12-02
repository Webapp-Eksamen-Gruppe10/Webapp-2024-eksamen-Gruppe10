import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { nb } from "date-fns/locale/nb";

registerLocale("nb", nb);

export const showPriceCorrectly = (price: number) => {
  return price === 0 ? "Gratis" : price;
};

export const showCorrectDatepicker = (
  selectedTemplateId: string | null,
  date: Date | null,
  setDate: React.Dispatch<React.SetStateAction<Date | null>>,
  weekdays?: string[],
  templates?: { id: string; weekdays: string[] }[]
) => {
  
  const allowedWeekdays = weekdays
    ? weekdays.map((day) => day.toLowerCase())
    : selectedTemplateId && templates
    ? templates
        .find((template) => template.id === selectedTemplateId)
        ?.weekdays.map((day) => day.toLowerCase()) || []
    : [];

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
