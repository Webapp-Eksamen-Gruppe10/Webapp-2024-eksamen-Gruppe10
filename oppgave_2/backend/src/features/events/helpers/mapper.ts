import { CreateEventDto, DbEvent, Event, UpdateEventDto } from "../types";

export const fromDb = (event: DbEvent) => {
  return {
    id: event.id,
    template_id: event.template_id,
    title: event.title,
    datetime: event.datetime ? new Date(event.datetime) : null,
    location: event.location,
    category: event.category,
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
  };
};

export const createEventToDb = (event: CreateEventDto) => {
  return {
    ...event,
    id: crypto.randomUUID(),
  };
};

export const updateEventToDb = (event: UpdateEventDto) => {
  return {
    ...event,
  };
};
