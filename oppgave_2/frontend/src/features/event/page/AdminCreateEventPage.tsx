"use client";
import { Template } from "@/features/template/lib/schema";
import AdminCreateEvent from "../components/AdminCreateEvent";
import useEvent from "../hooks/useEvent";

type AdminCreateEventProps = {
    selectedTemplateId: string, 
    selectedTemplate: Template,

    
}

export default function AdminCreateEventPage({selectedTemplateId, selectedTemplate}: AdminCreateEventProps ) {
    const {add, eventData} = useEvent()
    return(
        <AdminCreateEvent events={eventData} selectedTemplateId={selectedTemplateId} selectedTemplate={selectedTemplate} add={add}
      />
    )
}