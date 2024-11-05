"use client";

import { useState, useEffect } from "react";
import {
  categories,
  comments,
  courseCreateSteps,
  courses,
  users,
} from "../data/data";

import { useParams, useRouter } from "next/navigation";

const getCourse = async (slug) => {
  const data = await courses.filter((course) => course.slug === slug);
  return data?.[0];
};

const createCourse = async (data) => {
  await courses.push(data);
};

const getLesson = async (courseSlug, lessonSlug) => {
  const data = await courses
    .flatMap(
      (course) =>
        course.slug === courseSlug &&
        course.lessons.filter((lesson) => lesson.slug === lessonSlug)
    )
    .filter(Boolean);
  return data?.[0];
};

const getComments = async (lessonSlug) => {
  const data = await comments.filter(
    (comment) => comment.lesson.slug === lessonSlug
  );
  return data;
};

const createComment = async (data) => {
  await comments.push(data);
};

function Course() {
  const [content, setContent] = useState(null);

  const courseSlug = "javascript-101";
  const lessonSlug = "variabler";

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
          {content?.lessons?.map((lesson) => (
            <li
              className={`text-sm" mb-4 w-full max-w-[95%] rounded-lg border border-slate-300 px-4 py-2 ${
                lessonSlug === lesson.slug ? "bg-emerald-300" : "bg-transparent"
              }`}
              key={lesson.id}
            >
              <a
                data-testid="lesson_url"
                data-slug={lessonSlug}
                className="block h-full w-full"
                href={`/kurs/${content?.slug}/${lesson.slug}`}
              >
                {lesson.title}
              </a>
            </li>
          ))}
        </ul>
      </aside>
      {lessonSlug ? (
        <article>
          <Lesson />
        </article>
      ) : (
        <section>
          <>
            <h2 className="text-2xl font-bold" data-testid="course_title">
              {content?.title}
            </h2>
            <p
              className="mt-4 font-semibold leading-relaxed"
              data-testid="course_description"
            >
              {content?.description}
            </p>
          </>
        </section>
      )}
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

function Courses() {
  const [value, setValue] = useState("");
  const [data, setData] = useState(courses);

  const handleFilter = (event) => {
    const category = event.target.value;
    setValue(category);
    if (category && category.length > 0) {
      const content = courses.filter((course) =>
        course.category.toLocaleLowerCase().includes(category.toLowerCase())
      );
      setData(content);
    } else {
      setData(courses);
    }
  };

  return (
    <>
      <header className="mt-8 flex items-center justify-between">
        <h2 className="mb-6 text-xl font-bold" data-testid="title">
          Alle kurs
        </h2>
        <label className="flex flex-col text-xs font-semibold" htmlFor="filter">
          <span className="sr-only mb-1 block">Velg kategori:</span>
          <select
            id="filter"
            name="filter"
            data-testid="filter"
            value={value}
            onChange={handleFilter}
            className="min-w-[200px] rounded bg-slate-200"
          >
            <option value="">Alle</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
      </header>
      <section className="mt-6 grid grid-cols-3 gap-8" data-testid="courses">
        {data && data.length > 0 ? (
          data.map((course) => (
            <article
              className="rounded-lg border border-slate-400 px-6 py-8"
              key={course.id}
              data-testid="course_wrapper"
            >
              <span className="block text-right capitalize">
                [{course.category}]
              </span>
              <h3
                className="mb-2 text-base font-bold"
                data-testid="courses_title"
              >
                <a href={`/kurs/${course.slug}`}>{course.title}</a>
              </h3>
              <p
                className="mb-6 text-base font-light"
                data-testid="courses_description"
              >
                {course.description}
              </p>
              <a
                className="font-semibold underline"
                data-testid="courses_url"
                href={`/kurs/${course.slug}`}
              >
                Til kurs
              </a>
            </article>
          ))
        ) : (
          <p data-testid="empty">Ingen kurs</p>
        )}
      </section>
    </>
  );
}

function Lesson() {
  const [success, setSuccess] = useState(false);
  const [formError, setFormError] = useState(false);
  const [lessonComments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [lesson, setLesson] = useState(null);
  const [course, setCourse] = useState(null);
  const courseSlug = "javascript-101";
  const lessonSlug = "variabler";

  const handleComment = (event) => {
    setComment(event.target.value);
  };

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError(false);
    setSuccess(false);
    if (!comment || !name) {
      setFormError(true);
    } else {
      await createComment({
        id: `${Math.floor(Math.random() * 1000 + 1)}`,
        createdBy: {
          id: Math.floor(Math.random() * 1000 + 1),
          name,
        },
        comment,
        lesson: { slug: lessonSlug },
      });
      const commentsData = await getComments(lessonSlug);
      setComments(commentsData);
      setSuccess(true);
    }
  };

  useEffect(() => {
    const getContent = async () => {
      const lessonDate = await getLesson(courseSlug, lessonSlug);
      const courseData = await getCourse(courseSlug, lessonSlug);
      const commentsData = await getComments(lessonSlug);
      setLesson(lessonDate);
      setCourse(courseData);
      setComments(commentsData);
    };
    getContent();
  }, [courseSlug, lessonSlug]);

  return (
    <div>
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
        lesson.text.map((text) => (
          <p
            data-testid="lesson_text"
            className="mt-4 font-normal"
            key={text.id}
          >
            {text.text}
          </p>
        ))}
      <section data-testid="comments">
        <h4 className="mt-8 mb-4 text-lg font-bold">
          Kommentarer ({lessonComments?.length})
        </h4>
        <form data-testid="comment_form" onSubmit={handleSubmit} noValidate>
          <label className="mb-4 flex flex-col" htmlFor="name">
            <span className="mb-1 text-sm font-semibold">Navn*</span>
            <input
              data-testid="form_name"
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={handleName}
              className="w-full rounded bg-slate-100"
            />
          </label>
          <label className="mb-4 flex flex-col" htmlFor="comment">
            <span className="mb-1 text-sm font-semibold">
              Legg til kommentar*
            </span>
            <textarea
              data-testid="form_textarea"
              type="text"
              name="comment"
              id="comment"
              value={comment}
              onChange={handleComment}
              className="w-full rounded bg-slate-100"
              cols="30"
            />
          </label>
          <button
            className="rounded bg-emerald-600 px-10 py-2 text-center text-base text-white"
            data-testid="form_submit"
            type="submit"
          >
            Legg til kommentar
          </button>
          {formError ? (
            <p className="font-semibold text-red-500" data-testid="form_error">
              Fyll ut alle felter med *
            </p>
          ) : null}
          {success ? (
            <p
              className="font-semibold text-emerald-500"
              data-testid="form_success"
            >
              Skjema sendt
            </p>
          ) : null}
        </form>
        <ul className="mt-8" data-testid="comments_list">
          {lessonComments?.length > 0
            ? lessonComments.map((c) => (
                <li
                  className="mb-6 rounded border border-slate-200 px-4 py-6"
                  key={c.id}
                >
                  <h5 data-testid="user_comment_name" className="font-bold">
                    {c.createdBy.name}
                  </h5>
                  <p data-testid="user_comment">{c.comment}</p>
                </li>
              ))
            : null}
        </ul>
      </section>
    </div>
  );
}

