"use client"; 

import { useParams } from "next/navigation";

export default function EventDetail() {
    const { id } = useParams();

    return <h1> dette er eventsiden for {id}</h1>
}
