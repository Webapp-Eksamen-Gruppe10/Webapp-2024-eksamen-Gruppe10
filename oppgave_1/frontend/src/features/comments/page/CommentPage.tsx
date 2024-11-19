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
            <h4 className="mt-8 mb-4 text-lg font-bold">
                Kommentarer ({commentData?.length})
            </h4>
            <CommentForm onSubmit={onSubmit} lessonId={lessonId} lessonSlug={lesson} />
            <Comments lessonComments={commentData}/>
        </section>
    )
}