import instance from "@/lib/axios";
import type { CreatePlacement } from "@/schemas";

const fetchPlacements = async (page?: number, limit?: number) => {
    try {
        const res = await instance.get(`/placements`, { params: { page, limit } });
        return res.data;
    } catch (e) {
        return { placements: [], page, limit, total: 0 };
    }
}

const createPlacement = async ({ companyId, name, role, photoUrl }: CreatePlacement) => {
    try {
        const res = await instance.post("/placements", { companyId, name, role, photoUrl });
        return res.data;
    } catch (e) {
        return null;
    }
}

const updatePlacement = async (id: string, { companyId, name, role, photoUrl }: CreatePlacement) => {
    try {
        const res = await instance.put(`/placements/${id}`, { companyId, name, role, photoUrl });
        return res.data;
    } catch (e) {
        return null;
    }
}

const deletePlacement = async (id: string) => {
    try {
        const res = await instance.delete(`/placements/${id}`);
        return res.data;
    } catch (e) {
        return null;
    }
}
export {
    fetchPlacements,
    createPlacement,
    updatePlacement,
    deletePlacement
}