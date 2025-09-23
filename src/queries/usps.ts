import instance from "@/lib/axios";
import type { Usp, CreateUsp } from "@/schemas";
import { ApiResponse } from "@/types/interfaces";

interface MultipleUspResponse { usps: Usp[] }
interface SingleUspResponse { usp: Usp }

type MultipleUspApiResponse = ApiResponse<MultipleUspResponse>
type SingleUspApiResponse = ApiResponse<SingleUspResponse>

const fetchUsps = async () => {
    try {
        const res = await instance.get<MultipleUspApiResponse>(`/usps`);
        return res.data.data!;
    } catch (e) {
        return { usps: [] };
    }
}

const createUsp = async ({ bulletPoints, heading, subheading }: CreateUsp) => {
    try {
        const res = await instance.post<SingleUspApiResponse>("/usps", { bulletPoints, heading, subheading });
        return res.data.data!;
    } catch (e) {
        return { usp: null };
    }
}

const updateUsp = async (id: string, { bulletPoints, heading, subheading }: CreateUsp) => {
    try {
        const res = await instance.put<SingleUspApiResponse>(`/usps/${id}`, { bulletPoints, heading, subheading });
        return res.data.data!;
    } catch (e) {
        return { usp: null };
    }
}

const deleteUsp = async (id: string) => {
    try {
        const res = await instance.delete<SingleUspApiResponse>(`/usps/${id}`);
        return res.data.data!;
    } catch (e) {
        return { usp: null };
    }
}

export {
    fetchUsps,
    createUsp,
    updateUsp,
    deleteUsp
}