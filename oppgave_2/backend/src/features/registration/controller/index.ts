import { Hono } from "hono";
import { registrationService, RegistrationService } from "../service";
import { cors } from "hono/cors";
import { errorResponse } from "../../../lib/error";

export const createRegistrationController = (
    registrationServiceDb: RegistrationService
  ) => {
    const app = new Hono();
  
    app.use("/*", cors());

    app.get("/", async (c) => {
        const result = await registrationServiceDb.getAllRegistrations();
    
        if (!result.success)
          return errorResponse(c, result.error.code, result.error.message);
        return c.json(result);
      });
    
      app.get("/:id", async (c) => {
        const id = c.req.param("id");
        const result = await registrationServiceDb.getOneRegistration(id);
    
        if (!result.success)
          return errorResponse(c, result.error.code, result.error.message);
        return c.json(result);
      });
    return app;
};

export const registrationController = createRegistrationController(registrationService);