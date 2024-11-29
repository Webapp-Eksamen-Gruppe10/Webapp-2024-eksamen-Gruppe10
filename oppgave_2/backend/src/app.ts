import { Hono } from "hono";
import { cors } from "hono/cors";
import { endpoint } from "./config/url";
import { eventController } from "./features/events/controller";
import { templateController } from "./features/template/controller";
// import { templateController } from "./features/template/controller";

const app = new Hono();

app.use("/*", cors());

// lagde ny events ettersom denne skal ikke ha med baseurl, men kun /api/v1/events
app.route(endpoint.events, eventController);
app.route(endpoint.templates, templateController);

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
// app.route("/api/v1/templates", templateController)

export default app;
