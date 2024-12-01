import Events from "../components/Events";
import useEvent from "../hooks/useEvent";

export default function EventsPage() {
    const { eventData, eventStatus, get } = useEvent();


    return (
        <Events events={eventData} />
    )
}