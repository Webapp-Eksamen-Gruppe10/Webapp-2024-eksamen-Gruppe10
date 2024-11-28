import { Hono } from "hono";
import { cors } from "hono/cors";
import { EventController } from "./features/events/controller";
import { endpoint } from "./config/url";
import { templateController } from "./features/template/controller";

const app = new Hono();

app.use("/*", cors());

app.route(endpoint.event, EventController);

app.onError((err, c) => {
  console.error(err);

  return c.json(
    {
      error: {
        message: err.message,
      },
    },
    { status: 500 }
  );
});

app.route(endpoint.template, templateController)

export default app;
