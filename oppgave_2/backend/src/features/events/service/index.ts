import { ResultHandler } from "../../../lib/result";
import {
  CategoryEnum,
  DbEvent,
  DbEventWithoutId,
  DbEventWithoutIdAndTemplateId,
  Event,
  EventWithoutId,
} from "../types";

import {
  validateEventWithoutIdCurrentCap,
  validateEventWithoutIdAndTemplate_id,
  validateDbEventWithoutIdCurrentCap,
} from "../helpers/schema";
import { Result } from "@/types";
import { eventRepository, EventRepository } from "../repository";

export const createEventService = (eventRepositoryDb: EventRepository) => {
  const getAllEvents = async (
    filters: Record<string, string>
  ): Promise<Result<DbEvent[]>> => {
    const { category, year, month } = filters;
    return (await eventRepositoryDb).list({
      category: category as CategoryEnum,
      year,
      month,
    });
  };

  const getOneEvent = async (id: string): Promise<Result<Event>> => {
    const eventExist = (await eventRepositoryDb).exist(id);
    if (!eventExist)
      return ResultHandler.failure("Event not found", "NOT_FOUND");

    return (await eventRepositoryDb).getById(id);
  };

  const createEvent = async (data: EventWithoutId): Promise<Result<Event>> => {
    if (!validateDbEventWithoutIdCurrentCap(data).success) {
      return ResultHandler.failure("Data does not match", "BAD_REQUEST");
    }

    if (data.template_id) {
      const template = await prisma?.template.findUnique({
        where: {
          id: data?.template_id,
        },
      });
      if (template?.notSameDay) {
        const events = await prisma?.event.findMany({
          where: {
            template_id: template.id,
          },
        });

        if (events) {
          const startsAtDates = events.map((event) =>
            new Date(event.startsAt).getTime()
          );
          const newEventStartAt = new Date(data.startsAt).getTime();

          if (startsAtDates.includes(newEventStartAt)) {
            return ResultHandler.failure(
              "An event already exists on this day",
              "FORBIDDEN"
            );
          }
        }
      }

      if (template?.lim_attend && data.capacity === null) {
        return ResultHandler.failure(
          "Capacity can't be null when limited attendence",
          "FORBIDDEN"
        );
      }

      if (template?.free && data.price === 0) {
        return ResultHandler.failure(
          "Price can't be set when event is free",
          "FORBIDDEN"
        );
      }
    }

    return (await eventRepositoryDb).create(data);
  };

  // const createEvent = async (data: EventWithoutId): Promise<Result<Event>> => {
  //   if (!validateEventWithoutIdCurrentCap(data).success)
  //     return ResultHandler.failure("Data does not match", "BAD_REQUEST");

  //   return (await eventRepositoryDb).create(data);
  // };

  const updateEvent = async (
    data: DbEventWithoutId,
    id: string
  ): Promise<Result<Event>> => {
    const eventExist = (await eventRepositoryDb).exist(id);
    if (!eventExist)
      return ResultHandler.failure("Event not found", "NOT_FOUND");
    const event = await (await eventRepositoryDb).getByIdData(id);
    if (event.template_id) {
      const template = await prisma?.template.findUnique({
        where: {
          id: event.template_id,
        },
      });

      // fast pris
      // hvis fastpris er true, så kan man ikke endre pris:
      // if (data.price !== null) {
      console.log(template?.free && data.price !== 0);
      if (template?.free && data.price !== 0) {
        return ResultHandler.failure(
          "Price can't be set when event is free",
          "FORBIDDEN"
        );
      }

      // hvis capasity er null, så skal man ikke sende med capacity i patchen (ikke kunne endre capacity), samme som i fast pris.

      if (template?.lim_attend && data.capacity === null) {
        return ResultHandler.failure(
          "Capacity can't be unlimited when limited attendence",
          "FORBIDDEN"
        );
      }
    }

    if (!validateDbEventWithoutIdCurrentCap(data).success)
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
