// src/features/events/service/index.ts
import { list, create, updateById, getById, deleteById } from "../repository";
import type { Result } from "@/types";
import type {
  CreateEventDto,
  Event,
  EventWithNullableDateTime,
  UpdateEventDto,
} from "../types";

export const createEvent = async (
  data: CreateEventDto
): Promise<Result<string>> => {
  return create(data);
};

export const getAllEvents = async (): Promise<
  Result<EventWithNullableDateTime[]>
> => {
  return list();
};

export const findOneEvent = async (
  id: string
): Promise<Result<EventWithNullableDateTime>> => {
  return getById(id);
};

export const updateEvent = async (
  id: string,
  data: UpdateEventDto
): Promise<Result<EventWithNullableDateTime>> => {
  return updateById(data, id);
};

export const deleteEvent = async (id: string): Promise<Result<string>> => {
  return deleteById(id);
};
