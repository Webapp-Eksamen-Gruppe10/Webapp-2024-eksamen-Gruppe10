"use client"; 
import AdminEvents from "../components/AdminEvents";
import useEvent from "../hooks/useEvent";

export default function AdminEventsPage() {
    const { eventData, remove, update, eventStatus, get } = useEvent();
    
    return (
        <AdminEvents events={eventData} remove={remove} update={update} /> 
    )

}   