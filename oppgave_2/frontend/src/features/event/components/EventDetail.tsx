import Link from "next/link";
import { Event } from "@/features/event/lib/schema";
import { formatDate, formatTime } from "@/lib/helpers";

export default function EventDetail(props: {event:Event}) {
    const {event} = props

    const eventDate = new Date(event.createdAt);

      return (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
          <p className="text-lg mb-6">{event.description}</p>
    
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Event Details */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Arrangement Detaljer</h2>
              <ul className="space-y-4">
                <li>
                  <strong>Dato:</strong> {formatDate(event.createdAt)}
                </li>
                <li>
                  <strong>Tid:</strong> {formatTime(event.createdAt)}
                </li>
                <li>
                  <strong>Lokasjon:</strong> {event.location}
                </li>
                <li>
                  <strong>Kategori:</strong> {event.category}
                </li>
                <li>
                  <strong>Kapasitet:</strong> {event.capacity || "Ubegrenset"} deltagere
                </li>
                <li>
                  <strong>Pris:</strong> {`${event.price} kr`|| "Gratis"}
                </li>
                <li>
                  <strong>Nåværende Kapasitet: </strong> {event.currentCapacity || "Ingen påmeldte"}
                </li>
              </ul>
            </div>
    
            {/* Registration Section */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Påmelding</h2>
              <p className="mb-4">
                Har du lyst å bli med? Klikk på knappen nedenfor for påmelding!
              </p>
              <div className="flex space-x-4">
                {event.currentCapacity >= event.capacity ? (
                  event.waitinglist ? (
                    <Link href={`/events/${event.id}/registration`}>
                      <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                        Meld deg på venteliste
                      </button>
                    </Link>
                  ) : (
                    <button
                        className="bg-gray-400 text-gray-700 px-6 py-3 rounded-lg cursor-not-allowed"
                        disabled
                    >
                        Fullt
                      </button>
                    )
                  ) : (
                    <Link href={`/events/${event.id}/registration`}>
                      <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                        Meld deg på
                      </button>
                    </Link>
                  )}  
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