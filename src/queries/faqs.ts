import instance from "@/lib/axios"
import { CreateFaq } from "@/schemas"

const fetchFaqs = async (topicId?:string,page = 1, limit = 10) => {
    const response = await instance.get("/faqs", {
        params: {
            topicId,
            page,
            limit
        }
    })
    return response.data
}

const deleteFaq = async (id: string) => {
    const response = await instance.delete(`/faqs/${id}`)
    return response.data
}

const createFaq = async ({ answer, question, topicId }: CreateFaq) => {
    const response = await instance.post("/faqs", {
        answer,
        question,
        topicId
    })
    return response.data
}

const updateFaq = async (id: string, { answer, question, topicId }: CreateFaq) => {
    const response = await instance.put(`/faqs/${id}`, {
        answer,
        question,
        topicId
    })
    return response.data
}

export {
    fetchFaqs,
    deleteFaq,
    createFaq,
    updateFaq
}