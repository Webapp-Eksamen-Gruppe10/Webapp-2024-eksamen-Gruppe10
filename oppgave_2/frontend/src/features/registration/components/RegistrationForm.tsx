'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { validateRegistrationToDb } from '@/features/registration/lib/schema';

type RegistrationFormProps = {
  onSubmit: (data: any[]) => Promise<void>;
  eventId: string;
};

export default function RegistreringsSkjema({ onSubmit, eventId }: RegistrationFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    participants: [] as string[],
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index?: number) => {
    const { name, value } = e.target;
    if (name === 'participants' && typeof index === 'number') {
      const updatedParticipants = [...formData.participants];
      updatedParticipants[index] = value;
      setFormData((prev) => ({ ...prev, participants: updatedParticipants }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const addParticipant = () => {
    setFormData((prev) => ({
      ...prev,
      participants: [...prev.participants, ''],
    }));
  };

  const removeParticipant = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      participants: prev.participants.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name) newErrors.name = 'Navn er påkrevd';
    if (!formData.email) newErrors.email = 'E-post er påkrevd';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Telefonnummer er påkrevd';
    if (formData.participants.some((participant) => !participant)) {
      newErrors.participants = 'Alle deltakerne må ha navn';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    console.log('Sender inn skjema:', formData);
    const registranter = [
      {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        status: 'venter',
        event_id: eventId,
      },
      ...formData.participants.map((participant) => ({
        name: participant,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        status: 'venter',
        event_id: eventId,
      })),
    ];

    for (const registrant of registranter) {
      const parsed = validateRegistrationToDb(registrant);
      if (!parsed.success) {
        console.error('Validering feilet:', parsed.error);
        alert('Registrering mislyktes. Sjekk dataene og prøv igjen.');
        return;
      }
    }

    try {
      await onSubmit(registranter);
      alert('Alle registreringer ble sendt inn!');
    } catch (error) {
      console.error('Feil ved innsending av registreringer:', error);
      alert('Registrering mislyktes. Vennligst prøv igjen.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Registreringsskjema</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block font-semibold mb-2">
            Navn
          </label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring border-gray-300"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block font-semibold mb-2">
            E-post
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring border-gray-300"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phoneNumber" className="block font-semibold mb-2">
            Telefonnummer
          </label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring border-gray-300"
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
          )}
        </div>

        {formData.participants.map((participant, index) => (
          <div key={index} className="flex items-center mt-2">
            <input
              name="participants"
              value={participant}
              onChange={(e) => handleChange(e, index)}
              placeholder={`Deltaker ${index + 1}`}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring border-gray-300"
            />
            <button
              type="button"
              onClick={() => removeParticipant(index)}
              className="ml-2 bg-red-500 text-white px-3 py-2 rounded"
            >
              Fjern
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addParticipant}
          className="w-full px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Legg til deltaker
        </button>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Send inn registrering
        </button>
      </form>
    </div>
  );
}
