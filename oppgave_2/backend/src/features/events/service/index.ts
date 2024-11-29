import { ResultHandler } from "../../../lib/result";
import { Event, EventWithoutId } from "../types";
import { validateEvent, validateEventWithoutId } from "../helpers/schema";
import { Result } from "@/types";
import { eventRepository, EventRepository } from "../repository";

export const createEventService = (eventRepositoryDb: EventRepository) => {
  const getAllEvents = async (): Promise<Result<Event[]>> => {
    return (await eventRepositoryDb).list();
  };

  const getOneEvent = async (id: string): Promise<Result<Event>> => {
    const eventExist = (await eventRepositoryDb).exist(id);
    if (!eventExist)
      return ResultHandler.failure("Event not found", "NOT_FOUND");

    return (await eventRepositoryDb).getById(id);
  };

  const createEvent = async (data: EventWithoutId): Promise<Result<Event>> => {
    if (!validateEventWithoutId(data).success)
      return ResultHandler.failure("Data does not match", "BAD_REQUEST");

    return (await eventRepositoryDb).create(data);
  };

  const updateEvent = async (
    data: Event,
    id: string
  ): Promise<Result<Event>> => {
    const eventExist = (await eventRepositoryDb).exist(id);
    if (!eventExist)
      return ResultHandler.failure("Event not found", "NOT_FOUND");

    if (!validateEvent(data).success)
      return ResultHandler.failure("Data does not match", "BAD_REQUEST");

    return (await eventRepositoryDb).updateById(data, id);
  };

  const deleteEvent = async (id: string): Promise<Result<string>> => {
    const eventExist = (await eventRepositoryDb).exist(id);
    if (!eventExist)
      return ResultHandler.failure("Event not found", "NOT_FOUND");

    return (await eventRepositoryDb).deleteById(id);
  };

  return {
    getAllEvents,
    getOneEvent,
    createEvent,
    updateEvent,
    deleteEvent,
  };
};

export const eventService = createEventService(eventRepository);

export type EventService = ReturnType<typeof createEventService>;

// // src/features/events/service/index.ts
// import { list, create, updateById, getById, deleteById } from "../repository";
// import type { Result } from "@/types";
// import type {
//   CreateEventDto,
//   Event,
//   EventWithNullableDateTime,
//   UpdateEventDto,
// } from "../types";

// export const createEvent = async (
//   data: CreateEventDto
// ): Promise<Result<string>> => {
//   return create(data);
// };

// export const getAllEvents = async (): Promise<
//   Result<EventWithNullableDateTime[]>
// > => {
//   return list();
// };

// export const findOneEvent = async (
//   id: string
// ): Promise<Result<EventWithNullableDateTime>> => {
//   return getById(id);
// };

// export const updateEvent = async (
//   id: string,
//   data: UpdateEventDto
// ): Promise<Result<EventWithNullableDateTime>> => {
//   return updateById(data, id);
// };

// export const deleteEvent = async (id: string): Promise<Result<string>> => {
//   return deleteById(id);
// };
