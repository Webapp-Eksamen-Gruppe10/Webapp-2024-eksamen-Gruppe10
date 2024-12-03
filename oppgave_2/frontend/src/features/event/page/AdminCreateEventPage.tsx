"use client";
import { Template } from "@/features/template/lib/schema";
import AdminCreateEvent from "../components/AdminCreateEvent";
import { AddEventResult } from "@/types";
import { Event } from "../lib/schema";

type AdminCreateEventProps = {
    selectedTemplateId: string, 
    selectedTemplate: Template,
    events: Event[]
    addEvent: (data: Partial<Event>) => Promise<AddEventResult>
}

export default function AdminCreateEventPage({selectedTemplateId, selectedTemplate, events, addEvent}: AdminCreateEventProps ) {
    return(
        <AdminCreateEvent  selectedTemplateId={selectedTemplateId} selectedTemplate={selectedTemplate} add={addEvent} events={events}      />
    )
}