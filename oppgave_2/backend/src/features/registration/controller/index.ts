import { Hono } from "hono";
import { registrationService, RegistrationService } from "../service";
import { cors } from "hono/cors";
import { errorResponse } from "../../../lib/error";
import { Registration } from "../types";
import { Data } from "../../../types";

export const createRegistrationController = (
    registrationServiceDb: RegistrationService
  ) => {
    const app = new Hono();
  
    app.use("/*", cors());

    app.get("/:eventId", async (c) => {
        const eventId = c.req.param("eventId");
        const result = await registrationServiceDb.getAllRegistrations(eventId);
    
        if (!result.success)
          return errorResponse(c, result.error.code, result.error.message);
        return c.json(result);
      });
    
      app.get("/:eventId/:id", async (c) => {
        const id = c.req.param("id");
        const eventId = c.req.param("eventId");
        const result = await registrationServiceDb.getOneRegistration(id, eventId);
    
        if (!result.success)
          return errorResponse(c, result.error.code, result.error.message);
        return c.json(result);
      });

      app.post("/:eventId", async (c) => {
        const data = await c.req.json();
        const eventId = c.req.param("eventId");
        const result = await registrationServiceDb.createRegistration(data, eventId);
    
        if (!result.success)
          return errorResponse(c, result.error.code, result.error.message);
        return c.json<Data<Registration>>(result, { status: 201 });
      });
    
      app.patch("/:eventId/:id", async (c) => {
        const id = c.req.param("id");
        const eventId = c.req.param("eventId");
        const data = await c.req.json();
        const result = await registrationServiceDb.updateRegistration(data, id, eventId);
    
        if (!result.success)
          return errorResponse(c, result.error.code, result.error.message);
        return c.json(result);
      });
    
      app.delete("/:eventId/:id", async (c) => {
        const id = c.req.param("id");
        const eventId = c.req.param("eventId");
        const result = await registrationServiceDb.deleteRegistration(id, eventId);
    
        if (!result.success)
          return errorResponse(c, result.error.code, result.error.message);
        return c.json(result);
      });
    return app;
};

export const registrationController = createRegistrationController(registrationService);