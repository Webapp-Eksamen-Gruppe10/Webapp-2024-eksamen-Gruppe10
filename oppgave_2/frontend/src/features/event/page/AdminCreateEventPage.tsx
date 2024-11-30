"use client";
import AdminCreateEvent from "../components/AdminCreateEvent";

type AdminCreateEventProps = {
    onSelectTemplate: (template: any) => void,
}

export default function AdminCreateEventPage({onSelectTemplate}: AdminCreateEventProps ) {
    return(
        <AdminCreateEvent/>
    )
}