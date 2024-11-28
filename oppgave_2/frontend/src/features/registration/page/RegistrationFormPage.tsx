import useRegistration from '@/features/registration/hooks/useRegistration';
import RegistrationForm from '../components/RegistrationForm';

export default function RegistrationFormPage({ eventId }: { eventId: string }) {
    const { add } = useRegistration(eventId);

    const handleFormSubmit = async (formData: { name: string; email: string; phoneNumber: string; status: string; event_id: string }) => {
        try {
            await add(formData);
            alert('Registration added successfully!');
        } catch (error) {
            console.error('Failed to add registration:', error);
            alert('Failed to register.');
        }
    };

    return (
        <div>
            <h1 className="text-center text-2xl font-bold mb-6">Event Registration</h1>
            <RegistrationForm onSubmit={handleFormSubmit} eventId={eventId} />
        </div>
    );
}
