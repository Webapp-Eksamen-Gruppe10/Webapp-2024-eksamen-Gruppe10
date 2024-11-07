import { useState, useEffect } from "react";
import { getLesson, getCourse, getComments } from "../lib/services/dataService";

export const useLessonData = (courseSlug, lessonSlug) => {
  const [lesson, setLesson] = useState(null);
  const [course, setCourse] = useState(null);
  const [lessonComments, setComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const lessonData = await getLesson(courseSlug, lessonSlug);
      const courseData = await getCourse(courseSlug);
      const commentsData = await getComments(lessonSlug);
      setLesson(lessonData);
      setCourse(courseData);
      setComments(commentsData);
    };
    fetchData();
  }, [courseSlug, lessonSlug]);

  return { lesson, course, lessonComments, setComments };
};
