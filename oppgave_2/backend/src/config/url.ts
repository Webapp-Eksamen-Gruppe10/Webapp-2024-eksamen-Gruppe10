import { port } from "../config/index";

const baseUrl = `http://localhost:${port}`;
const endpointV1 = {
  event: `${baseUrl}/api/v1/events`,
  events: `/api/v1/events`,
  templates: `/api/v1/templates`,
  registration: `${baseUrl}/api/v1/registrations`,
  template: `${baseUrl}/api/v1/templates`,
};

export { baseUrl, endpointV1 as endpoint };
