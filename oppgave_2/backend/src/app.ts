import { Hono } from "hono";
import { cors } from "hono/cors";
import { EventController } from "./features/events/controller";
import { templateController } from "./features/template/controller";

const app = new Hono();

app.use("/*", cors());

app.route("/v1/events", EventController);

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

app.route("/api/v1/templates", templateController)

export default app;
