import instance from "@/lib/axios"
import { CreateTopic } from "@/schemas"

const fetchTopics = async (page = 1, limit = 10) => {
    try {
        const response = await instance.get("/topics", { params: { page, limit } })
        return response.data
    } catch (e) {
        return { topics: [], page, limit, total: 0 }
    }
}

const deleteTopic = async (id: string) => {
    try {
        const response = await instance.delete(`/topics/${id}`)
        return response.data
    } catch (e) {
        return null
    }
}

const createTopic = async ({ name }: CreateTopic) => {
    try {
        const response = await instance.post("/topics", { name })
        return response.data
    } catch (e) {
        return null
    }
}

const updateTopic = async (id: string, { name }: CreateTopic) => {
    try {
        const response = await instance.put(`/topics/${id}`, { name })
        return response.data
    } catch (e) {
        return null
    }
}

export {
    fetchTopics,
    deleteTopic,
    createTopic,
    updateTopic
}