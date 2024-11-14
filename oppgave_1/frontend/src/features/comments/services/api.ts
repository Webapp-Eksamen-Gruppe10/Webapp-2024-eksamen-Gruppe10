import { ofetch } from "ofetch";
import { endpoint } from "@/config/url";

import { Comment, validateComments } from "@/features/comments/lib/schema";

const url = endpoint.comment;

const getComments = async (lessonId: string) => {
    try {
        const comments = await ofetch(`${url}/${lessonId}`);
        return validateComments(comments.data)
    } catch (error) {
        console.error(error);
    }
};

const create = async (data: Omit<Comment, 'id'>) => {
    try {
        const createdComment = await ofetch(`${url}/${data.lessonId}`, {
            method: "POST",
            body: data
        });

        return createdComment
    } catch (error) {
        console.error(error);
    }
};

export default { create, getComments };