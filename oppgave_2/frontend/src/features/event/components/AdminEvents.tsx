import { Event } from "@/features/event/lib/schema";
import { useEffect, useState } from "react";
import Link from "next/link";
import { formatDate } from "@/lib/helpers";
import { Template } from "@/features/template/lib/schema";
import { SafeParseReturnType } from "zod";

type AdminEventProps = {
    events: Event[],
    remove: (id: string) => Promise<void>,
    update: (id: string, data: Partial<Event>) => Promise<void>,
    templates: Template[]
     

}

export default function AdminEvents({events, remove, update, templates} : AdminEventProps) {
    
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState<Event | null>(null);
  const [editDataTemplate, setEditDataTemplate] = useState<Template | null>(null); 
 

  // Pagination logic
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  const totalPages = Math.ceil(events.length / eventsPerPage);

  const template_id = editData?.template_id


  useEffect(() => {
    if (editData?.template_id) {
      const template = templates.find((template) => template.id === editData.template_id);
      if (template) {
        setEditDataTemplate(template);
      }
    }
  }, [editData, templates]);
  
  
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleEdit = (event: Event) => {
    setEditData(event);
    setShowEditModal(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editData) {
      await update(editData.id, editData);
      setShowEditModal(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Er du sikker på at du vil slette dette arrangementet?")) {
      await remove(id);
    }
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
          <div
            key={event.id}
            className="border border-gray-300 rounded-lg p-4 shadow hover:shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Dato:</strong> {formatDate(event.createdAt)}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Kategori:</strong> {event.category} 
            </p>
            <p className="text-sm text-gray-600 mb-3">
              <strong>Kapasitet:</strong> {event.capacity || "Ubegrenset"} deltagere
            </p>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(event)}
                className="px-3 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                Rediger
              </button>
              <button className="px-3 py-2 text-sm text-white bg-red-600 rounded hover:bg-red-700"
              onClick={() => {handleDelete(event.id)}}>
                Slett
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-between items-center">
        <div className="text-sm text-gray-700">
          Viser {indexOfFirstEvent + 1} til {Math.min(indexOfLastEvent, events.length)} av{" "}
          {events.length} arrangementer
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

      {/* Edit Modal */}
      {showEditModal && editData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Rediger Event</h2>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Tittel
                </label>
                <input
                  type="text"
                  id="title"
                  value={editData.title}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                  Dato
                </label>
                <input
                  type="date"
                  id="date"
                  value={editData.createdAt.split("T")[0]}
                  onChange={(e) =>
                    setEditData({ ...editData, createdAt: `${e.target.value}T${editData.createdAt.split("T")[1]}` })
                  }
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                  Tid
                </label>
                <input
                  type="time"
                  id="time"
                  value={editData.createdAt.split("T")[1]?.slice(0, 5) || ""}
                  onChange={(e) =>
                    setEditData({ ...editData, createdAt: `${editData.createdAt.split("T")[0]}T${e.target.value}:00` })
                  }
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Lokasjon
                </label>
                <input
                  type="text"
                  id="location"
                  value={editData.location}
                  onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                />
              </div>
              {editData.capacity !== null && (
                <div className="mb-4">
                  <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">
                    Kapasitet
                  </label>
                  <input
                    type="number"
                    id="capacity"
                    value={editData.capacity}
                    onChange={(e) =>
                      setEditData({ ...editData, capacity: e.target.value ? Number(e.target.value) : null })
                    }
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              )}
              {editDataTemplate?.fixed_price === false ? (
              <div className="mb-4">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Pris
                </label>
                <input
                  type="number"
                  id="price"
                  value={editData.price}
                  onChange={(e) => setEditData({ ...editData, price: Number(e.target.value) })}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                />
              </div>
            ) : (
              <div className="mb-4">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Pris
                </label>
                <input
                  type="number"
                  id="price"
                  value={editData.price}
                  disabled  
                  className="mt-1 block w-full p-2 border border-gray-300 rounded bg-gray-100"
                />
              </div>
            )}

              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Beskrivelse
                </label>
                <textarea
                  id="description"
                  value={editData.description}
                  onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Avbryt
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                  Lagre
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}