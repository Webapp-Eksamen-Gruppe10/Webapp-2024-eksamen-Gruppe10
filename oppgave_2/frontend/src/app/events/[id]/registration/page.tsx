"use client";
import { useParams } from "next/navigation";

 
export default function RegistrationPage() {
    const { id } = useParams();

    return <h1> This is registration for event with id: {id}</h1>
}  