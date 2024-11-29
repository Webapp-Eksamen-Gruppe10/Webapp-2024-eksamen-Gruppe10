
import React, { useState } from "react";
import Link from "next/link";
import {Event } from "@/features/event/lib/schema"

type EventProps = {
    events: Event[]
}

export default function Events({ events }: EventProps) {
    
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.datetime);
    const eventMonth = eventDate.getMonth() + 1;
    const eventYear = eventDate.getFullYear();

    const matchesMonth = selectedMonth
      ? eventMonth === parseInt(selectedMonth)
      : true;
    const matchesYear = selectedYear
      ? eventYear === parseInt(selectedYear)
      : true;
    const matchesType = selectedType
      ? event.category === selectedType
      : true;

    return matchesMonth && matchesYear && matchesType;
  });

  return (
    <div className="container mx-auto p-4 pb-20">
      <h1 className="text-3xl font-bold mb-6">Events</h1>
      <div className="flex items-center gap-4 mb-6">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2"
        >
          <option value="">Select Month</option>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>

        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2"
        >
          <option value="">Select Year</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2"
        >
          <option value="">Select Event Type</option>
          <option value="Concert">Concert</option>
          <option value="Workshop">Workshop</option>
          <option value="Conference">Conference</option>
          <option value="Festival">Festival</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <Link key={event.id} href={`/events/${event.id}`} className="block">
              <div className="border border-gray-300 rounded p-4 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="mb-2">Date: {new Date(event.datetime).toLocaleDateString()}</p>
                <p className="mb-2">Type: {event.category}</p>
                <p>Price: {event.price}</p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500 col-span-full">
            No events found for the selected filters.
          </p>
        )}
      </div>
    </div>
  );
};
