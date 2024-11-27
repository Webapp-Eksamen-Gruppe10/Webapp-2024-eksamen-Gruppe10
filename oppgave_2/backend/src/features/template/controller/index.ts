import { Hono } from "hono";
import { TemplateService } from "../service";
import { cors } from "hono/cors";
import { errorResponse } from "@/lib/error";

export const createTemplateController = (templateServiceDb: TemplateService) => {
    const app = new Hono();

    app.use("/*", cors())

    app.get("", async (c) => {
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

    app.post("", async(c) => {
        const data = c.req.json();
        const result = await templateServiceDb.createTemplate(data)
    })
}