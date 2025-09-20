import instance from "@/lib/axios";
import type { CreateSetting } from "@/schemas";

const fetchSettings = async (page: number, limit: number) => {
    const res = await instance.get("/settings", {
        params: {
            page,
            limit,
        },
    });
    return res.data;
}

const createSetting = async ({ key, value }: CreateSetting) => {
    const res = await instance.post("/settings", {
        key,
        value
    });
    return res.data;
}

const updateSetting = async (id: string, { key, value }: CreateSetting) => {
    const res = await instance.put(`/settings/${id}`, {
        key,
        value
    });
    return res.data;
}

const deleteSetting = async (id: string) => {
    const res = await instance.delete(`/settings/${id}`);
    return res.data;
}

export {
    fetchSettings,
    createSetting,
    updateSetting,
    deleteSetting
}

