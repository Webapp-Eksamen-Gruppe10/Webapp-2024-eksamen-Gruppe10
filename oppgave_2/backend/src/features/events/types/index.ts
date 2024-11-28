// src/features/events/types/index.ts

import { Registration } from "@/features/registration/types";
import { Template } from "@/features/template/types";

export type Event = {
  id: string;
  template_id: string;
  title: string;
  dateTime: Date;
  location: string;
  category: string[];
  capacity: number;
  price: number;
  description: string;
  private: boolean;
  waitinglist: boolean;
  participants?: Registration[];
  template?: Template;
};

export type DbEvent = {
  id: string;
  template_id: string;
  title: string;
  dateTime: Date;
  location: string;
  category: string;
  capacity: number;
  price: number;
  description: string;
  private: boolean;
  waitinglist: boolean;
};

export type CreateEventDto = Pick<
  Event,
  | "template_id"
  | "title"
  | "dateTime"
  | "location"
  | "category"
  | "capacity"
  | "price"
  | "description"
  | "private"
  | "waitinglist"
>;

export type UpdateEventDto = Partial<CreateEventDto>;

export const eventFields: (keyof Event)[] = [
  "id",
  "template_id",
  "title",
  "dateTime",
  "location",
  "category",
  "capacity",
  "price",
  "description",
  "private",
  "waitinglist",
  "participants",
  "template",
];

export type EventKeys = keyof Event;
