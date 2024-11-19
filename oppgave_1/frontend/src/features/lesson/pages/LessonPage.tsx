"use client";
import useComments from "@/features/comments/hooks/useComments";
import useCourses from "@/features/courses/hooks/useCourses";
import Lesson from "../components/Lesson";
import Comments from "@/features/comments/components/Comments";
import CommentForm from "@/features/comments/components/CommentForm";
import { CommentToDb } from "@/features/comments/lib/schema";
import { useParams } from "next/navigation";
import CommentPage from "@/features/comments/page/CommentPage";

export default function LessonPage(){
    const { courseSlug } = useParams() as {courseSlug: string};
    const { lessonSlug } = useParams() as {lessonSlug: string};
    const { courseData, courseStatus, courseError} = useCourses(courseSlug)

    const course = courseData[0];

    if (course) {
        const lesson = course.lessons?.find(item => item.slug === lessonSlug);

        return (
            <div>
                <Lesson course={course} lesson={lesson} />
                <CommentPage lessonId={lesson?.id ?? ""} lesson={lesson? {slug: lesson.slug} : {
                    slug: ""
                }}/>
            </div>
        );
    }
}