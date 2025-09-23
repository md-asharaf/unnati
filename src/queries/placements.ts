import instance from "@/lib/axios";
import type { Placement, CreatePlacement } from "@/schemas";
import { ApiResponse, Pagination } from "@/types/interfaces";

interface MultiplePlacementResponse extends Pagination { placements: Placement[] }
interface SinglePlacementResponse { placement: Placement }

type MultiplePlacementApiResponse = ApiResponse<MultiplePlacementResponse>
type SinglePlacementApiResponse = ApiResponse<SinglePlacementResponse>

const fetchPlacements = async (page = 1, limit = 12) => {
    try {
        const res = await instance.get<MultiplePlacementApiResponse>(`/placements`, { params: { page, limit } });
        return res.data.data!;
    } catch (e) {
        return { placements: [], page, limit, total: 0, totalPages: 0 };
    }
}

const createPlacement = async ({ companyId, name, role, photoUrl }: CreatePlacement) => {
    try {
        const res = await instance.post<SinglePlacementApiResponse>("/placements", { companyId, name, role, photoUrl });
        return res.data.data!;
    } catch (e) {
        return { placement: null };
    }
}

const updatePlacement = async (id: string, { companyId, name, role, photoUrl }: CreatePlacement) => {
    try {
        const res = await instance.put<SinglePlacementApiResponse>(`/placements/${id}`, { companyId, name, role, photoUrl });
        return res.data.data!;
    } catch (e) {
        return { placement: null };
    }
}

const deletePlacement = async (id: string) => {
    try {
        const res = await instance.delete<SinglePlacementApiResponse>(`/placements/${id}`);
        return res.data.data!;
    } catch (e) {
        return { placement: null };
    }
}
export {
    fetchPlacements,
    createPlacement,
    updatePlacement,
    deletePlacement
}