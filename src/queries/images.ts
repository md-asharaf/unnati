import instance from "@/lib/axios"
import { ImageType } from "../../generated/prisma";
import { ApiResponse, Pagination } from "@/types/interfaces";

interface MultipleImageResponse extends Pagination { images: any[] }
type MultipleImageApiResponse = ApiResponse<MultipleImageResponse>

const fetchImages = async (type?: ImageType, page = 1, limit = 10) => {
    try {
        const response = await instance.get<MultipleImageApiResponse>("/images", { params: { type, page, limit } });
        return response.data.data!;  
    } catch (e) {
        return { images: [], page, limit, total: 0, totalPages: 0 };
    }
};

export {
    fetchImages
};