import instance from "@/lib/axios"
import { Faq, CreateFaq } from "@/schemas"
import { ApiResponse, Pagination } from "@/types/interfaces"

interface MultipleFaqResponse extends Pagination { faqs: Faq[] }
interface SingleFaqResponse { faq: Faq }

type MultipleFaqApiResponse = ApiResponse<MultipleFaqResponse>
type SingleFaqApiResponse = ApiResponse<SingleFaqResponse>

const fetchFaqs = async (topicId?:string,page = 1, limit = 10) => {
    try {
        const response = await instance.get<MultipleFaqApiResponse>("/faqs", { params: { topicId, page, limit } })
        return response.data.data!
    } catch (e) {
        return { faqs: [], page, limit, total: 0, totalPages: 0 }
    }
}

const deleteFaq = async (id: string) => {
    try {
        const response = await instance.delete<SingleFaqApiResponse>(`/faqs/${id}`)
        return response.data.data!
    } catch (e) {
        return { faq: null }
    }
}

const createFaq = async ({ answer, question, topicId }: CreateFaq) => {
    try {
        const response = await instance.post<SingleFaqApiResponse>("/faqs", { answer, question, topicId })
        return response.data.data!
    } catch (e) {
        return { faq: null }
    }
}

const updateFaq = async (id: string, { answer, question, topicId }: CreateFaq) => {
    try {
        const response = await instance.put<SingleFaqApiResponse>(`/faqs/${id}`, { answer, question, topicId })
        return response.data.data!
    } catch (e) {
        return { faq: null }
    }
}

export {
    fetchFaqs,
    deleteFaq,
    createFaq,
    updateFaq
}