import instance from "@/lib/axios";
import type { Setting, CreateSetting } from "@/schemas";
import { ApiResponse } from "@/types/interfaces";

interface SingleSettingResponse { setting: Setting }
type SingleSettingApiResponse = ApiResponse<SingleSettingResponse>

const fetchSettings = async () => {
    try {
        const res = await instance.get<SingleSettingApiResponse>("/settings");
        return res.data.data!;
    } catch (e) {
        return { setting: null };
    }
}

const createSetting = async ({ welcomeText, introParagraph, email, phone, address, facebook, twitter, linkedin, instagram }: CreateSetting) => {
    try {
        const res = await instance.post<SingleSettingApiResponse>("/settings", { welcomeText, introParagraph, email, phone, address, facebook, twitter, linkedin, instagram });
        return res.data.data!;
    } catch (e) {
        return { setting: null };
    }
}

const updateSetting = async ({ welcomeText, introParagraph, email, phone, address, facebook, twitter, linkedin, instagram }: CreateSetting) => {
    try {
        const res = await instance.put<SingleSettingApiResponse>(`/settings`, { welcomeText, introParagraph, email, phone, address, facebook, twitter, linkedin, instagram });
        return res.data.data!;
    } catch (e) {
        return { setting: null };
    }
}

const deleteSetting = async () => {
    try {
        const res = await instance.delete<SingleSettingApiResponse>(`/settings`);
        return res.data.data!;
    } catch (e) {
        return { setting: null };
    }
}

export {
    fetchSettings,
    createSetting,
    updateSetting,
    deleteSetting
}

