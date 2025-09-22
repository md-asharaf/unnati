import instance from "@/lib/axios";
import type { CreateSetting } from "@/schemas";

const fetchSettings = async () => {
    try {
        const res = await instance.get("/settings");
        return res.data;
    } catch (e) {
        return null;
    }
}

const createSetting = async ({ welcomeText, introParagraph, email, phone, address, facebook, twitter, linkedin, instagram }: CreateSetting) => {
    try {
        const res = await instance.post("/settings", { welcomeText, introParagraph, email, phone, address, facebook, twitter, linkedin, instagram });
        return res.data;
    } catch (e) {
        return null;
    }
}

const updateSetting = async ({ welcomeText, introParagraph, email, phone, address, facebook, twitter, linkedin, instagram }: CreateSetting) => {
    try {
        const res = await instance.put(`/settings`, { welcomeText, introParagraph, email, phone, address, facebook, twitter, linkedin, instagram });
        return res.data;
    } catch (e) {
        return null;
    }
}

const deleteSetting = async () => {
    try {
        const res = await instance.delete(`/settings`);
        return res.data;
    } catch (e) {
        return null;
    }
}

export {
    fetchSettings,
    createSetting,
    updateSetting,
    deleteSetting
}

