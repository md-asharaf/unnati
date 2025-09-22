import instance from "@/lib/axios";
import type { CreateUsp } from "@/schemas";

const fetchUsps = async () => {
    try {
        const res = await instance.get(`/usps`);
        return res.data;
    } catch (e) {
        return { usps: [] };
    }
}

const createUsp = async ({ bulletPoints, heading, subheading }: CreateUsp) => {
    try {
        const res = await instance.post("/usps", { bulletPoints, heading, subheading });
        return res.data;
    } catch (e) {
        return null;
    }
}

const updateUsp = async (id: string, { bulletPoints, heading, subheading }: CreateUsp) => {
    try {
        const res = await instance.put(`/usps/${id}`, { bulletPoints, heading, subheading });
        return res.data;
    } catch (e) {
        return null;
    }
}

const deleteUsp = async (id: string) => {
    try {
        const res = await instance.delete(`/usps/${id}`);
        return res.data;
    } catch (e) {
        return null;
    }
}

export {
    fetchUsps,
    createUsp,
    updateUsp,
    deleteUsp
}