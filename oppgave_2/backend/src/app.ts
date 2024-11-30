import { Hono } from "hono";
import { cors } from "hono/cors";
import { endpoint } from "./config/url";
import { eventController } from "./features/events/controller";
import { templateController } from "./features/template/controller";
import { registrationController } from "./features/registration/controller";

const app = new Hono();

app.use("/*", cors());

app.route(endpoint.event, eventController);
app.route(endpoint.template, templateController);
app.route(endpoint.registration, registrationController);

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

export default app;
