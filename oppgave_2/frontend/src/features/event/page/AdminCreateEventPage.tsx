"use client";
import { Template } from "@/features/template/lib/schema";
import AdminCreateEvent from "../components/AdminCreateEvent";
import useEvent from "../hooks/useEvent";

type AdminCreateEventProps = {
    selectedTemplateId: string, 
    selectedTemplate: Template,

    
}

export default function AdminCreateEventPage({selectedTemplateId, selectedTemplate}: AdminCreateEventProps ) {
    const {add} = useEvent()
    return(
        <AdminCreateEvent selectedTemplateId={selectedTemplateId} selectedTemplate={selectedTemplate} add={add}
      />
    )
}