"use client";

import { Event } from '@/features/event/lib/schema';

type StatisticsProps = {
  events: Event[]
}

export default function AdminStatisticsPanel(props: StatisticsProps) {

  const { events } = props
  
  const findParticipants = (personLimit: number, participants: number) => {
    return (participants > personLimit) ? personLimit : participants
  }

  const findWaitlist = (personLimit: number, participants: number) => {
    return ( participants > personLimit ) ? (participants - personLimit) : 0
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-blue-400 shadow-lg rounded-md overflow-hidden mt-8 mb-8">
      <div className="bg-gradient-to-b from-blue-400 to-blue-300 p-4">
        <h1 className="text-2xl text-center text-white">Arrangement Statistikk</h1>
      </div>
      <div className="p-4 space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center p-4 border border-gray-200 rounded-md bg-white shadow-md"
          >
            <div className="font-medium text-lg text-grey-700">{event.title}</div>
            <div className="flex flex-wrap justify-between gap-4 sm:gap-8 w-full sm:w-auto">
              <div className="text-right sm:text-left">
                <span className="block text-sm text-gray-600">Meldt opp</span>
                <span className="text-xl font-semibold text-gray-900">{findParticipants(event.capacity, event.currentCapacity)}</span>
              </div>
              <div className="text-right sm:text-left">
                <span className="block text-sm text-gray-600">På venteliste</span>
                <span className="text-xl font-semibold text-gray-900">{findWaitlist(event.capacity, event.currentCapacity)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
