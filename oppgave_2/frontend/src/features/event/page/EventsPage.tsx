import Events from "../components/Events";
import useEvent from "../hooks/useEvent";

export default function EventsPage() {
    const { eventFilteredData, eventStatus, get, filter } = useEvent();


    return (
        <Events events={eventFilteredData} eventStatus={eventStatus} filter={filter}/>
    )
}