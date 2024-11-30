import {
  DbEvent,
  DbEventWithoutId,
  DbEventWithoutIdAndTemplateId,
  Event,
  EventWithoutId,
} from "../types";

export const fromDb = (dbEvent: DbEvent): Event => {
  const event: Event = {
    ...dbEvent,
    createdAt: (dbEvent.createdAt = new Date(dbEvent.createdAt)),
  };
  return event;
};

export const toEventArray = (dbEvents: DbEvent[]): Event[] => {
  const events: Event[] = [];

  dbEvents.map((dbEvent) => {
    events.push({
      ...dbEvent,
    });
  });

  return events;
};

export const toDb = (event: EventWithoutId): DbEvent => {
  const dbEvent: DbEvent = {
    ...event,
    id: crypto.randomUUID(),
    currentCapacity: 0
  };
  return dbEvent;
};

export const UpdateEventToDb = (event: DbEventWithoutIdAndTemplateId) => {
  return {
    title: event.title,
    createdAt: event.createdAt,
    location: event.location,
    category: event.category,
    capacity: event.capacity,
    price: event.price,
    description: event.description,
    private: event.private,
    waitinglist: event.waitinglist,
  };
};
