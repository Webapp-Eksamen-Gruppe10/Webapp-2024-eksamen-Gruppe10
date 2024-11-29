import Link from "next/link";
import { Event } from "@/features/event/lib/schema";

export default function EventDetail(props: {event:Event}) {
    const {event} = props

    const eventDate = new Date(event.datetime);


    const formattedDate = eventDate.toLocaleDateString("no-NO", { 
      weekday: "long", 
      year: "numeric", 
      month: "long", 
      day: "numeric",
    });
  
    const formattedTime = eventDate.toLocaleTimeString("no-NO", {
      hour: "2-digit",
      minute: "2-digit",
    });

      return (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
          <p className="text-lg mb-6">{event.description}</p>
    
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Event Details */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Event Details</h2>
              <ul className="space-y-4">
                <li>
                  <strong>Date:</strong> {formattedDate}
                </li>
                <li>
                  <strong>Time:</strong> {formattedTime || "TBD"}
                </li>
                <li>
                  <strong>Location:</strong> {event.location || "TBD"}
                </li>
                <li>
                  <strong>Type:</strong> {event.category || "General"}
                </li>
                <li>
                  <strong>Capacity:</strong> {event.capacity || "Unlimited"} people
                </li>
                <li>
                  <strong>Price:</strong> {event.price || "Free"}
                </li>
              </ul>
            </div>
    
            {/* Registration Section */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Registration</h2>
              <p className="mb-4">
                Ready to join us? Click the button below to sign up for this event!
              </p>
              <div className="flex space-x-4">
                <Link href={`/events/${event.id}/registration`}>
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                    Sign up
                  </button>
                </Link>
                <Link href={`/admin/events/${event.id}/registrations`}>
                  <button className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900">
                    Admin
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    
}