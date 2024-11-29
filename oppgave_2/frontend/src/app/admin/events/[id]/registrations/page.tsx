"use client"; 
import AdminRegistrationPage from "@/features/registration/page/AdminRegistrationPage";
import { useParams } from "next/navigation";

export default function Page() {
    const { id } = useParams(); 
    const eventId = Array.isArray(id) ? id[0] : id;
    
    return (
    <AdminRegistrationPage eventId={eventId} />
    )
}
