import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Category, Event } from "@/features/event/lib/schema";
import { formatDate } from "@/lib/helpers";
import { showPriceCorrectly } from "@/features/event/lib/eventUtils";
import { useRouter} from "next/navigation";


type EventProps = {
  events: Event[];
  filter: (valgtMåned: string, valgtÅr: string, valgtType: string) => Promise<void>, 
  eventStatus: {
    idle: boolean;
    loading: boolean;
    success: boolean;
    error: boolean;
    fetching: boolean;
}

};

export default function Events({ events, eventStatus, filter }: EventProps) {
  const router = useRouter();


  const [valgtMåned, settValgtMåned] = useState("");
  const [valgtÅr, settValgtÅr] = useState("");
  const [valgtType, settValgtType] = useState("");

 
  useEffect(() => {
    filter(valgtMåned, valgtÅr, valgtType)
    const params = new URLSearchParams();
    

    if (valgtMåned) params.set("month", valgtMåned);
    if (valgtÅr) params.set("year", valgtÅr);
    if (valgtType) params.set("category", valgtType);

    router.push(`/events?${params.toString()}`);
  }, [valgtMåned, valgtÅr, valgtType, router]);

 

  return (
    <div className="container mx-auto p-4 pb-20">
      <h1 className="text-3xl font-bold mb-6">Hendelser</h1>
      <div className="flex items-center gap-4 mb-6">
        <select
          value={valgtMåned}
          onChange={(e) => settValgtMåned(e.target.value)}
          className="border border-gray-300 rounded px-9 py-2"
        >
          <option value="">Velg måned</option>
          <option value="1">Januar</option>
          <option value="2">Februar</option>
          <option value="3">Mars</option>
          <option value="4">April</option>
          <option value="5">Mai</option>
          <option value="6">Juni</option>
          <option value="7">Juli</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">Oktober</option>
          <option value="11">November</option>
          <option value="12">Desember</option>
        </select>

        <select
          value={valgtÅr}
          onChange={(e) => settValgtÅr(e.target.value)}
          className="border border-gray-300 rounded px-9 py-2"
        >
          <option value="">Velg år</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>

        <select
          value={valgtType}
          onChange={(e) => settValgtType(e.target.value)}
          className="border border-gray-300 rounded px-9 py-2"
        >
            <option disabled value="">
                Velg kategori
              </option>
              {Object.values(Category.Values).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}             
        </select>

      </div> 
      {eventStatus.loading ? (
        <p>Laster...</p>
      ) : eventStatus.error ? (
        <p className="text-red-500">{eventStatus.error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.length > 0 ? (
            events.map((hendelse) => (
              <Link key={hendelse.id} href={`/events/${hendelse.id}`} className="block">
                <div className="border border-gray-300 rounded p-4 hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-semibold mb-2">{hendelse.title}</h3>
                  <p className="mb-2">Dato: {formatDate(hendelse.createdAt)}</p>
                  <p className="mb-2">Kategori: {hendelse.category}</p>
                  <p>Pris: {showPriceCorrectly(hendelse.price)}</p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-500 col-span-full">
              Ingen hendelser funnet for de valgte filtrene.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
