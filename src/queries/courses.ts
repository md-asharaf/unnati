import instance from "@/lib/axios";
import type { CreateCourse } from "@/schemas";

const fetchCourses = async (page: number, limit: number) => {
    try {
        const res = await instance.get(`/courses`, {
            params: { page, limit }
        });
        return res.data;
    } catch (e) {
        return { courses: [], page, limit, total: 0 };
    }
}

const fetchCourse = async (id: string) => {
    try {
        const res = await instance.get(`/courses/${id}`);
        return res.data;
    } catch (e) {
        return null;
    }
}

const createCourse = async ({ description, duration, language, mode, subtitle, title, thumbnail }: CreateCourse) => {
    try {
        const res = await instance.post("/courses", { description, duration, language, mode, thumbnail, subtitle, title });
        return res.data;
    } catch (e) {
        return null;
    }
}

const updateCourse = async (id: string, { description, duration, language, mode, subtitle, title, thumbnail }: CreateCourse) => {
    try {
        const res = await instance.put(`/courses/${id}`, { description, duration, language, mode, subtitle, thumbnail, title });
        return res.data;
    } catch (e) {
        return null;
    }
}

const deleteCourse = async (id: string) => {
    try {
        const res = await instance.delete(`/courses/${id}`);
        return res.data;
    } catch (e) {
        return null;
    }
}

export {
    fetchCourses,
    fetchCourse,
    createCourse,
    updateCourse,
    deleteCourse
}
