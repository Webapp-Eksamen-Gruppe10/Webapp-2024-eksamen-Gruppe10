"use client";
import { useParams } from "next/navigation";
import useCourses from "../hooks/useCourses";
import CourseForm from "../components/CourseForm";

export default function UpdatePage(){
    const { courseSlug } = useParams() as {courseSlug: string};
    const { courseData } = useCourses(courseSlug);

    if (courseData[0]){
        return(
            <CourseForm course={courseData[0]}/>
    )
}
}