// src/features/events/repository/index.ts
import { ResultHandler } from "../../../lib/result";
import prisma, { Prisma } from "../../../lib/client/db";
import { Result } from "@/types";
import { fromDb, toEventArray, toDb, UpdateEventToDb } from "../helpers/mapper";
import { Event, EventWithoutId } from "../types";

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

  const list = async (): Promise<Result<Event[]>> => {
    try {
      const events = await prismaDb.event.findMany();
      return ResultHandler.success(toEventArray(events));
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
    data: Event,
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
