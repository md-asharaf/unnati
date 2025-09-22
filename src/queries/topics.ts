import instance from "@/lib/axios"
import { Topic, CreateTopic } from "@/schemas"
import { ApiResponse, Pagination } from "@/types/interfaces"

interface MultipleTopicResponse extends Pagination { topics: Topic[] }
interface SingleTopicResponse { topic: Topic }

type MultipleTopicApiResponse = ApiResponse<MultipleTopicResponse>
type SingleTopicApiResponse = ApiResponse<SingleTopicResponse>

const fetchTopics = async (page = 1, limit = 10) => {
    try {
        const response = await instance.get<MultipleTopicApiResponse>("/topics", { params: { page, limit } })
        return response.data.data!
    } catch (e) {
        return { topics: [], page, limit, total: 0, totalPages: 0 }
    }
}

const deleteTopic = async (id: string) => {
    try {
        const response = await instance.delete<SingleTopicApiResponse>(`/topics/${id}`)
        return response.data.data!
    } catch (e) {
        return { topic: null }
    }
}

const createTopic = async ({ name }: CreateTopic) => {
    try {
        const response = await instance.post<SingleTopicApiResponse>("/topics", { name })
        return response.data.data!
    } catch (e) {
        return { topic: null }
    }
}

const updateTopic = async (id: string, { name }: CreateTopic) => {
    try {
        const response = await instance.put<SingleTopicApiResponse>(`/topics/${id}`, { name })
        return response.data.data!
    } catch (e) {
        return { topic: null }
    }
}

export {
    fetchTopics,
    deleteTopic,
    createTopic,
    updateTopic
}