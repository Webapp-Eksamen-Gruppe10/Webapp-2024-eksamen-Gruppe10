'use client';

import { useState } from 'react';
import { Registration } from '../lib/schema';

type AdminRegistrationFormProps = {
  eventId: string, 
  registrationData: Registration[];
  registrationStatus: {
    idle: boolean;
    loading: boolean;
    success: boolean;
    error: boolean;
    fetching: boolean;
  };
  addRegistration: (data: Omit<Registration, "id">) => Promise<void>;
  updateRegistration: (id: string, data: Partial<Registration>) => Promise<void>;
  deleteRegistration: (id: string) => Promise<void>;
};


export default function AdminRegistrationForm({
  eventId, 
  registrationData,
  registrationStatus,
  addRegistration,
  updateRegistration,
  deleteRegistration,
}: AdminRegistrationFormProps) {
  const [newParticipant, setNewParticipant] = useState({ name: "", email: "" });

  const handleAddParticipant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newParticipant.name && newParticipant.email) {
      await addRegistration({
        name: newParticipant.name,
        email: newParticipant.email,
        status: "pending",
        phoneNumber: '',
        event_id: eventId,
        createdAt: '',
        participants: []
      });
      setNewParticipant({ name: "", email: "" });
    }
  };

  const handleAction = async (id: string, action: "approve" | "reject" | "delete") => {
    if (action === "delete") {
      await deleteRegistration(id);
    } else {
      await updateRegistration(id, {
        status: action === "approve" ? "approved" : "rejected",
      });
    }
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Administrasjon av Påmeldinger
      </h1>

      <div className="bg-white shadow rounded-lg p-4 mb-8">
        <h2 className="text-xl font-semibold mb-4">Legg til manuell påmelding</h2>
        <form onSubmit={handleAddParticipant} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Navn
            </label>
            <input
              id="name"
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={newParticipant.name}
              onChange={(e) =>
                setNewParticipant((prev) => ({ ...prev, name: e.target.value }))
              }
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              E-post
            </label>
            <input
              id="email"
              type="email"
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={newParticipant.email}
              onChange={(e) =>
                setNewParticipant((prev) => ({ ...prev, email: e.target.value }))
              }
              required
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Legg til deltaker
          </button>
        </form>
      </div>

      <div className="space-y-4">
        {registrationData.map((participant) => (
          <div key={participant.id} className="bg-white shadow rounded-lg p-4 flex flex-col space-y-2">
            <div className="flex justify-between">
              <div>
                <h3 className="text-lg font-semibold">{participant.name}</h3>
                <p className="text-sm text-gray-500">{participant.email}</p>
              </div>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full flex items-center justify-center ${
                  participant.status === "approved"
                    ? "bg-green-100 text-green-800"
                    : participant.status === "rejected"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {participant.status}
                </span>

            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleAction(participant.id, "approve")}
                className="px-4 py-2 text-sm bg-green-500 text-white rounded shadow hover:bg-green-600 focus:ring-2 focus:ring-green-500"
              >
                Godkjenn
              </button>
              <button
                onClick={() => handleAction(participant.id, "reject")}
                className="px-4 py-2 text-sm bg-red-500 text-white rounded shadow hover:bg-red-600 focus:ring-2 focus:ring-red-500"
              >
                Avslå
              </button>
              <button
                onClick={() => handleAction(participant.id, "delete")}
                className="px-4 py-2 text-sm bg-gray-500 text-white rounded shadow hover:bg-gray-600 focus:ring-2 focus:ring-gray-500"
              >
                Slett
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}