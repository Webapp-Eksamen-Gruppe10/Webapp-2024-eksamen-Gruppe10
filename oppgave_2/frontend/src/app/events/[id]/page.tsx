"use client"; 

import EventDetailPage from "@/features/event/page/EventDetailPage";
import { useParams } from "next/navigation";

export default function EventDetail() {
    const { id } = useParams();
    const eventId = Array.isArray(id) ? id[0] : id;
    
    return (
        <EventDetailPage eventId={eventId}/>
    )
}
