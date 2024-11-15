import { Comment } from "../lib/schema"

type CommentsProps = {
    lessonComments: Comment[],
}

export default function Comments(props: CommentsProps){
    const { lessonComments } = props;

    return(
        <section data-testid="comments">
            <ul className="mt-8" data-testid="comments_list">
                {lessonComments?.length > 0
                    ? lessonComments.map((c) => (
                    <li
                        className="mb-6 rounded border border-slate-200 px-4 py-6"
                        key={c.id}
                    >
                        <h5 data-testid="user_comment_name" className="font-bold">
                            {c.createdBy.name}
                        </h5>
                        <p data-testid="user_comment">{c.comment}</p>
                    </li>
                ))
                : null}
            </ul>
        </section>
    )
}