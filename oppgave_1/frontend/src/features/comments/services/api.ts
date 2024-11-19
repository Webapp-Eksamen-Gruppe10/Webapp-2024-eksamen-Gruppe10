import { ofetch } from "ofetch";
import { endpoint } from "@/config/url";

import { CommentToDb, validateCommentList } from "@/features/comments/lib/schema";

const url = endpoint.comment;

const getComments = async (lessonId: string) => {
    try {
        console.log(url)
        const comments = await ofetch(`${url}/${lessonId}/comments`);
        console.log(comments)
        return validateCommentList(comments.data)
    } catch (error) {
        console.error(error);
    }
};

const create = async (data: CommentToDb, lessonId: string) => {
    try {
        const createdComment = await ofetch(`${url}/${lessonId}/comments`, {
            method: "POST",
            body: data
        });

        return createdComment
    } catch (error) {
        console.error(error);
    }
};

export default { create, getComments };