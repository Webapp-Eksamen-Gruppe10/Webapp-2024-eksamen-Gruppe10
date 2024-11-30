"use client";
import { Template, TemplateToDb } from "@/features/template/lib/schema";
import AdminCreateEvent from "../components/AdminCreateEvent";

type AdminCreateEventProps = {
    selectedTemplate: Template,
}

export default function AdminCreateEventPage({selectedTemplate}: AdminCreateEventProps ) {
    return(
        <AdminCreateEvent selectedTemplate={selectedTemplate}
      />
    )
}