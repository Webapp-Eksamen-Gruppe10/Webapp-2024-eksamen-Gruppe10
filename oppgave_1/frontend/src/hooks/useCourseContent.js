import { useState, useEffect } from "react";
import { getCourse } from "../lib/services/dataService";

export const useCourseContent = (courseSlug) => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const getContent = async () => {
      const data = await getCourse(courseSlug);
      setContent(data);
    };
    getContent();
  }, [courseSlug]);

  return content;
};
