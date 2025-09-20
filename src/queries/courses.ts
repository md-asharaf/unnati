import instance from "@/lib/axios";
import type { CreateCourse } from "@/schemas";

const fetchCourses = async (page: number, limit: number) => {
    const res = await instance.get(`/courses`, {
        params: {
            page,
            limit
        }
    });
    return res.data;
}

const fetchCourse = async (id: string) => {
    const res = await instance.get(`/courses/${id}`);
    return res.data;
}

const createCourse = async ({ description, duration, language, mode, subtitle, title }: CreateCourse) => {
    const res = await instance.post("/courses", {
        description,
        duration,
        language,
        mode,
        subtitle,
        title
    });
    return res.data;
}

const updateCourse = async (id: string, { description, duration, language, mode, subtitle, title }: CreateCourse) => {
    const res = await instance.put(`/courses/${id}`, {
        description,
        duration,
        language,
        mode,
        subtitle,
        title
    });
    return res.data;
}

const deleteCourse = async (id: string) => {
    const res = await instance.delete(`/courses/${id}`);
    return res.data;
}

export {
    fetchCourses,
    fetchCourse,
    createCourse,
    updateCourse,
    deleteCourse
}
