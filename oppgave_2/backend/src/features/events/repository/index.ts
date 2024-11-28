// src/features/events/repository/index.ts
import { ResultHandler } from "@/lib/result";
import prisma from "@/lib/client/db";
import { toDbEvent, toDbEventUpdate, toEvent } from "../helpers/mapper";
import type { CreateEvent, Event, UpdateEvent } from "../types";

export const create = async (data: CreateEvent) => {
  try {
    const eventData = toDbEvent(data);
    const created = await prisma.event.create({
      data: eventData,
      include: {
        participants: true,
        template: true,
      },
    });
    return ResultHandler.success(created.id);
  } catch (error) {
    return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR");
  }
};

export const list = async () => {
  try {
    const events = await prisma.event.findMany({
      include: {
        participants: true,
        template: true,
      },
    });
    return ResultHandler.success(events.map(toEvent));
  } catch (error) {
    return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR");
  }
};

export const getById = async (id: string) => {
  try {
    const event = await prisma.event.findUniqueOrThrow({
      where: { id },
      include: {
        participants: true,
        template: true,
      },
    });
    return ResultHandler.success(toEvent(event));
  } catch (error) {
    return ResultHandler.failure(error, "NOT_FOUND");
  }
};

export const updateById = async (data: Partial<UpdateEvent>, id: string) => {
  try {
    const updatedData = toDbEventUpdate(data);
    const updated = await prisma.event.update({
      where: { id },
      data: updatedData,
      include: {
        participants: true,
        template: true,
      },
    });
    return ResultHandler.success(toEvent(updated));
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

// // src/features/events/repository/index.ts
// import { ResultHandler } from "@/lib/result";
// import prisma from "@/lib/client/db";
// import {
//   toDbEvent,
//   toEvent,
// } from "../helpers/mapper";
// import { CreateEvent, DbEvent, UpdateEvent } from "../types";

// export const create = async (data: CreateEvent) => {
//   try {
//     const eventData = toDbEvent(data);
//     const created = await prisma.event.create({ data: eventData });
//     return ResultHandler.success(created.id);
//   } catch (error) {
//     return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR");
//   }
// };

// export const list = async () => {
//   try {
//     const events: DbEvent[] = await prisma.event.findMany({
//       include: {
//         participants: true,
//         template: true,
//       },
//     });
//     return ResultHandler.success(events.map(toEvent));
//   } catch (error) {
//     return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR");
//   }
// };

// export const getById = async (id: string) => {
//   try {
//     const event: DbEvent = await prisma.event.findUniqueOrThrow({
//       where: { id },
//       include: {
//         participants: true,
//         template: true,
//       },
//     });
//     return ResultHandler.success(toEvent(event));
//   } catch (error) {
//     return ResultHandler.failure(error, "NOT_FOUND");
//   }
// };

// export const updateById = async (data: UpdateEvent, id: string) => {
//   try {
//     const updatedData = toDbEvent(data);
//     const updated = await prisma.event.update({
//       where: { id },
//       data: updatedData,
//     });
//     return ResultHandler.success(updated);
//   } catch (error) {
//     return ResultHandler.failure(error, "NOT_FOUND");
//   }
// };

// export const deleteById = async (id: string) => {
//   try {
//     await prisma.event.delete({ where: { id } });
//     return ResultHandler.success(id);
//   } catch (error) {
//     return ResultHandler.failure(error, "NOT_FOUND");
//   }
// };