function SignUp() {
  const [success, setSuccess] = useState(false);
  const [formError, setFormError] = useState(false);
  const [fields, setFields] = useState({
    name: "",
    email: "",
    admin: false,
  });
  const router = useRouter();

  const formIsValid = Object.values(fields).filter((val) => val?.length === 0);

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormError(false);
    setSuccess(false);
    if (formIsValid.length === 0) {
      setSuccess(true);
      setTimeout(() => {
        router.push("/kurs");
      }, 500);
    } else {
      setFormError(true);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="mx-auto max-w-xl" data-testid="sign_up">
      <h2 className="mb-4 text-xl font-bold" data-testid="title">
        Ny bruker
      </h2>
      <form data-testid="form" onSubmit={handleSubmit} noValidate>
        <label className="mb-4 flex flex-col" htmlFor="name">
          <span className="mb-1 font-semibold">Navn*</span>
          <input
            className="rounded"
            data-testid="form_name"
            type="text"
            name="name"
            id="name"
            value={fields?.name}
            onChange={handleChange}
          />
        </label>
        <label className="mb-4 flex flex-col" htmlFor="email">
          <span className="mb-1 font-semibold">Epost*</span>
          <input
            className="rounded"
            data-testid="form_email"
            type="email"
            name="email"
            id="email"
            value={fields?.email}
            onChange={handleChange}
          />
        </label>
        <label className="flex items-center gap-2" htmlFor="admin">
          <input
            className="rounded"
            data-testid="form_admin"
            type="checkbox"
            name="admin"
            id="admin"
            onChange={handleChange}
            checked={fields?.admin}
          />
          <span className="font-semibold">Admin</span>
        </label>
        <button
          className="mt-8 rounded bg-emerald-600 px-10 py-2 text-center text-base text-white"
          data-testid="form_submit"
          type="submit"
        >
          Lag ny bruker
        </button>
        {formError ? (
          <p className="font-semibold text-red-500" data-testid="form_error">
            Fyll ut alle felter med *
          </p>
        ) : null}
        {success ? (
          <p
            className="font-semibold text-emerald-500"
            data-testid="form_success"
          >
            Skjema sendt
          </p>
        ) : null}
      </form>
    </section>
  );
}

