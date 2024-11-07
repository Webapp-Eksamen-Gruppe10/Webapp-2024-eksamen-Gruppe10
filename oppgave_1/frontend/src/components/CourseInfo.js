import React from "react";

const CourseInfo = ({ course }) => (
  <div className="flex justify-between">
    <h3 data-testid="course_title" className="mb-6 text-base font-bold">
      <a className="underline" href={`/kurs/${course?.slug}`}>
        {course?.title}
      </a>
    </h3>
    <span data-testid="course_category">
      Kategori: <span className="font-bold">{course?.category}</span>
    </span>
  </div>
);

export default CourseInfo;
