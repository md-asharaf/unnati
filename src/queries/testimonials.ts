import instance from "@/lib/axios";
import type { Testimonial, CreateTestimonial } from "@/schemas";
import { ApiResponse, Pagination } from "@/types/interfaces";

interface MultipleTestimonialResponse extends Pagination { testimonials: Testimonial[] }
interface SingleTestimonialResponse { testimonial: Testimonial }

type MultipleTestimonialApiResponse = ApiResponse<MultipleTestimonialResponse>
type SingleTestimonialApiResponse = ApiResponse<SingleTestimonialResponse>

const fetchTestimonials = async (page: number, limit: number) => {
    try {
        const res = await instance.get<MultipleTestimonialApiResponse>("/testimonials", { params: { page, limit } });
        return res.data.data!;
    } catch (e) {
        return { testimonials: [], page, limit, total: 0, totalPages: 0 };
    }
}

const createTestimonial = async ({ content, placementId, rating }: CreateTestimonial) => {
    try {
        const res = await instance.post<SingleTestimonialApiResponse>("/testimonials", { content, placementId, rating });
        return res.data.data!;
    } catch (e) {
        return { testimonial: null };
    }
}

const updateTestimonial = async (id: string, { content, placementId, rating }: CreateTestimonial) => {
    try {
        const res = await instance.put<SingleTestimonialApiResponse>(`/testimonials/${id}`, { content, placementId, rating });
        return res.data.data!;
    } catch (e) {
        return { testimonial: null };
    }
}

const deleteTestimonial = async (id: string) => {
    try {
        const res = await instance.delete<SingleTestimonialApiResponse>(`/testimonials/${id}`);
        return res.data.data!;
    } catch (e) {
        return { testimonial: null };
    }
}

export {
    fetchTestimonials,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial
}