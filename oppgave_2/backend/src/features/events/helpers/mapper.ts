import type { Prisma } from "@prisma/client";
import { CreateEventDto, DbEvent, Event } from "../types";

export const fromDb = (event: DbEvent) => {
  return {
    id: event.id,
    template_id: event.template_id,
    title: event.title,
    dateTime: event.dateTime ? new Date(event.dateTime) : null,
    location: event.location,
    category: JSON.parse(event.category),
    capacity: event.capacity,
    price: event.price,
    description: event.description,
    private: event.private,
    waitinglist: event.waitinglist,
  };
};

export const toDb = (event: Event) => {
  return {
    ...event,
    id: crypto.randomUUID(),
    category: JSON.stringify(event.category),
  };
};
