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
import { errorResponse } from "@/lib/error";
import { eventCreateSchema } from "../helpers/schema";
import type { CreateEvent, UpdateEvent } from "../types";

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
  const parsed = eventCreateSchema.safeParse(body);

  if (!parsed.success) {
    return errorResponse(c, "BAD_REQUEST", "Invalid event data");
  }

  const result = await createEvent(parsed.data);
  if (!result.success) {
    return errorResponse(c, result.error.code, result.error.message);
  }
  return c.json(result, { status: 201 });
});

EventController.patch("/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  const data = body as UpdateEvent;

  const result = await updateEvent(id, data);
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

// // src/features/events/controller/index.ts
// import { Hono } from "hono";
// import {
//   createEvent,
//   getAllEvents,
//   findOneEvent,
//   updateEvent,
//   deleteEvent,
// } from "../service";
// import { cors } from "hono/cors";
// import { errorResponse } from "@/lib/error";
// import type { Data } from "@/types";

// const EventController = new Hono();

// EventController.use("/*", cors());

// // GET /v1/events
// EventController.get("/", async (c) => {
//   const result = await getAllEvents();
//   if (!result.success) {
//     return errorResponse(c, result.error.code, result.error.message);
//   }
//   return c.json(result);
// });

// // GET /v1/events/:id
// EventController.get("/:id", async (c) => {
//   const id = c.req.param("id");
//   const result = await findOneEvent(id);
//   if (!result.success) {
//     return errorResponse(c, result.error.code, result.error.message);
//   }
//   return c.json(result);
// });

// // POST /v1/events
// EventController.post("/", async (c) => {
//   const dataFromFrontend = await c.req.json();
//   const result = await createEvent(dataFromFrontend);
//   if (!result.success) {
//     return errorResponse(c, result.error.code, result.error.message);
//   }
//   return c.json<Data<string>>(result, { status: 201 });
// });

// // PATCH /v1/events/:id
// EventController.patch("/:id", async (c) => {
//   const id = c.req.param("id");
//   const dataFromFrontend = await c.req.json();
//   const result = await updateEvent(id, dataFromFrontend);
//   if (!result.success) {
//     return errorResponse(c, result.error.code, result.error.message);
//   }
//   return c.json(result);
// });

// // DELETE /v1/events/:id
// EventController.delete("/:id", async (c) => {
//   const id = c.req.param("id");
//   const result = await deleteEvent(id);
//   if (!result.success) {
//     return errorResponse(c, result.error.code, result.error.message);
//   }
//   return c.json(result);
// });

// export { EventController };
