// src/features/course/components/Course.tsx
"use client";

import { users } from "@/data/data";
import Lesson from "@/features/lesson/components/Lesson";
import { getCourse } from "@/lib/services/api";
import { useEffect, useState } from "react";

interface CourseProps {
  courseSlug: string;
}

export default function Course({ courseSlug }: CourseProps) {
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    const getContent = async () => {
      const data = await getCourse(courseSlug);
      setContent(data);
    };
    getContent();
  }, [courseSlug]);

  return (
    <div className="grid grid-cols-[250px_minmax(20%,1fr)_1fr] gap-16">
      <aside className="border-r border-slate-200 pr-6">
        <h3 className="mb-4 text-base font-bold">Leksjoner</h3>
        <ul data-testid="lessons">
          {content?.lessons?.map((lesson: any) => (
            <li
              className={`text-sm mb-4 w-full max-w-[95%] rounded-lg border border-slate-300 px-4 py-2`}
              key={lesson.id}
            >
              <a
                data-testid="lesson_url"
                className="block h-full w-full"
                href={`/courses/${content?.slug}/lessons/${lesson.slug}`}
              >
                {lesson.title}
              </a>
            </li>
          ))}
        </ul>
      </aside>
      <section>
        <h2 className="text-2xl font-bold" data-testid="course_title">
          {content?.title}
        </h2>
        <p
          className="mt-4 font-semibold leading-relaxed"
          data-testid="course_description"
        >
          {content?.description}
        </p>
      </section>
      <aside
        data-testid="enrollments"
        className="border-l border-slate-200 pl-6"
      >
        <h3 className="mb-4 text-base font-bold">Deltakere</h3>
        <ul data-testid="course_enrollments">
          {users?.map((user) => (
            <li className="mb-1" key={user.id}>
              {user.name}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
