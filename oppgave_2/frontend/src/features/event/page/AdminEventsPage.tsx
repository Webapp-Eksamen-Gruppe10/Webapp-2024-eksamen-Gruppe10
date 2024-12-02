"use client"; 
import useTemplate from "@/features/template/hooks/useTemplate";
import AdminEvents from "../components/AdminEvents";
import useEvent from "../hooks/useEvent";

export default function AdminEventsPage() {
    const { eventData, remove, update, eventStatus, get } = useEvent();
    const {templateData} = useTemplate(); 
    
    return (
        <AdminEvents events={eventData} remove={remove} update={update} templates={templateData} /> 
    )

}   