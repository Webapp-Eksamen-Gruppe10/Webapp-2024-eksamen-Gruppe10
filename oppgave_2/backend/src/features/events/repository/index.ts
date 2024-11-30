// src/features/events/repository/index.ts
import { ResultHandler } from "../../../lib/result";
import prisma, { Prisma } from "../../../lib/client/db";
import { Result } from "@/types";
import { fromDb, toEventArray, toDb, UpdateEventToDb } from "../helpers/mapper";
import {
  CategoryType,
  DbEventWithoutIdAndTemplateId,
  Event,
  EventWithoutId,
} from "../types";

export const createEventRepository = async (prismaDb: Prisma) => {
  const exist = async (id: string) => {
    try {
      prismaDb.event.findUniqueOrThrow({
        where: {
          id: id,
        },
      });
      return true;
    } catch (error) {
      return false;
    }
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
    // category?: string;
    category?: CategoryType;
    year?: string;
    month?: string;
  }): Promise<Result<Event[]>> => {
    try {
      const { category, year, month } = filters;

      let whereClause: Record<string, any> = {};

      switch (true) {
        case !!category && !!year && !!month: {
          // Filter by category, year, and month
          const monthNumber = parseInt(month.padStart(2, "0")); // Ensure "MM" format
          whereClause = {
            category: { contains: category },
            createdAt: {
              gte: new Date(`${year}-${monthNumber}-01`), // Start of the month
              lt: new Date(`${year}-${(monthNumber % 12) + 1}-01`), // Start of the next month
            },
          };
          break;
        }

        case !!category && !!year: {
          // Filter by category and year
          whereClause = {
            category: { contains: category },
            createdAt: {
              gte: new Date(`${year}-01-01`),
              lt: new Date(`${parseInt(year) + 1}-01-01`),
            },
          };
          break;
        }

        case !!category && !!month: {
          // Filter by category and month (across all years)
          const monthNumber = parseInt(month.padStart(2, "0"));
          const events = await prismaDb.event.findMany({
            where: { category: { contains: category } },
          });

          const filteredEvents = events.filter((event) => {
            const eventDate = new Date(event.createdAt);
            const eventMonth = eventDate.getMonth() + 1;
            return eventMonth === monthNumber;
          });

          return ResultHandler.success(filteredEvents);
        }

        case !!year && !!month: {
          // Filter by year and month
          const monthNumber = parseInt(month.padStart(2, "0"));
          whereClause = {
            createdAt: {
              gte: new Date(`${year}-${monthNumber}-01`),
              lt: new Date(`${year}-${(monthNumber % 12) + 1}-01`),
            },
          };
          break;
        }

        case !!category: {
          // Filter by category only
          whereClause = { category: { contains: category } };
          break;
        }

        case !!year: {
          // Filter by year only
          whereClause = {
            createdAt: {
              gte: new Date(`${year}-01-01`),
              lt: new Date(`${parseInt(year) + 1}-01-01`),
            },
          };
          break;
        }

        case !!month: {
          // Filter by month only (across all years)
          const monthNumber = parseInt(month.padStart(2, "0"));
          const events = await prismaDb.event.findMany();
          const filteredEvents = events.filter((event) => {
            const eventDate = new Date(event.createdAt);
            const eventMonth = eventDate.getMonth() + 1;
            return eventMonth === monthNumber;
          });

          return ResultHandler.success(filteredEvents);
        }

        default:
          // No filters applied
          const events = await prismaDb.event.findMany();
          return ResultHandler.success(events);
      }

      // Query the database if a whereClause was constructed
      if (Object.keys(whereClause).length > 0) {
        const events = await prismaDb.event.findMany({ where: whereClause });
        return ResultHandler.success(events);
      }
      return ResultHandler.success([]);
    } catch (error) {
      return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR");
    }
  };

  // const list = async (): Promise<Result<Event[]>> => {
  //   try {
  //     const events = await prismaDb.event.findMany();
  //     return ResultHandler.success(toEventArray(events));
  //   } catch (error) {
  //     return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR");
  //   }
  // };

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
  };
};

export const eventRepository = createEventRepository(prisma);

export type EventRepository = ReturnType<typeof createEventRepository>;
