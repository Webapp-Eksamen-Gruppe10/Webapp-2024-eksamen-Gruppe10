import { serve } from "@hono/node-server";
import app from "./app";
import { port } from "./config";


console.log(`Server is running on port ${port}`);


serve({
  fetch: app.fetch,
  port,
});
