import instance from "@/lib/axios";
import type { Course, CreateCourse } from "@/schemas";
import { ApiResponse, Pagination } from "@/types/interfaces";

interface MultipleCourseResponse extends Pagination { courses: Course[] }
interface SingleCourseResponse { course: Course }

type MultipleCourseApiResponse = ApiResponse<MultipleCourseResponse>
type SingleCourseApiResponse = ApiResponse<SingleCourseResponse>

const fetchCourses = async (page = 1, limit = 9) => {
    try {
        const res = await instance.get<MultipleCourseApiResponse>(`/courses`, { params: { page, limit } });
        return res.data.data!;
    } catch (e) {
        return { courses: [], page, limit, total: 0, totalPages: 0 };
    }
}

const fetchCourse = async (id: string) => {
    try {
        const res = await instance.get<SingleCourseApiResponse>(`/courses/${id}`);
        return res.data.data!;
    } catch (e) {
        return { course: null };
    }
}

const createCourse = async ({ description, duration, language, mode, subtitle, title, thumbnail }: CreateCourse) => {
    try {
        const res = await instance.post<SingleCourseApiResponse>("/courses", { description, duration, language, mode, thumbnail, subtitle, title });
        return res.data.data!;
    } catch (e) {
        return { course: null };
    }
}

const updateCourse = async (id: string, { description, duration, language, mode, subtitle, title, thumbnail }: CreateCourse) => {
    try {
        const res = await instance.put<SingleCourseApiResponse>(`/courses/${id}`, { description, duration, language, mode, subtitle, thumbnail, title });
        return res.data.data!;
    } catch (e) {
        return { course: null };
    }
}

const deleteCourse = async (id: string) => {
    try {
        const res = await instance.delete<SingleCourseApiResponse>(`/courses/${id}`);
        return res.data.data!;
    } catch (e) {
        return { course: null };
    }
}

export {
    fetchCourses,
    fetchCourse,
    createCourse,
    updateCourse,
    deleteCourse
}
