import instance from "@/lib/axios";
import type { CreateUsp } from "@/schemas";

const fetchUsps = async () => {
    const res = await instance.get(`/usps`);
    return res.data;
}

const createUsp = async ({ bulletPoints, heading, subheading }: CreateUsp) => {
    const res = await instance.post("/usps", {
        bulletPoints,
        heading,
        subheading
    });
    return res.data;
}

const updateUsp = async (id: string, { bulletPoints, heading, subheading }: CreateUsp) => {
    const res = await instance.put(`/usps/${id}`, {
        bulletPoints,
        heading,
        subheading
    });
    return res.data;
}

const deleteUsp = async (id: string) => {
    const res = await instance.delete(`/usps/${id}`);
    return res.data;
}

export {
    fetchUsps,
    createUsp,
    updateUsp,
    deleteUsp
}