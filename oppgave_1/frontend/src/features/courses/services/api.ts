import { ofetch } from "ofetch";
import { endpoint } from "@/config/url";

import { CourseToDb, validateCourseList, Course, validateCourseToDb, validateCourse } from "../lib/schema";

const url = endpoint.course;

const getCourse = async (id: string) => {
    try {
        const course = await ofetch(`${url}/${id}`);
        return validateCourse(course.data)
    } catch (error) {
        console.error(error);
    }
}

const list = async () => {
    try {
        const courses = await ofetch(`${url}`);
        return validateCourseList(courses.data)
    } catch (error) {
        console.error(error);
    }
};

const create = async (data: CourseToDb) => {
    try {
        const createdCourse = await ofetch(`${url}`, {
            method: "POST",
            body: validateCourseToDb(data)
        });

        return createdCourse
    } catch (error) {
        console.error(error);
    }
};

const remove = async (id: string) => {
    try {
        await ofetch(`${url}/${id}`, {
            method: "DELETE"
        });  
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const update = async (data: Course) => {
    try {
        await ofetch(`${url}/${data.id}`, {
            method: "PATCH",
            body: validateCourse(data)
        });  
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export default { create, list, remove, update, getCourse };