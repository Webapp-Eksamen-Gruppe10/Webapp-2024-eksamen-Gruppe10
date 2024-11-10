import React from "react";

const LessonList = ({ lessons, courseSlug, lessonSlug }) => (
  <aside className="border-r border-slate-200 pr-6">
    <h3 className="mb-4 text-base font-bold">Leksjoner</h3>
    <ul data-testid="lessons">
      {lessons?.map((lesson) => (
        <li
          className={`text-sm mb-4 w-full max-w-[95%] rounded-lg border border-slate-300 px-4 py-2 ${
            lessonSlug === lesson.slug ? "bg-emerald-300" : "bg-transparent"
          }`}
          key={lesson.id}
        >
          <a
            data-testid="lesson_url"
            data-slug={lessonSlug}
            className="block h-full w-full"
            href={`/kurs/${courseSlug}/${lesson.slug}`}
          >
            {lesson.title}
          </a>
        </li>
      ))}
    </ul>
  </aside>
);



export default LessonList;
