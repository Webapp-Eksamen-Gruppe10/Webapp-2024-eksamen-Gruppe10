// src/features/lesson/components/Lesson.tsx
"use client";

import {
  getCourse,
  getLesson,
} from "@/lib/services/api";
import { useEffect, useState } from "react";

interface LessonProps {
  courseSlug: string;
  lessonSlug: string;
}

export default function Lesson({ courseSlug, lessonSlug }: LessonProps) {
  const [lesson, setLesson] = useState<any>(null);
  const [course, setCourse] = useState<any>(null);

  useEffect(() => {
    const getContent = async () => {
      const lessonData = await getLesson(courseSlug, lessonSlug);
      const courseData = await getCourse(courseSlug);
      setLesson(lessonData);
      setCourse(courseData);
    };
    getContent();
  }, [courseSlug, lessonSlug]);

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
      {lesson?.text?.length > 0 &&
        lesson.text.map((text: any) => (
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
