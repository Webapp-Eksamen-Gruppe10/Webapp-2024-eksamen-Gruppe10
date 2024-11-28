import useRegistration from '@/features/registration/hooks/useRegistration';
import RegistrationForm from '../components/RegistrationForm';

export default function RegistrationFormPage({ eventId }: { eventId: string }) {
  const { add } = useRegistration(eventId);

  const handleFormSubmit = async (formDataArray: { name: string; email: string; phoneNumber: string; status: string; event_id: string }[]) => {
    try {
      for (const formData of formDataArray) {
        await add(formData);
      }
      alert('All registrations added successfully!');
    } catch (error) {
      console.error('Failed to add registration:', error);
      alert('Failed to register.');
    }
  };

  return (
  <RegistrationForm onSubmit={handleFormSubmit} eventId={eventId} />
  );
}
