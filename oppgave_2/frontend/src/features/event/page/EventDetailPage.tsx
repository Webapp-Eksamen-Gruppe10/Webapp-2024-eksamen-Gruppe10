"use-client";
import EventDetail from "../components/EventDetail";
import useEvent from "../hooks/useEvent";


export default function EventDetailPage(props: {eventId: string}) {
    const {eventId} = props
    const { eventData} = useEvent();

    const event = eventData.find((event) => event.id === eventId);

    if (!event) {
        return (
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Event Not Found</h1>
            <p className="text-lg">We couldn't find the event you're looking for.</p>
          </div>
        );
    }

    return (
        <EventDetail event={event}/>
    )

}