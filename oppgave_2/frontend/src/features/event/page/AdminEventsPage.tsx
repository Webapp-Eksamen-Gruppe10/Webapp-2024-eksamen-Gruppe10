"use client"; 
import AdminEvents from "../components/AdminEvents";
import useEvent from "../hooks/useEvent";

export default function AdminEventsPage() {
    const { eventData, eventStatus, get } = useEvent();
    
    return (
        <AdminEvents events={eventData}/> 
    )

}