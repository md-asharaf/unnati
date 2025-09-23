import instance from "@/lib/axios"
import { Trainer, CreateTrainer } from "@/schemas"
import { ApiResponse } from "@/types/interfaces"

interface MultipleTrainerResponse { trainers: Trainer[] }
interface SingleTrainerResponse { trainer: Trainer }

type MultipleTrainerApiResponse = ApiResponse<MultipleTrainerResponse>
type SingleTrainerApiResponse = ApiResponse<SingleTrainerResponse>

const fetchTrainers = async () => {
    try {
        const response = await instance.get<MultipleTrainerApiResponse>("/trainers")
        return response.data.data!
    } catch (e) {
        return { trainers: [] }
    }
}

const deleteTrainer = async (id: string) => {
    try {
        const response = await instance.delete<SingleTrainerApiResponse>(`/trainers/${id}`)
        return response.data.data!
    } catch (e) {
        return { trainer: null }
    }
}

const createTrainer = async ({ designation, experience, expertise, name, photoUrl, bio }: CreateTrainer) => {
    try {
        const response = await instance.post<SingleTrainerApiResponse>("/trainers", { designation, experience, expertise, name, photoUrl, bio })
        return response.data.data!
    } catch (e) {
        return { trainer: null }
    }
}

const updateTrainer = async (id: string, { designation, experience, expertise, name, photoUrl, bio }: CreateTrainer) => {
    try {
        const response = await instance.put<SingleTrainerApiResponse>(`/trainers/${id}`, { designation, experience, expertise, name, photoUrl, bio })
        return response.data.data!
    } catch (e) {
        return { trainer: null }
    }
}

export {
    fetchTrainers,
    deleteTrainer,
    createTrainer,
    updateTrainer
}