// src/features/events/repository/index.ts
import { ResultHandler } from "../../../lib/result";
import prisma from "../../../lib/client/db";
import { fromDb, createEventToDb, updateEventToDb } from "../helpers/mapper";
import type { CreateEventDto, Event, UpdateEventDto } from "../types";

export const create = async (data: CreateEventDto) => {
  try {
    const eventData = createEventToDb(data);
    const created = await prisma.event.create({
      data: eventData,
    });
    return ResultHandler.success(created.id);
  } catch (error) {
    return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR");
  }
};

export const list = async () => {
  try {
    const events = await prisma.event.findMany();
    return ResultHandler.success(events.map(fromDb));
  } catch (error) {
    return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR");
  }
};

export const getById = async (id: string) => {
  try {
    const event = await prisma.event.findUniqueOrThrow({
      where: { id },
    });
    return ResultHandler.success(fromDb(event));
  } catch (error) {
    return ResultHandler.failure(error, "NOT_FOUND");
  }
};

export const updateById = async (data: UpdateEventDto, id: string) => {
  try {
    const updatedData = updateEventToDb(data);
    const updated = await prisma.event.update({
      where: { id },
      data: updatedData,
    });
    return ResultHandler.success(fromDb(updated));
  } catch (error) {
    return ResultHandler.failure(error, "NOT_FOUND");
  }
};

export const deleteById = async (id: string) => {
  try {
    await prisma.event.delete({ where: { id } });
    return ResultHandler.success(id);
  } catch (error) {
    return ResultHandler.failure(error, "NOT_FOUND");
  }
};
