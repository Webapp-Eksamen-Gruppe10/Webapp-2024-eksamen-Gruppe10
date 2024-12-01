"use client"; 
import AdminStatisticsPanel from "../components/AdminStatisticsPanel";
import { useEvent } from '@/features/event/hooks/useEvent'

export default function Page() {
    const { eventData } = useEvent()
    return (
    <AdminStatisticsPanel events={eventData} />
    )
}
