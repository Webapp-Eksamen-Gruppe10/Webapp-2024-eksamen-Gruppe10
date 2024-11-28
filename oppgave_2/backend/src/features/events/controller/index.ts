// src/features/events/controller/index.ts
import { Hono } from "hono";
import {
  createEvent,
  getAllEvents,
  findOneEvent,
  updateEvent,
  deleteEvent,
} from "../service";
import { cors } from "hono/cors";
import { errorResponse } from "../../../lib/error";
import { validateEventWithoutId, validateEvent } from "../helpers/schema";
import type { CreateEventDto, UpdateEventDto } from "../types";

const EventController = new Hono();

EventController.use("/*", cors());

EventController.get("/", async (c) => {
  const result = await getAllEvents();
  if (!result.success) {
    return errorResponse(c, result.error.code, result.error.message);
  }
  return c.json(result);
});

EventController.get("/:id", async (c) => {
  const id = c.req.param("id");
  const result = await findOneEvent(id);
  if (!result.success) {
    return errorResponse(c, result.error.code, result.error.message);
  }
  return c.json(result);
});

EventController.post("/", async (c) => {
  const body = await c.req.json();
  const parsed = validateEventWithoutId(body);

  if (!parsed.success) {
    console.error("Validation Errors:", parsed.error.errors); // Log errors

    return errorResponse(c, "BAD_REQUEST", "Invalid event data");
  }

  const result = await createEvent(parsed.data as CreateEventDto);
  if (!result.success) {
    return errorResponse(c, result.error.code, result.error.message);
  }
  return c.json(result, { status: 201 });
});

EventController.patch("/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  const parsed = validateEvent(body);

  if (!parsed.success) {
    return errorResponse(c, "BAD_REQUEST", "Invalid event data");
  }

  const result = await updateEvent(id, parsed.data as UpdateEventDto);
  if (!result.success) {
    return errorResponse(c, result.error.code, result.error.message);
  }
  return c.json(result);
});

EventController.delete("/:id", async (c) => {
  const id = c.req.param("id");
  const result = await deleteEvent(id);
  if (!result.success) {
    return errorResponse(c, result.error.code, result.error.message);
  }
  return c.json(result);
});

export { EventController };
