import { Hono } from "hono";
import { templateService, TemplateService } from "../service";
import { cors } from "hono/cors";
import { errorResponse } from "../../../lib/error";
import { Data } from "../../../types";
import { Template } from "../types";

 export const createTemplateController = (templateServiceDb: TemplateService) => {
     const app = new Hono();

     app.use("/*", cors())

     app.get("/", async (c) => {
         const result = await templateServiceDb.getAllTemplates()

         if(!result.success)
             return errorResponse(c, result.error.code, result.error.message)
         return c.json(result)
     });

         app.get("/:id", async(c) => {
         const id = c.req.param("id")
         const result = await templateServiceDb.getOneTemplate(id)

         if(!result.success)
             return errorResponse(c, result.error.code, result.error.message)
         return c.json(result)
     })

     app.post("/", async(c) => {
         const data = await c.req.json();
         const result = await templateServiceDb.createTemplate(data)

         if(!result.success)
             return errorResponse(c, result.error.code, result.error.message)
         return c.json<Data<Template>>(result, { status: 201 })
     })

     app.patch("/:id", async(c) => {
         const id = c.req.param("id");
         const data = await c.req.json();
         const result = await templateServiceDb.updateTemplate(data, id)

         if(!result.success)
             return errorResponse(c, result.error.code, result.error.message)
         return c.json(result)
     })

     app.delete("/:id", async(c) => {
         const id = c.req.param("id");
         const result = await templateServiceDb.deleteTemplate(id)

         if(!result.success)
             return errorResponse(c, result.error.code, result.error.message)
         return c.json(result)
     })

     return app;
 }

 export const templateController = createTemplateController(templateService)
