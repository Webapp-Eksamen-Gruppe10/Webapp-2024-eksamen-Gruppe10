// src/features/events/service/index.ts
import { list, create, updateById, getById, deleteById } from "../repository";
import type { Result } from "@/types";
import type { CreateEvent, Event, UpdateEvent } from "../types";

export const createEvent = async (
  data: CreateEvent
): Promise<Result<string>> => {
  return create(data);
};

export const getAllEvents = async (): Promise<Result<Event[]>> => {
  return list();
};

export const findOneEvent = async (id: string): Promise<Result<Event>> => {
  return getById(id);
};

export const updateEvent = async (
  id: string,
  data: UpdateEvent
): Promise<Result<Event>> => {
  return updateById(data, id);
};

export const deleteEvent = async (id: string): Promise<Result<string>> => {
  return deleteById(id);
};

// // src/features/events/service/index.ts
// import {
//   list,
//   create,
//   updateById,
//   getById,
//   deleteById,
// } from "@/features/events/repository";
// import { Result } from "@/types";
// import {
//   CreateEvent,
//   DbEventWithoutId,
//   Event,
//   UpdateEvent,
// } from "../types/index";

// export const createEvent = async (
//   data: CreateEvent
// ): Promise<Result<string>> => {
//   return create(data);
// };

// export const getAllEvents = async (): Promise<Result<Event[]>> => {
//   return list();
// };

// export const findOneEvent = async (id: string): Promise<Result<Event>> => {
//   return getById(id);
// };

// export const updateEvent = async (
//   id: string,
//   data: UpdateEvent
// ): Promise<Result<DbEventWithoutId>> => {
//   return updateById(data, id);
// };

// export const deleteEvent = async (id: string): Promise<Result<string>> => {
//   return deleteById(id);
// };
