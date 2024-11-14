const endpointsV1 = {
    courses: `/api/v1/courses`,
    specificCourse: `/api/v1/courses/:courseId`,
    comments: `/api/lessons/:lessonId/comments`,
    specificComment: `/api/v1/courses/:courseId/lessons/:lessonId/comments/:commentId`,
    // Under brukes ikke (todo: vurder å slette)
    lessons: `/api/v1/courses/:courseId/lessons`,
    specificLesson: `/api/v1/courses/:courseId/lessons/:lessonId`,
};

export { endpointsV1 };