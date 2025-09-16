import instance from "@/lib/axios"
import { CreateTopic } from "@/schemas"

const fetchTopics = async (page = 1, limit = 10) => {
    const response = await instance.get("/topics", {
        params: {
            page,
            limit
        }
    })
    return response.data
}

const deleteTopic = async (id: string) => {
    const response = await instance.delete(`/topics/${id}`)
    return response.data
}

const createTopic = async ({ name }: CreateTopic) => {
    const response = await instance.post("/topics", {
        name
    })
    return response.data
}

const updateTopic = async (id: string, { name }: CreateTopic) => {
    const response = await instance.put(`/topics/${id}`, {
        name
    })
    return response.data
}

export {
    fetchTopics,
    deleteTopic,
    createTopic,
    updateTopic
}