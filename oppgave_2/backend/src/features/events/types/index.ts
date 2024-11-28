export type Event = {
  id: string;
  template_id: string;
  title: string;
  datetime: Date;
  location: string;
  category: string;
  capacity: number;
  price: number;
  description: string;
  private: boolean;
  waitinglist: boolean;
};

export type DbEvent = {
  id: string;
  template_id: string;
  title: string;
  datetime: Date;
  location: string;
  category: string;
  capacity: number;
  price: number;
  description: string;
  private: boolean;
  waitinglist: boolean;
};

export type EventWithNullableDateTime = Omit<Event, "datetime"> & {
  dateTime: Date | null;
};

export type CreateEventDto = Pick<
  Event,
  | "template_id"
  | "title"
  | "datetime"
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
  "datetime",
  "location",
  "category",
  "capacity",
  "price",
  "description",
  "private",
  "waitinglist",
];

export type EventKeys = keyof Event;
