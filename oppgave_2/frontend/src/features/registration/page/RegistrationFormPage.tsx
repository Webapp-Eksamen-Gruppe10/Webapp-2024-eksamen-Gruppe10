'use client';
import useRegistration from '@/features/registration/hooks/useRegistration';
import RegistrationForm from '../components/RegistrationForm';
import { useParams } from 'next/navigation';
import { CreateRegistration } from '../lib/schema';
import useEvent from '@/features/event/hooks/useEvent';

export default function RegistrationFormPage() {
  const { id } = useParams() as { id: string }
  const { add } = useRegistration(id);
  const { eventData} = useEvent();
  const event = eventData.find((event) => event.id === id);

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
    event ? (
      <RegistrationForm onSubmit={handleFormSubmit} event={event} />
    ) : (
      <h2>Arrangement ble ikke funnet.</h2>
    )
  );
}
