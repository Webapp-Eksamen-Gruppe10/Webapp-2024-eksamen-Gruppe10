"use client";
import useComments from "@/features/comments/hooks/useComments";
import useCourses from "@/features/courses/hooks/useCourses";
import Lesson from "../components/Lesson";
import Comments from "@/features/comments/components/Comments";
import CommentForm from "@/features/comments/components/CommentForm";
import { CommentToDb } from "@/features/comments/lib/schema";
import { useParams } from "next/navigation";

export default function LessonPage(){
    const { courseSlug } = useParams() as {courseSlug: string};
  const { lessonSlug } = useParams() as {lessonSlug: string};
    const { courseData, courseStatus, courseError} = useCourses(courseSlug)

    const course = courseData[0];
    const lesson = course.lessons.find(item => item.slug === lessonSlug);

    const {commentData, add } = useComments(lesson?.id?? "")

    const onSubmit = (comment: CommentToDb) =>{
        add(comment);
    }
    return(
        <div>
            <Lesson course={course} lesson={lesson} />
            <section data-testid="comments">
                <Comments lessonComments={commentData}/>
                <CommentForm onSubmit={onSubmit} lessonId={""} />
            </section>
        </div>
    )
}