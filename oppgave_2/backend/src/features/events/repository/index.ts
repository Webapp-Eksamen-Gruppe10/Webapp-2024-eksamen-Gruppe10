import { ResultHandler } from "../../../lib/result";
import prisma, { Prisma } from "../../../lib/client/db";
import { Result } from "@/types";
import { fromDb, toEventArray, toDb, UpdateEventToDb } from "../helpers/mapper";
import {
  DbEvent,
  DbEventWithoutIdAndTemplateId,
  Event,
  EventWithoutId,
} from "../types";
import { CategoryEnum } from "../types";

export const createEventRepository = async (prismaDb: Prisma) => {
  const exist = async (id: string) => {
    try {
      await prismaDb.event.findUniqueOrThrow({
        where: {
          id: id,
        },
      });
      return true;
    } catch (error) {
      return false;
    }
  };

  const getByIdData = async (id: string) => {
    const event = await prismaDb.event.findUniqueOrThrow({
      where: { id: id },
    });
    return event;
  };

  const getById = async (id: string) => {
    try {
      const event = await prismaDb.event.findUniqueOrThrow({
        where: { id: id },
      });
      return ResultHandler.success(fromDb(event));
    } catch (error) {
      return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR");
    }
  };

  const list = async (filters: {
    category?: CategoryEnum;
    year?: string;
    month?: string;
  }): Promise<Result<DbEvent[]>> => {
    try {
      const { category, year, month } = filters;

      let whereClause: Record<string, any> = {};

      switch (true) {
        case !!category && !!year && !!month: {
          const monthNumber = parseInt(month.padStart(2, "0"));
          whereClause = {
            category: { contains: category },
            startsAt: {
              gte: new Date(`${year}-${monthNumber}-01`),
              lt: new Date(`${year}-${(monthNumber % 12) + 1}-01`),
            },
          };
          break;
        }

        case !!category && !!year: {
          whereClause = {
            category: { contains: category },
            startsAt: {
              gte: new Date(`${year}-01-01`),
              lt: new Date(`${parseInt(year) + 1}-01-01`),
            },
          };
          break;
        }

        case !!category && !!month: {
          const monthNumber = parseInt(month.padStart(2, "0"));
          const events = await prismaDb.event.findMany({
            where: { category: { contains: category } },
          });

          const filteredEvents = events.filter((event) => {
            const eventDate = new Date(event.startsAt);
            const eventMonth = eventDate.getMonth() + 1;
            return eventMonth === monthNumber;
          });

          return ResultHandler.success(filteredEvents);
        }

        case !!year && !!month: {
          const monthNumber = parseInt(month.padStart(2, "0"));
          whereClause = {
            startsAt: {
              gte: new Date(`${year}-${monthNumber}-01`),
              lt: new Date(`${year}-${(monthNumber % 12) + 1}-01`),
            },
          };
          break;
        }

        case !!category: {
          whereClause = { category: { contains: category } };
          break;
        }

        case !!year: {
          whereClause = {
            startsAt: {
              gte: new Date(`${year}-01-01`),
              lt: new Date(`${parseInt(year) + 1}-01-01`),
            },
          };
          break;
        }

        case !!month: {
          const monthNumber = parseInt(month.padStart(2, "0"));
          const events = await prismaDb.event.findMany();
          const filteredEvents = events.filter((event) => {
            const eventDate = new Date(event.startsAt);
            const eventMonth = eventDate.getMonth() + 1;
            return eventMonth === monthNumber;
          });

          return ResultHandler.success(filteredEvents);
        }

        default:
          const events = await prismaDb.event.findMany();
          return ResultHandler.success(events);
      }

      if (Object.keys(whereClause).length > 0) {
        const events = await prismaDb.event.findMany({ where: whereClause });
        return ResultHandler.success(events);
      }
      return ResultHandler.success([]);
    } catch (error) {
      return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR");
    }
  };

  const create = async (data: EventWithoutId): Promise<Result<Event>> => {
    try {
      const event = toDb(data);
      const create = await prismaDb.event.create({ data: event });
      return ResultHandler.success(fromDb(create));
    } catch (error) {
      return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR");
    }
  };

  const updateById = async (
    data: DbEventWithoutIdAndTemplateId,
    id: string
  ): Promise<Result<Event>> => {
    try {
      const update = await prismaDb.event.update({
        where: { id: id },
        data: UpdateEventToDb(data),
      });

      return ResultHandler.success(fromDb(update));
    } catch (error) {
      return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR");
    }
  };

  const deleteById = async (id: string): Promise<Result<string>> => {
    try {
      await prismaDb.event.delete({
        where: { id: id },
      });
      return ResultHandler.success(id);
    } catch (error) {
      return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR");
    }
  };

  return {
    exist,
    getById,
    list,
    create,
    updateById,
    deleteById,
    getByIdData,
  };
};

export const eventRepository = createEventRepository(prisma);

export type EventRepository = ReturnType<typeof createEventRepository>;
