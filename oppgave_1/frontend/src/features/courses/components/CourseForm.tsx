"use client";

import { isValid } from "@/lib/index";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Category, Course, courseCreateSteps } from "../lib/schema";
import { Lesson } from "@/features/lesson/lib/schema";
import useCourses from "../hooks/useCourses";
import Tiptap from "@/components/Tiptap";

type CourseFormProps = {
  course?: Course;
};

export default function CourseForm(props: CourseFormProps) {
  const { course } = props;
  const isEditing = !!course;

  const [success, setSuccess] = useState(false);
  const [formError, setFormError] = useState(false);
  const [current, setCurrent] = useState(0);
  const [currentLesson, setCurrentLesson] = useState(0);
  const { add, update } = useCourses();
  const [courseFields, setCourseFields] = useState(
    isEditing
      ? {
          title: course.title,
          slug: course.slug,
          description: course.description,
          category: course.category,
        }
      : {
          title: "",
          slug: "",
          description: "",
          category: Category.Enum.empty,
        }
  );
  const [lessons, setLessons] = useState<Lesson[]>(
    isEditing ? course.lessons : []
  );

  const router = useRouter();

  const step = courseCreateSteps[current]?.name;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setFormError(false);
    setSuccess(false);

    if (lessons.length > 0 && isValid(lessons) && isValid(courseFields)) {
      setSuccess(true);
      setCurrent(2);
      if (isEditing)
        update({ id: course.id, ...courseFields, lessons: lessons });
      else add({ ...courseFields, lessons: lessons });
      console.log(JSON.stringify({ ...courseFields, lessons: lessons }));
      setTimeout(() => {
        if (isEditing) router.push(`/courses/${course.slug}`);
        else router.push("/courses");
      }, 500);
    } else {
      setFormError(true);
    }
  };

  const addTextBox = () => {
    const updatedLessonText = lessons.map((lesson, i) => {
      if (currentLesson === i) {
        const text = [
          { id: `${Math.floor(Math.random() * 1000 + 1)}`, text: "" },
        ];
        if (lesson.text.length === 0) {
          text.push({
            id: `${Math.floor(Math.random() * 1000 + 1)}`,
            text: "",
          });
        }
        return {
          ...lesson,
          text: [...lesson.text, ...text],
        };
      }
      return lesson;
    });
    setLessons(updatedLessonText);
  };

  const removeTextBox = (index: number) => {
    const removed = lessons[currentLesson].text.filter((_, i) => i !== index);
    const updatedLessonText = lessons.map((lesson, i) => {
      if (currentLesson === i) {
        return {
          ...lesson,
          text: removed,
        };
      }
      return lesson;
    });
    setLessons(updatedLessonText);
  };

  const handleCourseFieldChange = (event: React.FormEvent) => {
    const { name, value } = event.target as HTMLInputElement;
    setCourseFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleStep = (index: number) => {
    setFormError(false);
    switch (index) {
      case 0:
        return setCurrent(0);
      case 1:
        return isValid(courseFields) ? setCurrent(1) : setFormError(true);
      default:
        break;
    }
  };

  const handleLessonFieldChange = (event: React.FormEvent, index?: number) => {
    const { name, value } = event.target as HTMLInputElement;
    let text;
    if (lessons[currentLesson]?.text?.length === 0) {
      text = [{ id: `${Math.floor(Math.random() * 1000 + 1)}`, text: "" }];
    }
    if (lessons[currentLesson]?.text?.length > 0) {
      text = lessons[currentLesson]?.text?.map((_text, i) => {
        if (i === index) {
          return { id: _text.id, [name]: value };
        }
        return _text;
      });
    }

    const updatedLessons = lessons.map((lesson, i) => {
      if (i === currentLesson) {
        return { ...lesson, [name]: value, text: text?.length > 0 ? text : [] };
      }
      return lesson;
    });
    setLessons(updatedLessons);
  };

  const changeCurrentLesson = (index: number) => {
    setCurrentLesson(index);
  };

  const addLesson = () => {
    setLessons((prev) => [
      ...prev,
      {
        id: `${Math.floor(Math.random() * 1000 + 1)}`,
        title: "",
        slug: "",
        preAmble: "",
        text: [],
        order: `${lessons.length}`,
      },
    ]);
    setCurrentLesson(lessons.length);
  };

  return (
    <>
      <nav className="mb-8 flex w-full">
        <ul data-testid="steps" className="flex w-full">
          {courseCreateSteps?.map((courseStep, index) => (
            <button
              type="button"
              data-testid="step"
              key={courseStep.name}
              onClick={() => handleStep(index)}
              className={`h-12 w-1/4 border border-slate-200 ${
                step === courseStep.name
                  ? "border-transparent bg-slate-400"
                  : "bg-transparent"
              }`}
            >
              {courseStep.name}
            </button>
          ))}
          {isEditing ? (
            <button
              disabled={
                lessons?.length === 0 ||
                !(isValid(lessons) && isValid(courseFields))
              }
              data-testid="form_submit"
              type="button"
              onClick={handleSubmit}
              className="h-12 w-1/4 border border-slate-200 bg-emerald-300 disabled:bg-transparent disabled:opacity-50"
            >
              Oppdater
            </button>
          ) : (
            <button
              disabled={
                lessons?.length === 0 ||
                !(isValid(lessons) && isValid(courseFields))
              }
              data-testid="form_submit"
              type="button"
              onClick={handleSubmit}
              className="h-12 w-1/4 border border-slate-200 bg-emerald-300 disabled:bg-transparent disabled:opacity-50"
            >
              Publiser
            </button>
          )}
        </ul>
      </nav>
      {isEditing ? (
        <h2 className="text-xl font-bold" data-testid="title">
          Oppdater kurset
        </h2>
      ) : (
        <h2 className="text-xl font-bold" data-testid="title">
          Lag nytt kurs
        </h2>
      )}
      <form className="mt-8 max-w-4xl" data-testid="form" noValidate>
        {current === 0 ? (
          <div data-testid="course_step" className="max-w-lg">
            {/* {JSON.stringify(courseFields)} */}
            <label className="mb-4 flex flex-col" htmlFor="title">
              <span className="mb-1 font-semibold">Tittel*</span>
              <input
                className="rounded"
                data-testid="form_title"
                type="text"
                name="title"
                id="title"
                value={courseFields?.title}
                onChange={handleCourseFieldChange}
              />
            </label>
            <label className="mb-4 flex flex-col" htmlFor="slug">
              <span className="mb-1 font-semibold">Slug*</span>
              <input
                className="rounded"
                data-testid="form_slug"
                type="text"
                name="slug"
                id="slug"
                value={courseFields?.slug}
                onChange={handleCourseFieldChange}
              />
            </label>
            <label className="mb-4 flex flex-col" htmlFor="description">
              <span className="mb-1 font-semibold">Beskrivelse*</span>
              <input
                className="rounded"
                data-testid="form_description"
                type="text"
                name="description"
                id="description"
                value={courseFields?.description}
                onChange={handleCourseFieldChange}
              />
            </label>
            <label className="mb-4 flex flex-col" htmlFor="category">
              <span className="mb-1 font-semibold">Kategori*</span>
              <select
                className="rounded"
                data-testid="form_category"
                name="category"
                id="category"
                value={courseFields?.category}
                onChange={handleCourseFieldChange}
              >
                <option disabled value="">
                  Velg kategori
                </option>
                {Object.values(Category.Values).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>
          </div>
        ) : null}
        {current === 1 ? (
          <div
            data-testid="lesson_step"
            className="grid w-full grid-cols-[350px_minmax(50%,_1fr)] gap-12"
          >
            <aside className="border-r border-slate-200 pr-6">
              <h3 className="mb-4 text-base font-bold">Leksjoner</h3>
              <ul data-testid="lessons">
                {lessons?.length > 0 &&
                  lessons?.map((lesson, index) => (
                    <li
                      className={`borde mb-4 w-full rounded px-4 py-2 text-base ${
                        index === currentLesson
                          ? "border border-transparent bg-emerald-200"
                          : "border border-slate-300 bg-transparent"
                      }`}
                      key={lesson?.id ?? index}
                    >
                      <button
                        type="button"
                        data-testid="select_lesson_btn"
                        className="w-full max-w-full truncate pr-2 text-left"
                        onClick={() => changeCurrentLesson(index)}
                      >
                        {" "}
                        {lesson?.title || `Leksjon ${index + 1}`}
                      </button>
                    </li>
                  ))}
              </ul>
              <div className="flex">
                <button
                  className="w-full bg-slate-100 px-2 py-2"
                  type="button"
                  onClick={addLesson}
                  data-testid="form_lesson_add"
                >
                  + Ny leksjon
                </button>
              </div>
            </aside>
            {lessons?.length > 0 ? (
              <div className="w-full">
                <label className="mb-4 flex flex-col" htmlFor="title">
                  <span className="mb-1 font-semibold">Tittel*</span>
                  <input
                    className="rounded"
                    data-testid="form_lesson_title"
                    type="text"
                    name="title"
                    id="title"
                    value={lessons[currentLesson]?.title}
                    onChange={handleLessonFieldChange}
                  />
                </label>
                <label className="mb-4 flex flex-col" htmlFor="slug">
                  <span className="mb-1 font-semibold">Slug*</span>
                  <input
                    className="rounded"
                    data-testid="form_lesson_slug"
                    type="text"
                    name="slug"
                    id="slug"
                    value={lessons[currentLesson]?.slug}
                    onChange={handleLessonFieldChange}
                  />
                </label>
                <label className="mb-4 flex flex-col" htmlFor="preAmble">
                  <span className="mb-1 font-semibold">Ingress*</span>
                  <input
                    className="rounded"
                    data-testid="form_lesson_preAmble"
                    type="text"
                    name="preAmble"
                    id="preAmble"
                    value={lessons[currentLesson]?.preAmble}
                    onChange={handleLessonFieldChange}
                  />
                </label>
                {lessons[currentLesson]?.text?.length > 1 ? (
                  lessons[currentLesson]?.text?.map((field, index) => (
                    <div key={field?.id}>
                      <label
                        className="mt-4 flex flex-col"
                        htmlFor={`text-${field?.id}`}
                      >
                        <span className="text-sm font-semibold">Tekst*</span>
                        <Tiptap
                          name="text"
                          id={`text-${field?.id}`}
                          value={field?.text}
                          onChange={(event) =>
                            handleLessonFieldChange(event, index)
                          }
                          data-testid="form_lesson_text"
                        />

                        {/* <textarea
                          data-testid="form_lesson_text"
                          name="text"
                          id={`text-${field?.id}`}
                          value={field?.text}
                          onChange={(event) =>
                            handleLessonFieldChange(event, index)
                          }
                          className="w-full rounded bg-slate-100"
                          cols={30}
                        /> */}
                      </label>
                      <button
                        className="text-sm font-semibold text-red-400 "
                        type="button"
                        onClick={() => removeTextBox(index)}
                      >
                        Fjern
                      </button>
                    </div>
                  ))
                ) : (
                  <label className="mb-4 flex flex-col" htmlFor="text">
                    <span className="mb-1 text-sm font-semibold">Tekst*</span>
                    <Tiptap
                      data-testid="form_lesson_text"
                      name="text"
                      id="text"
                      value={lessons[currentLesson]?.text?.[0]?.text}
                      onChange={(event) => handleLessonFieldChange(event, 0)}
                    />
                    {/* <textarea
                      data-testid="form_lesson_text"
                      name="text"
                      id="text"
                      value={lessons[currentLesson]?.text?.[0]?.text}
                      onChange={(event) => handleLessonFieldChange(event, 0)}
                      className="w-full rounded bg-slate-100"
                      cols={30}
                    /> */}
                  </label>
                )}
                <button
                  className="mt-6 w-full rounded bg-gray-300 px-4 py-3 font-semibold"
                  type="button"
                  onClick={addTextBox}
                  data-testid="form_lesson_add_text"
                >
                  + Legg til tekstboks
                </button>
              </div>
            ) : null}
          </div>
        ) : null}
        {formError ? (
          <p data-testid="form_error">Fyll ut alle felter med *</p>
        ) : null}
        {success ? (
          <p className="text-emerald-600" data-testid="form_success">
            Skjema sendt
          </p>
        ) : null}
        {current === 2 ? (
          <section data-testid="review">
            <h3 data-testid="review_course" className="mt-4 text-lg font-bold">
              Kurs
            </h3>
            <p data-testid="review_course_title">
              Tittel: {courseFields?.title}
            </p>
            <p data-testid="review_course_slug">Slug: {courseFields?.slug}</p>
            <p data-testid="review_course_description">
              Beskrivelse: {courseFields?.description}
            </p>
            <p data-testid="review_course_category">
              Kategori: {courseFields?.category}
            </p>
            <h3
              data-testid="review_course_lessons"
              className="mt-4 text-lg font-bold"
            >
              Leksjoner ({lessons?.length})
            </h3>
            <ul data-testid="review_lessons" className="list-decimal pl-4">
              {lessons?.length > 0 &&
                lessons.map((lesson, index) => (
                  <li
                    className="mt-2 mb-8 list-item"
                    key={`${lesson?.slug}-${index}`}
                  >
                    <p data-testid="review_lesson_title">
                      Tittel: {lesson?.title}
                    </p>
                    <p data-testid="review_lesson_slug">Slug: {lesson?.slug}</p>
                    <p data-testid="review_lesson_preamble">
                      Ingress: {lesson?.preAmble}
                    </p>
                    <p>Tekster: </p>
                    <ul
                      data-testid="review_lesson_texts"
                      className="list-inside"
                    >
                      {lesson?.text?.length > 0 &&
                        lesson.text.map((text) => (
                          <li
                            data-testid="review_lesson_text"
                            className="mb-1 pl-4"
                            key={text?.id}
                          >
                            {text?.text}
                          </li>
                        ))}
                    </ul>
                  </li>
                ))}
            </ul>
          </section>
        ) : null}
      </form>
    </>
  );
}
