// src/features/lesson/components/Lesson.tsx
"use client";

import useCourses from "@/features/courses/hooks/useCourses";

interface LessonProps {
  courseSlug: string
  lessonSlug: string
}

export default function Lesson({ courseSlug, lessonSlug }: LessonProps) {

  const { data } = useCourses(courseSlug)
  const course = data[0];
  const lesson = course.lessons.find(item => item.slug === lessonSlug);

  return (
    <div>
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
      {lesson?.text?.length && lesson?.text?.length > 0 &&
        lesson?.text.map((text: any) => (
          <p
            data-testid="lesson_text"
            className="mt-4 font-normal"
            key={text.id}
          >
            {text.text}
          </p>
        ))}
    </div>
  );
}
