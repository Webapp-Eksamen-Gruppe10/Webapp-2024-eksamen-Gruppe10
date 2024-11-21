// src/features/lesson/components/Lesson.tsx
"use client";

import useCourses from "@/features/courses/hooks/useCourses";
import { Course } from "@/features/courses/lib/schema";
import { Lesson as LessonProp } from "../lib/schema";
import parse, { domToReact } from "html-react-parser";

type LessonProps = {
  course?: Course;
  lesson?: LessonProp;
};

export default function Lesson({ course, lesson }: LessonProps) {
  return (
    <>
      <div className="flex justify-between">
        <h3 data-testid="course_title" className="mb-6 text-base font-bold">
          <a className="underline" href={`/courses/${course?.slug}`}>
            {course?.title}
          </a>
        </h3>
        <span data-testid="course_category">
          Kategori: <span className="font-bold">{course?.category}</span>
        </span>
      </div>
      <h2 className="text-2xl font-bold" data-testid="lesson_title">
        {lesson?.title}
      </h2>
      <p
        data-testid="lesson_preAmble"
        className="mt-4 font-semibold leading-relaxed"
      >
        {lesson?.preAmble}
      </p>
      {lesson?.text?.length &&
        lesson?.text?.length > 0 &&
        lesson?.text.map((text: any) => (
          <p
            data-testid="lesson_text"
            className="mt-4 font-normal"
            key={text.id}
          >
            {parse(text.text)}
          </p>
        ))}
    </>
  );
}
