import React from "react";

const LessonSelector = ({ lessons, currentLesson, changeCurrentLesson, addLesson }) => (
  <aside className="border-r border-slate-200 pr-6">
    <h3 className="mb-4 text-base font-bold">Leksjoner</h3>
    <ul data-testid="lessons">
      {lessons.map((lesson, index) => (
        <li
          className={`border mb-4 w-full rounded px-4 py-2 text-base ${
            index === currentLesson
              ? "border-transparent bg-emerald-200"
              : "border-slate-300 bg-transparent"
          }`}
          key={lesson.id}
        >
          <button
            type="button"
            className="w-full max-w-full truncate pr-2 text-left"
            onClick={() => changeCurrentLesson(index)}
          >
            {lesson.title || `Leksjon ${index + 1}`}
          </button>
        </li>
      ))}
    </ul>
    <button
      className="w-full bg-slate-100 px-2 py-2"
      type="button"
      onClick={addLesson}
      data-testid="form_lesson_add"
    >
      + Ny leksjon
    </button>
  </aside>
);

export default LessonSelector;
