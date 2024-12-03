import Events from "../components/Events";
import useEvent from "../hooks/useEvent";

export default function EventsPage() {
    const { eventData, eventFilteredData, eventStatus, get, filter } = useEvent();

    const filteredYears = eventData.map((event) => {
        return new Date(event.startsAt).getFullYear().toString();
    });
    
    const uniqueYears = [...new Set(filteredYears)];

    return (
        <Events years={uniqueYears} events={eventFilteredData} eventStatus={eventStatus} filter={filter}/>
    )
}