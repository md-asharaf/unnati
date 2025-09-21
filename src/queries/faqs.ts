import instance from "@/lib/axios"
import { CreateFaq } from "@/schemas"

const fetchFaqs = async (topicId?:string,page = 1, limit = 10) => {
    try {
        const response = await instance.get("/faqs", { params: { topicId, page, limit } })
        return response.data
    } catch (e) {
        return { faqs: [], page, limit, total: 0 }
    }
}

const deleteFaq = async (id: string) => {
    try {
        const response = await instance.delete(`/faqs/${id}`)
        return response.data
    } catch (e) {
        return null
    }
}

const createFaq = async ({ answer, question, topicId }: CreateFaq) => {
    try {
        const response = await instance.post("/faqs", { answer, question, topicId })
        return response.data
    } catch (e) {
        return null
    }
}

const updateFaq = async (id: string, { answer, question, topicId }: CreateFaq) => {
    try {
        const response = await instance.put(`/faqs/${id}`, { answer, question, topicId })
        return response.data
    } catch (e) {
        return null
    }
}

export {
    fetchFaqs,
    deleteFaq,
    createFaq,
    updateFaq
}