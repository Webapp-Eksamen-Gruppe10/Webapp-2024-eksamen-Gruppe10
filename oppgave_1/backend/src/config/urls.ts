const endpointsV1 = {
    courses: `/api/v1/courses`,
    specificCourse: `/api/v1/courses/:courseId`,
    comments: `/api/lessons/:lessonId/comments`,
    specificComment: `/api/v1/courses/:courseId/lessons/:lessonId/comments/:commentId`,
    lessons: `/api/v1/courses/:courseId/lessons`,
    // Under brukes ikke (todo: vurder å slette)
    specificLesson: `/api/v1/courses/:courseId/lessons/:lessonId`,
};

export { endpointsV1 };