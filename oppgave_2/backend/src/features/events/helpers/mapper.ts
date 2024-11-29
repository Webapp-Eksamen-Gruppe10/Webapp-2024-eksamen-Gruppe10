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
    dateTime: (dbEvent.dateTime = new Date(dbEvent.dateTime)),
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
  };
  return dbEvent;
};

export const UpdateEventToDb = (event: DbEventWithoutIdAndTemplateId) => {
  return {
    title: event.title,
    dateTime: event.dateTime,
    location: event.location,
    category: event.category,
    capacity: event.capacity,
    price: event.price,
    description: event.description,
    private: event.private,
    waitinglist: event.waitinglist,
  };
};
