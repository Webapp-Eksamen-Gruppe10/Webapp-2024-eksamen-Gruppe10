import { useState } from "react";
import { courses } from "../data/data";

export const useCoursesFilter = () => {
  const [value, setValue] = useState("");
  const [data, setData] = useState(courses);

  const handleFilter = (event) => {
    const category = event.target.value;
    setValue(category);
    if (category && category.length > 0) {
      const filteredCourses = courses.filter((course) =>
        course.category.toLowerCase().includes(category.toLowerCase())
      );
      setData(filteredCourses);
    } else {
      setData(courses);
    }
  };

  return { value, data, handleFilter };
};
