'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { Registration, validateRegistrationToDb } from '@/features/registration/lib/schema';

type RegistrationFormProps = {
  onSubmit: (data: Registration) => void;
  eventId: string;
};

export default function RegistrationForm({ onSubmit, eventId }: RegistrationFormProps) {
  const [formData, setFormData] = useState<Registration>({
    id: 0,
    name: '',
    email: '',
    phoneNumber: '',
    status: 'pending',
    event_id: eventId,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof Registration, string>>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = (): boolean => {
    const parsed = validateRegistrationToDb(formData);
    if (!parsed.success) {
      const newErrors: Partial<Record<keyof Registration, string>> = {};
      parsed.error.errors.forEach((err) => {
        if (err.path[0]) {
          newErrors[err.path[0] as keyof Registration] = err.message;
        }
      });
      setErrors(newErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await onSubmit(formData);
        alert('Registration successful!');
      } catch (error) {
        console.error('Failed to submit registration:', error);
        alert('Failed to register. Please try again.');
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Register for Event</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block font-semibold mb-1">
            Name
          </label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded focus:outline-none focus:ring ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block font-semibold mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded focus:outline-none focus:ring ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="phoneNumber" className="block font-semibold mb-1">
            Phone Number
          </label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded focus:outline-none focus:ring ${
              errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          Submit Registration
        </button>
      </form>
    </div>
  );
}
