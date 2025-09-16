import instance from "@/lib/axios"
import { ImageType } from "../../generated/prisma";

const fetchImages = async (type?: ImageType, page = 1, limit = 10) => {
    const response = await instance.get("/images", {
        params: {
            type,
            page,
            limit
        }
    });
    return response.data;   
};

export {
    fetchImages
};