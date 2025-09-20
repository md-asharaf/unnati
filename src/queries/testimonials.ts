import instance from "@/lib/axios";
import type { CreateTestimonial } from "@/schemas";

const fetchTestimonials = async (page: number, limit: number) => {
    const res = await instance.get("/testimonials", {
        params: { page, limit }
    });
    return res.data;
}

const createTestimonial = async ({ content, placementId, rating }: CreateTestimonial) => {
    const res = await instance.post("/testimonials", {
        content,
        placementId,
        rating
    });
    return res.data;
}

const updateTestimonial = async (id: string, { content, placementId, rating }: CreateTestimonial) => {
    const res = await instance.put(`/testimonials/${id}`, {
        content,
        placementId,
        rating
    });
    return res.data;
}

const deleteTestimonial = async (id: string) => {
    const res = await instance.delete(`/testimonials/${id}`);
    return res.data;
}

export {
    fetchTestimonials,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial
}