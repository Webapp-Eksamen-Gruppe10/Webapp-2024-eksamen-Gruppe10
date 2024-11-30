'use client';
import useRegistration from '@/features/registration/hooks/useRegistration';
import RegistrationForm from '../components/RegistrationForm';
import { useParams } from 'next/navigation';
import { CreateRegistration } from '../lib/schema';

export default function RegistrationFormPage() {
  const { id } = useParams() as { id: string }
  const { add } = useRegistration(id);

  const handleFormSubmit = async (fromdata: CreateRegistration) => {
    try {
        await add(fromdata);
      alert('All registrations added successfully!');
    } catch (error) {
      console.error('Failed to add registration:', error);
      alert('Failed to register.');
    }
  };

  return (
  <RegistrationForm onSubmit={handleFormSubmit} eventId={id} />
  );
}
