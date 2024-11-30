import { ResultHandler } from "../../../lib/result";
import { DbEventWithoutIdAndTemplateId, Event, EventWithoutId } from "../types";
import {
  validateEvent,
  validateEventWithoutIdCurrentCap,
  validateEventWithoutIdAndTemplate_id,
} from "../helpers/schema";
import { Result } from "@/types";
import { CategoryType } from "../types";
import { eventRepository, EventRepository } from "../repository";

export const createEventService = (eventRepositoryDb: EventRepository) => {
  // const getAllEvents = async (
  //   filters: { category?: CategoryType; year?: string; month?: string } // Specify CategoryType
  // ): Promise<Result<Event[]>> => {
  //   return await (await eventRepositoryDb).list(filters);
  // };

  const getAllEvents = async (
    filters: Record<string, string>
  ): Promise<Result<Event[]>> => {
    const { category, year, month } = filters;

    return (await eventRepositoryDb).list({
      category: category as CategoryType,
      year,
      month,
    });
  };

  // const getAllEvents = async (): Promise<Result<Event[]>> => {
  //   return (await eventRepositoryDb).list();
  // };

  const getOneEvent = async (id: string): Promise<Result<Event>> => {
    const eventExist = (await eventRepositoryDb).exist(id);
    if (!eventExist)
      return ResultHandler.failure("Event not found", "NOT_FOUND");

    return (await eventRepositoryDb).getById(id);
  };

  const createEvent = async (data: EventWithoutId): Promise<Result<Event>> => {
    if (!validateEventWithoutIdCurrentCap(data).success)
      return ResultHandler.failure("Data does not match", "BAD_REQUEST");

    return (await eventRepositoryDb).create(data);
  };

  const updateEvent = async (
    data: DbEventWithoutIdAndTemplateId,
    id: string
  ): Promise<Result<Event>> => {
    const eventExist = (await eventRepositoryDb).exist(id);
    if (!eventExist)
      return ResultHandler.failure("Event not found", "NOT_FOUND");

    if (!validateEventWithoutIdAndTemplate_id(data).success)
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
