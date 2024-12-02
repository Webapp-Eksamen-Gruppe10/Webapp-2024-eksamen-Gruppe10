import Events from "../components/Events";
import useEvent from "../hooks/useEvent";

export default function EventsPage() {
    const { eventData, eventStatus, get, filter } = useEvent();


    return (
        <Events events={eventData} eventStatus={eventStatus} filter={filter}/>
    )
}