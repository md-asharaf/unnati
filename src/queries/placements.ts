import instance from "@/lib/axios";
import type { CreatePlacement } from "@/schemas";

const fetchPlacements = async (page: number, limit: number) => {
    const res = await instance.get(`/placements`, {
        params: { page, limit }
    });
    return res.data;
}

const createPlacement = async ({ companyId, name, role, photoUrl }: CreatePlacement) => {
    const res = await instance.post("/placements", {
        companyId,
        name,
        role,
        photoUrl
    });
    return res.data;
}

const updatePlacement = async (id: string, { companyId, name, role, photoUrl }: CreatePlacement) => {
    const res = await instance.put(`/placements/${id}`, {
        companyId,
        name,
        role,
        photoUrl
    });
    return res.data;
}

const deletePlacement = async (id: string) => {
    const res = await instance.delete(`/placements/${id}`);
    return res.data;
}
export {
    fetchPlacements,
    createPlacement,
    updatePlacement,
    deletePlacement
}