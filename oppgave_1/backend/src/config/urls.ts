const endpointsV1 = {
    courses: `/api/v1/courses`,
    specificCourse: `/api/v1/courses/:id`,
    lessons: `/api/v1/courses/:id/lessons`,
    specificLesson: `/api/v1/courses/:id/lessons/:id`,
    comments: `/api/v1/courses/:id/lessons/:id/comments`,
    specificComment: `/api/v1/courses/:id/lessons/:id/comments/:id`
};

export { endpointsV1 };