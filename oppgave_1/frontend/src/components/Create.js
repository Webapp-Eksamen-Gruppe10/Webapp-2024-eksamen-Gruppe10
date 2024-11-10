import React from "react";
import { useCreateCourseForm } from "../hooks/useCreateCourseForm";
import CourseForm from "./CourseForm";
import LessonList from "./LessonList";

function Create({ categories, courseCreateSteps }) {
  const {
    success,
    formError,
    step,
    courseFields,
    lessons,
    current,
    currentLesson,
    handleCourseFieldChange,
    handleLessonFieldChange,
    handleSubmit,
    addLesson,
  } = useCreateCourseForm(courseCreateSteps);

  return (
    <section className="create-course">
      <nav className="mb-8 flex w-full">
        {/* Step navigation */}
      </nav>
      <h2 className="text-xl font-bold" data-testid="title">Lag nytt kurs</h2>
      <form className="mt-8 max-w-4xl" data-testid="form" noValidate>
        {current === 0 && (
          <CourseForm
            courseFields={courseFields}
            handleCourseFieldChange={handleCourseFieldChange}
            categories={categories}
          />
        )}
        {current === 1 && (
          <LessonList
            lessons={lessons}
            currentLesson={currentLesson}
            addLesson={addLesson}
          />
        )}
        <button
          type="button"
          onClick={handleSubmit}
          className="publish-button"
          disabled={lessons.length === 0 || !isValid(courseFields)}
        >
          Publiser
        </button>
      </form>
    </section>
  );
}

export default Create;
