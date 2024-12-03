import { Event } from "./../types/index";

import { Hono } from "hono";

import { EventService, eventService } from "../service";
import { errorResponse } from "../../../lib/error";

export const createEventController = (eventServiceDb: EventService) => {
  const app = new Hono();

  app.get("/", async (c) => {
    const queryParams = c.req.query();

    const result = await eventServiceDb.getAllEvents(queryParams);

    if (!result.success) {
      return errorResponse(c, result.error.code, result.error.message);
    }
    return c.json(result);
  });

  app.get("/:id", async (c) => {
    const id = c.req.param("id");
    const result = await eventServiceDb.getOneEvent(id);
    if (!result.success) {
      return errorResponse(c, result.error.code, result.error.message);
    }
    return c.json(result);
  });

  app.post("/", async (c) => {
    const data = await c.req.json();
    const result = await eventServiceDb.createEvent(data);
    if (!result.success) {
      return errorResponse(c, result.error.code, result.error.message);
    }
    return c.json(result, { status: 201 });
  });

  app.patch("/:id", async (c) => {
    const id = c.req.param("id");
    const data = await c.req.json();

    const result = await eventServiceDb.updateEvent(data, id);
    if (!result.success) {
      return errorResponse(c, result.error.code, result.error.message);
    }
    return c.json(result);
  });

  app.delete("/:id", async (c) => {
    const id = c.req.param("id");
    const result = await eventServiceDb.deleteEvent(id);
    if (!result.success) {
      return errorResponse(c, result.error.code, result.error.message);
    }
    return c.json(result);
  });

  return app;
};

export const eventController = createEventController(eventService);
