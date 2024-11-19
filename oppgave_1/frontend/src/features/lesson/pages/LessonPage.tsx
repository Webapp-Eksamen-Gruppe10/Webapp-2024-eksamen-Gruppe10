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

    const lessonId = course?.lessons.find(item => item.slug === lessonSlug)?.id ?? ""; // Finn lessonId basert på course
    const { commentData, add } = useComments(lessonId);

    if (courseStatus.fetching) {
        return <div>Laster...</div>;
    }

    if (courseStatus.error) {
        return <div>Feil: {courseError}</div>;
    }

    if (course) {
        const lesson = course.lessons.find(item => item.slug === lessonSlug);

        const onSubmit = (comment: CommentToDb) => {
            add(comment);
        }

        return (
            <div>
                <Lesson course={course} lesson={lesson} />
                <section data-testid="comments">
                    <Comments lessonComments={commentData} />
                    <CommentForm onSubmit={onSubmit} lessonId={lessonId} /> {/* Bruk lessonId her */}
                </section>
            </div>
        );
    }
}