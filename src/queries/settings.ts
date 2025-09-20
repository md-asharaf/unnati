import instance from "@/lib/axios";
import type { CreateSetting } from "@/schemas";

const fetchSettings = async () => {
    const res = await instance.get("/settings");
    return res.data;
}

const createSetting = async ({ welcomeText, introParagraph, email, phone, address, facebook, twitter, linkedin, instagram }: CreateSetting) => {
    const res = await instance.post("/settings", {
        welcomeText,
        introParagraph,
        email,
        phone,
        address,
        facebook,
        twitter,
        linkedin,
        instagram
    });
    return res.data;
}

const updateSetting = async ({ welcomeText, introParagraph, email, phone, address, facebook, twitter, linkedin, instagram }: CreateSetting) => {
    const res = await instance.put(`/settings`, {
        welcomeText,
        introParagraph,
        email,
        phone,
        address,
        facebook,
        twitter,
        linkedin,
        instagram
    });
    return res.data;
}

const deleteSetting = async () => {
    const res = await instance.delete(`/settings`);
    return res.data;
}

export {
    fetchSettings,
    createSetting,
    updateSetting,
    deleteSetting
}

