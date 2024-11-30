import { dummyRegistrations } from '@/lib/data';
import AdminRegistrationForm from '../components/AdminRegistrationForm';
import useRegistration from '../hooks/useRegistration';



export default function AdminRegistrationsPage(props: {eventId: string}) {
    const {eventId} = props
    const {registrationData, registrationStatus, add, update, remove} = useRegistration(eventId);
    
    return (
        <AdminRegistrationForm
        eventId={eventId}
        registrationData={registrationData}
        registrationStatus={registrationStatus}
        addRegistration={add}
        updateRegistration={update}
        deleteRegistration={remove}
    />
    )
}