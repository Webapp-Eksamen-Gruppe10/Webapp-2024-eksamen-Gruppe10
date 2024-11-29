import { DbEvent, DbEventWithoutId, Event, EventWithoutId } from "../types";

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

export const UpdateEventToDb = (event: Event): DbEventWithoutId => {
  const dbEvent: DbEventWithoutId = {
    ...event,
  };
  return dbEvent;
};

// import { CreateEventDto, DbEvent, Event, UpdateEventDto } from "../types";

// export const fromDb = (event: DbEvent) => {
//   return {
//     id: event.id,
//     template_id: event.template_id,
//     title: event.title,
//     dateTime: event.dateTime ? new Date(event.dateTime) : null,
//     location: event.location,
//     category: event.category,
//     capacity: event.capacity,
//     price: event.price,
//     description: event.description,
//     private: event.private,
//     waitinglist: event.waitinglist,
//   };
// };

// export const toDb = (event: Event) => {
//   return {
//     ...event,
//     id: crypto.randomUUID(),
//   };
// };

// export const createEventToDb = (event: CreateEventDto) => {
//   return {
//     ...event,
//     id: crypto.randomUUID(),
//   };
// };

// export const updateEventToDb = (event: UpdateEventDto) => {
//   return {
//     ...event,
//   };
// };
