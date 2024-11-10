import { useState } from "react";
import { useRouter } from "next/router";
import { createCourse } from "../lib/services/courseService";
import { isValid } from "../lib/utils/validationUtils";

export const useCreateCourseForm = (initialSteps) => {
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
  const step = initialSteps[current]?.name;

  const handleCourseFieldChange = (event) => {
    const { name, value } = event.target;
    setCourseFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleLessonFieldChange = (event, index) => {
    const { name, value } = event.target;
    const updatedLessons = lessons.map((lesson, i) => {
      if (i === currentLesson) {
        return { ...lesson, [name]: value };
      }
      return lesson;
    });
    setLessons(updatedLessons);
  };

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

  return {
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
  };
};
