"use client";
import CommentForm from "../components/CommentForm"
import Comments from "../components/Comments"
import useComments from "../hooks/useComments"
import { CommentToDb } from "../lib/schema"

type commentProps = {
    lessonId: string
    lesson: {slug: string}
}

export default function CommentPage(props: commentProps){
    const { lessonId, lesson } = props;

    const {commentData, add } = useComments(lessonId)

    const onSubmit = (comment: CommentToDb) =>{
        add(comment);
    }

    return(
        <section data-testid="comments">
            <Comments lessonComments={commentData}/>
            <CommentForm onSubmit={onSubmit} lessonId={lessonId} lessonSlug={lesson} />
        </section>
    )
}