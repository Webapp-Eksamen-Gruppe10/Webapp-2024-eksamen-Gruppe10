const baseUrl = "http://localhost:3999";
const endpointV3 = {
  comment: `${baseUrl}/api/v1/lessons`,
  course: `${baseUrl}/api/v1/courses`
};

export { baseUrl, endpointV3 as endpoint };