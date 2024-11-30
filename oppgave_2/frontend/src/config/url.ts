const baseUrl = "http://localhost:3999";
const endpoint = {
  events: {
    list: `${baseUrl}/api/v1/events`,
    details: `${baseUrl}/api/v1/events/{id}`,
    create: `${baseUrl}/api/v1/events`,
    delete: `${baseUrl}/api/v1/events/{id}`,
    update: `${baseUrl}/api/v1/events/{id}`
  },
  registrations: {
    listAll: `${baseUrl}/api/v1/registrations`,
    listByEvent: `${baseUrl}/api/v1/registrations/{eventId}`,
    details: `${baseUrl}/api/v1/registrations/{eventId}/{id}`,
    create: `${baseUrl}/api/v1/registrations/{eventId}`,
    delete: `${baseUrl}/api/v1/registrations/{eventId}/{id}`,
    update: `${baseUrl}/api/v1/registrations/{eventId}/{id}`
  },
  templates: {
    listByTemplates: `${baseUrl}/api/v1/templates`,
    details: `${baseUrl}/api/v1/templates/{id}`,
    create: `${baseUrl}/api/v1/templates`,
    update: `${baseUrl}/api/v1/templates/{id}`,
    delete: `${baseUrl}/api/v1/templates/{id}`,
  },
};

export { baseUrl, endpoint };