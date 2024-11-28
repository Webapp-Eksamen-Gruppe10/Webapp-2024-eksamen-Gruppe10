"use client"; 
import { dummyEvents } from "@/lib/data";
import EventSection from "../components/EventSection";
import useEvent from "../hooks/useEvent";

export default function EventsSectionPage() {
    const { eventData, eventStatus, get } = useEvent();


    return (
        <EventSection events={dummyEvents} />
    )
}