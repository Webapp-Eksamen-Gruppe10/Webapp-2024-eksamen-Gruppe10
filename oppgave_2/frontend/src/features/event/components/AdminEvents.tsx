import { Event } from "@/features/event/lib/schema";
import { useState } from "react";
import Link from "next/link";
import { formatDate } from "@/features/registration/lib/helpers";

type AdminEventProps = {
    events: Event[],
    remove: (id: string) => Promise<void>,

}

export default function AdminEvents({events, remove} : AdminEventProps) {
    
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;

  // Pagination logic
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  const totalPages = Math.ceil(events.length / eventsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Arrangementoversikt</h1>

      {/* Create New Event */}
      <div className="mb-4">
        <Link href="/admin/events/new">
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Opprett nytt arrangement
            </button>
        </Link>
        </div>

      {/* Event Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentEvents.map((event) => (
          <div key={event.id} className="border border-gray-300 rounded-lg p-4 shadow hover:shadow-lg">
            <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Dato:</strong> {formatDate(event.datetime)}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Type:</strong> {event.category || "N/A"}
            </p>
            <p className="text-sm text-gray-600 mb-3">
              <strong>Kapasitet:</strong> {event.capacity || "N/A"}
            </p>
            <div className="flex space-x-2">
              <button className="px-3 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700">
                Rediger
              </button>
              <button className="px-3 py-2 text-sm text-white bg-red-600 rounded hover:bg-red-700"
              onClick={() => {remove(event.id)}}>
                Slett
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-between items-center">
        <div className="text-sm text-gray-700">
          Viser {indexOfFirstEvent + 1} til {Math.min(indexOfLastEvent, events.length)} av {events.length} arrangementer
        </div>
        <div className="space-x-2">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
          >
            Forrige
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
          >
            Neste
          </button>
        </div>
      </div>
    </div>
  );
}