const isValid = (items) => {
  const invalidFields = [];
  // eslint-disable-next-line no-shadow
  const validate = (items) => {
    if (typeof items !== "object") {
      return;
    }
    if (Array.isArray(items)) {
      items.forEach((item) => validate(item));
    } else {
      items &&
        Object.entries(items)?.forEach(([key, value]) => {
          if (
            !value ||
            value === null ||
            value === undefined ||
            (Array.isArray(value) && value?.length === 0)
          ) {
            invalidFields.push(key);
          } else {
            validate(value);
          }
        });
    }
  };
  validate(items);
  return invalidFields.length === 0;
};

function Create() {
  const [success, setSuccess] = useState(false);
  const [formError, setFormError] = useState(false);
  const [current, setCurrent] = useState(0);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [courseFields, setCourseFields] = useState({
    id: `${Math.floor(Math.random() * 1000 + 1)}`,
    title: "",
    slug: "",
    description: "",
    category: "",
  });
  const [lessons, setLessons] = useState([]);

  const router = useRouter();

  const step = courseCreateSteps[current]?.name;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError(false);
    setSuccess(false);

    if (lessons.length > 0 && isValid(lessons) && isValid(courseFields)) {
      setSuccess(true);
      setCurrent(2);
      await createCourse({ ...courseFields, lessons });
      setTimeout(() => {
        router.push("/kurs");
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

  const removeTextBox = (index) => {
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

  const handleCourseFieldChange = (event) => {
    const { name, value } = event.target;
    setCourseFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleStep = (index) => {
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

  const handleLessonFieldChange = (event, index) => {
    const { name, value } = event.target;
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

  const changeCurrentLesson = (index) => {
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
        </ul>
      </nav>
      <h2 className="text-xl font-bold" data-testid="title">
        Lag nytt kurs
      </h2>
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
                {categories.map((category) => (
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
                        <textarea
                          data-testid="form_lesson_text"
                          type="text"
                          name="text"
                          id={`text-${field?.id}`}
                          value={field?.text}
                          onChange={(event) =>
                            handleLessonFieldChange(event, index)
                          }
                          className="w-full rounded bg-slate-100"
                          cols="30"
                        />
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
                    <textarea
                      data-testid="form_lesson_text"
                      type="text"
                      name="text"
                      id="text"
                      value={lessons[currentLesson]?.text?.[0]?.text}
                      onChange={(event) => handleLessonFieldChange(event, 0)}
                      className="w-full rounded bg-slate-100"
                      cols="30"
                    />
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

export default function All() {
  return (
    <div
      className="mx-auto grid min-h-screen w-full max-w-7xl grid-rows-[auto_minmax(900px,_1fr)_30px]"
      data-testid="layout"
    >
      <nav className="mt-6 mb-12 flex justify-between">
        <h1 className="text-lg font-bold uppercase" data-testid="logo">
          <a href="/">Mikro LMS</a>
        </h1>
        <ul className="flex gap-8" data-testid="nav">
          <li className="text-base font-semibold" data-testid="nav_courses">
            <a href="kurs">Kurs</a>
          </li>
          <li className="text-base font-semibold" data-testid="nav_new">
            <a href="/ny">Nytt kurs</a>
          </li>
        </ul>
      </nav>
      <main className="h-full">
        <p>Siden er tom</p>
      </main>
      <footer className="flex justify-between" data-testid="footer">
        <p>Mikro LMS AS, 2024</p>
        <p>99 00 00 00, mail@lms.no</p>
      </footer>
    </div>
  );
}
