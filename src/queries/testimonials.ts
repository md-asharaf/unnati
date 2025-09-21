import instance from "@/lib/axios";
import type { CreateTestimonial } from "@/schemas";

const fetchTestimonials = async (page: number, limit: number) => {
    try {
        const res = await instance.get("/testimonials", { params: { page, limit } });
        return res.data;
    } catch (e) {
        return { testimonials: [], page, limit, total: 0 };
    }
}

const createTestimonial = async ({ content, placementId, rating }: CreateTestimonial) => {
    try {
        const res = await instance.post("/testimonials", { content, placementId, rating });
        return res.data;
    } catch (e) {
        return null;
    }
}

const updateTestimonial = async (id: string, { content, placementId, rating }: CreateTestimonial) => {
    try {
        const res = await instance.put(`/testimonials/${id}`, { content, placementId, rating });
        return res.data;
    } catch (e) {
        return null;
    }
}

const deleteTestimonial = async (id: string) => {
    try {
        const res = await instance.delete(`/testimonials/${id}`);
        return res.data;
    } catch (e) {
        return null;
    }
}

export {
    fetchTestimonials,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial
}