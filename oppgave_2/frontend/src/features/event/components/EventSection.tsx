import React from "react";
import Link from "next/link";
import { Event } from "@/features/event/lib/schema";
import { formatDate } from "@/features/registration/lib/helpers";

type EventSectionProps = {
  events: Event[];
}

export default function EventSection({ events }: EventSectionProps) {
  return (
    <main className="flex-grow">
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-36">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Upcoming Events</h1>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {events.slice(0, 3).map((event) => (
              <div
                key={event.id}
                className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200"
              >
                <div className="p-4">
                  <h3 className="text-lg font-bold">{event.title}</h3>
                  <p className="text-sm text-gray-500">{formatDate(event.datetime)}</p>
                  <p className="mt-2 text-gray-600">{event.description}</p>
                </div>
                <div className="border-t p-4 text-center">
                  <Link href={`/events/${event.id}`} passHref>
                    <button className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded hover:bg-blue-600 hover:text-white">
                      Learn More
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/events" passHref>
              <button className="px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                See All Events
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
